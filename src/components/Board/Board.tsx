import React, {ReactNode, DragEvent, useContext, useCallback} from 'react';
import {PlannerType} from '@/types';
import {Button, ControllerContext} from '@/components';
import {convertTasksToJSON, getTaskIndex, getTasksCopyByType} from '@/utils';
import {TASK_TYPE} from '@/constants';

import './Board.scss';

type Props = {
  data: PlannerType;
  children: ReactNode;
};

export const Board = ({data, children}: Props) => {
  const context = useContext(ControllerContext);

  const isDragOverTask = context?.isDragOverTask;
  const currentTask = context?.currentTask;
  const config = context?.config;

  const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (data: PlannerType) => (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!isDragOverTask && currentTask && config) {
        const board = getTasksCopyByType(config, data.id);
        const currentBoard = getTasksCopyByType(config, currentTask.type);

        if (currentTask.type === data.id) {
          const currentIndex = getTaskIndex(board, currentTask.id);

          board.splice(currentIndex, 1);
          board.push({...currentTask, type: data.id});

          localStorage.setItem(data.id, convertTasksToJSON(board));
        } else {
          const currentIndex = getTaskIndex(currentBoard, currentTask.id);

          currentBoard.splice(currentIndex, 1);
          board.push({...currentTask, type: data.id});

          localStorage.setItem(currentTask.type, convertTasksToJSON(currentBoard));
          localStorage.setItem(data.id, convertTasksToJSON(board));
        }

        context?.handleDragEventEnd();
      }
    },
    [isDragOverTask, currentTask, config],
  );

  return (
    <div className="board__container" onDrop={handleDrop(data)} onDragOver={handleDragOver}>
      <h2>{data.label}</h2>
      <div className="board__content">{children}</div>
      {data.id === TASK_TYPE.UPCOMING && (
        <Button text="Add Task" onClick={context?.handleModalOpen} />
      )}
    </div>
  );
};
