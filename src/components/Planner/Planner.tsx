import React, {useState, DragEvent} from 'react';
import {PlannerType, TaskDataType} from '@/types';
import {Board, Task} from '@/components';
import {getPlannerConfig} from '@/utils';
import {mockData, plannerStructure} from './planner.constants';

import './Planner.scss';

export const Planner = () => {
  const [data, setData] = useState<TaskDataType[]>(mockData);
  const [currentTask, setCurrentTask] = useState<TaskDataType | null>(null);

  const config = getPlannerConfig(data);
  const configuratedData = plannerStructure.map((item) => ({...item, tasks: config[item.id]}));

  console.log(data, currentTask);

  const handleDragStart = (data: TaskDataType) => (_: DragEvent<HTMLDivElement>) => {
    setCurrentTask(data);
  };
  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const handleDrop = (data: TaskDataType, length: number) => (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setData((current) =>
      current.map((item) => {
        if (item.id === currentTask?.id) {
          return {...item, order: data.order, type: data.type};
        }

        if (item.id === data.id) {
          return {...item, order: length + 1};
        }

        return item;
      }),
    );
  };

  const handleBoardDrop = (board: PlannerType) => (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    setData((current) =>
      current.map((item) => {
        if (item.id === currentTask?.id) {
          return {...item, order: board.tasks.length + 1, type: board.id};
        }

        return item;
      }),
    );
  };

  return (
    <div className="planner__container">
      {configuratedData.map((board) => {
        return (
          <Board
            key={board.id}
            label={board.label}
            onDrop={handleBoardDrop(board)}
            onDragOver={handleDragOver}
          >
            {board.tasks.map((task) => (
              <Task
                key={task.id}
                content={task.content}
                onDragStart={handleDragStart(task)}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop(task, board.tasks.length)}
              />
            ))}
          </Board>
        );
      })}
    </div>
  );
};
