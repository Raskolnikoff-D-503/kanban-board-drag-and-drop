import React, {useCallback, useContext, DragEvent} from 'react';
import {TaskDataType} from '@/types';
import {ControllerContext, Draggable} from '@/components';
import {convertTasksToJSON, getTaskIndex, getTasksCopyByType} from '@/utils';
import {TASK_STATUS} from '@/constants';

import './Task.scss';

type Props = {
  data: TaskDataType;
};

export const Task = ({data}: Props) => {
  const context = useContext(ControllerContext);

  const config = context?.config;
  const currentTask = context?.currentTask;

  const handleDragStart = useCallback(
    (data: TaskDataType) => (_: DragEvent<HTMLDivElement>) => {
      context?.handleDragEventStart(data);
    },
    [],
  );

  const handleDragLeave = useCallback((_: DragEvent<HTMLDivElement>) => {
    context?.handleDragOverEvent(false);
  }, []);

  const handleDragEnd = useCallback((_: DragEvent<HTMLDivElement>) => {
    context?.handleDragEventEnd();
  }, []);

  const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    context?.handleDragOverEvent(true);
  }, []);

  const handleDrop = useCallback(
    (data: TaskDataType) => (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      context?.handleDragOverEvent(false);

      if (currentTask && config) {
        const board = getTasksCopyByType(config, data.type);
        const currentBoard = getTasksCopyByType(config, currentTask.type);

        if (currentTask.type === data.type) {
          const currentIndex = getTaskIndex(board, currentTask.id);
          board.splice(currentIndex, 1);

          const dropIndex = getTaskIndex(board, data.id);
          const adjustPositionAddendum = currentIndex <= dropIndex ? 1 : 0;
          board.splice(dropIndex + adjustPositionAddendum, 0, currentTask);

          localStorage.setItem(data.type, convertTasksToJSON(board));
        } else {
          const currentIndex = getTaskIndex(currentBoard, currentTask.id);
          currentBoard.splice(currentIndex, 1);

          const dropIndex = getTaskIndex(board, data.id);
          board.splice(dropIndex, 0, {...currentTask, type: data.type});

          localStorage.setItem(data.type, convertTasksToJSON(board));
          localStorage.setItem(currentTask.type, convertTasksToJSON(currentBoard));
        }

        context?.handleDragEventEnd();
      }
    },
    [currentTask, config],
  );

  return (
    <Draggable
      className={`task__container task__container--${TASK_STATUS[data.type]}`}
      onDragStart={handleDragStart(data)}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop(data)}
    >
      <p>{data.content}</p>
    </Draggable>
  );
};
