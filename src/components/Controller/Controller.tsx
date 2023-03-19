import React, {DragEvent, ReactNode, useCallback, useEffect, useState} from 'react';
import {PlannerConfigType, TaskDataType, PlannerType} from '@/types';
import {ControllerContext} from './ControllerContext';
import {convertJSONToTasks, convertTasksToJSON, getTaskIndex, getTasksCopyByType} from '@/utils';
import {TASK_TYPE} from '@/constants';

type Props = {
  children: ReactNode;
};

const defaultData: PlannerConfigType = {
  [TASK_TYPE.UPCOMING]: [],
  [TASK_TYPE.IN_PROGRESS]: [],
  [TASK_TYPE.DONE]: [],
};

export const plannerStructure: PlannerType[] = [
  {
    id: TASK_TYPE.UPCOMING,
    label: 'Upcoming',
    tasks: [],
  },
  {
    id: TASK_TYPE.IN_PROGRESS,
    label: 'In process',
    tasks: [],
  },
  {
    id: TASK_TYPE.DONE,
    label: 'Done',
    tasks: [],
  },
];

export const Controller = ({children}: Props) => {
  const upcomingStorage = localStorage.getItem('UPCOMING');
  const inProgressStorage = localStorage.getItem('IN_PROGRESS');
  const doneStorage = localStorage.getItem('DONE');

  const [config, setConfig] = useState<PlannerConfigType>(defaultData);
  const [currentTask, setCurrentTask] = useState<TaskDataType | null>(null);

  const [isOnDrag, setIsOnDrag] = useState<boolean>(false);
  const [isDragOverTask, setIsDragOverTask] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const configuratedData = plannerStructure.map((item) => ({...item, tasks: config[item.id]}));

  const onDragEventEnd = useCallback(() => {
    setCurrentTask(null);
    setIsOnDrag(false);
  }, []);

  const handleDragStart = useCallback(
    (data: TaskDataType) => (_: DragEvent<HTMLDivElement>) => {
      setCurrentTask(data);
      setIsOnDrag(true);
    },
    [],
  );

  const handleDragLeave = useCallback((_: DragEvent<HTMLDivElement>) => {
    setIsDragOverTask(false);
  }, []);

  const handleDragEnd = useCallback((_: DragEvent<HTMLDivElement>) => {
    onDragEventEnd();
  }, []);

  const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    setIsDragOverTask(true);
  }, []);

  const handleDrop = useCallback(
    (data: TaskDataType) => (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      setIsDragOverTask(false);

      if (currentTask) {
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

        onDragEventEnd();
      }
    },
    [currentTask, config],
  );

  const handleBoardDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleBoardDrop = (data: PlannerType) => (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (!isDragOverTask && currentTask) {
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

      onDragEventEnd();
    }
  };

  const handleDeleteDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDeleteDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (currentTask) {
      const updatedConfig = getTasksCopyByType(config, currentTask.type);
      const currentIndex = getTaskIndex(config[currentTask.type], currentTask.id);

      updatedConfig.splice(currentIndex, 1);

      localStorage.setItem(currentTask.type, convertTasksToJSON(updatedConfig));
    }
  };

  const handleModalOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    const upcomingStorage = localStorage.getItem('UPCOMING');
    const inProgressStorage = localStorage.getItem('IN_PROGRESS');
    const doneStorage = localStorage.getItem('DONE');

    if (!upcomingStorage) {
      localStorage.setItem(TASK_TYPE.UPCOMING, convertTasksToJSON(defaultData[TASK_TYPE.UPCOMING]));
    }

    if (!inProgressStorage) {
      localStorage.setItem(
        TASK_TYPE.IN_PROGRESS,
        convertTasksToJSON(defaultData[TASK_TYPE.IN_PROGRESS]),
      );
    }

    if (!doneStorage) {
      localStorage.setItem(TASK_TYPE.DONE, convertTasksToJSON(defaultData[TASK_TYPE.DONE]));
    }
  }, []);

  useEffect(() => {
    if (upcomingStorage && inProgressStorage && doneStorage) {
      const configuration: PlannerConfigType = {
        [TASK_TYPE.UPCOMING]: convertJSONToTasks(upcomingStorage),
        [TASK_TYPE.IN_PROGRESS]: convertJSONToTasks(inProgressStorage),
        [TASK_TYPE.DONE]: convertJSONToTasks(doneStorage),
      };

      setConfig(configuration);
    }
  }, [upcomingStorage, inProgressStorage, doneStorage]);

  return (
    <ControllerContext.Provider
      value={{
        data: configuratedData,
        upcomingConfig: config[TASK_TYPE.UPCOMING],

        isModalOpen,
        isOnDrag,

        handleDragStart,
        handleDragLeave,
        handleDragEnd,
        handleDragOver,
        handleDrop,

        handleBoardDragOver,
        handleBoardDrop,

        handleDeleteDragOver,
        handleDeleteDrop,

        handleModalOpen,
        handleModalClose,
      }}
    >
      {children}
    </ControllerContext.Provider>
  );
};
