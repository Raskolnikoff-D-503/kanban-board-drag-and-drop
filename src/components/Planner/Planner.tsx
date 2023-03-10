import React, {useState, DragEvent} from 'react';
import {PlannerType, TaskDataType} from '@/types';
import {Board, Task} from '@/components';
import {getPlannerConfig} from '@/utils';
import {mockData, plannerStructure} from './planner.constants';

import './Planner.scss';

export const Planner = () => {
  const [list, setList] = useState<TaskDataType[]>(mockData);
  const [currentTask, setCurrentTask] = useState<TaskDataType | null>(null);
  const [isDragOverTask, setIsDragOverTask] = useState<boolean>(false);

  const config = getPlannerConfig(list);
  const configuratedData = plannerStructure.map((item) => ({...item, tasks: config[item.id]}));

  const handleDragStart = (data: TaskDataType) => (_: DragEvent<HTMLDivElement>) => {
    setCurrentTask(data);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    setIsDragOverTask(false);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    setIsDragOverTask(true);
  };

  const handleDrop =
    (data: TaskDataType, board: PlannerType) => (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      setIsDragOverTask(false);
      setList((current) =>
        current.map((item) => {
          console.log('test test', item);

          if (item.id === currentTask?.id) {
            console.log('test item', {...item, order: data.order, type: data.type});

            return {...item, order: data.order, type: data.type};
          }

          if (item.id === data.id) {
            return {
              ...item,
              order: item.type === currentTask?.type ? currentTask.order : board.tasks.length + 1,
            };
          }

          return item;
        }),
      );
    };

  const handleBoardDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleBoardDrop = (board: PlannerType) => (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (!isDragOverTask) {
      setList((current) =>
        current.map((item) => {
          if (item.id === currentTask?.id) {
            return {
              ...item,
              order: board.id === currentTask.type ? currentTask.order : board.tasks.length + 1,
              type: board.id,
            };
          }

          return item;
        }),
      );
    }
  };

  return (
    <div className="planner__container">
      {configuratedData.map((board) => {
        return (
          <Board
            key={board.id}
            label={board.label}
            onDrop={handleBoardDrop(board)}
            onDragOver={handleBoardDragOver}
          >
            {board.tasks.map((task) => (
              <Task
                key={task.id}
                content={task.content}
                onDragStart={handleDragStart(task)}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop(task, board)}
              />
            ))}
          </Board>
        );
      })}
    </div>
  );
};
