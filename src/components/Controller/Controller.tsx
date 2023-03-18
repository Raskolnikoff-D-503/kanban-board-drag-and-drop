import React, {DragEvent, ReactNode, useCallback, useEffect, useState} from 'react';
import {PlannerConfigType, TaskDataType, PlannerType} from '@/types';
import {ControllerContext} from './ControllerContext';
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

  const handleDragStart = (data: TaskDataType) => (_: DragEvent<HTMLDivElement>) => {
    setCurrentTask(data);
    setIsOnDrag(true);
  };

  const handleDragLeave = (_: DragEvent<HTMLDivElement>) => {
    setIsDragOverTask(false);
  };

  const handleDragEnd = (_: DragEvent<HTMLDivElement>) => {
    onDragEventEnd();
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    setIsDragOverTask(true);
  };

  const handleDrop = (data: TaskDataType) => (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    setIsDragOverTask(false);

    if (currentTask) {
      if (currentTask.type === data.type) {
        const board = [...config[data.type]];

        const currentIndex = board.findIndex((item) => item.id === currentTask.id);
        board.splice(currentIndex, 1);

        const dropIndex = board.findIndex((item) => item.id === data.id);
        const adjustPositionAddendum = currentIndex <= dropIndex ? 1 : 0;
        board.splice(dropIndex + adjustPositionAddendum, 0, currentTask);

        localStorage.setItem(data.type, JSON.stringify(board));
      } else {
        const currentBoard = [...config[currentTask.type]];
        const board = [...config[data.type]];

        const currentIndex = currentBoard.findIndex((item) => item.id === currentTask.id);
        currentBoard.splice(currentIndex, 1);

        const dropIndex = board.findIndex((item) => item.id === data.id);
        board.splice(dropIndex, 0, {...currentTask, type: data.type});

        localStorage.setItem(data.type, JSON.stringify(board));
        localStorage.setItem(currentTask.type, JSON.stringify(currentBoard));
      }

      onDragEventEnd();
    }
  };

  const handleBoardDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleBoardDrop = (data: PlannerType) => (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (!isDragOverTask && currentTask) {
      if (currentTask.type === data.id) {
        const board = [...config[data.id]];

        const currentIndex = board.findIndex((item) => item.id === currentTask.id);

        board.splice(currentIndex, 1);
        board.push({...currentTask, type: data.id});

        localStorage.setItem(data.id, JSON.stringify(board));
      } else {
        const currentBoard = [...config[currentTask.type]];
        const board = [...data.tasks];

        const currentIndex = currentBoard.findIndex((item) => item.id === currentTask.id);

        currentBoard.splice(currentIndex, 1);
        board.push({...currentTask, type: data.id});

        localStorage.setItem(currentTask.type, JSON.stringify(currentBoard));
        localStorage.setItem(data.id, JSON.stringify(board));
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
      const updatedConfig = [...config[currentTask.type]];
      const currentIndex = config[currentTask.type].findIndex((item) => item.id === currentTask.id);

      updatedConfig.splice(currentIndex, 1);

      localStorage.setItem(currentTask.type, JSON.stringify(updatedConfig));
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
      localStorage.setItem(TASK_TYPE.UPCOMING, JSON.stringify(defaultData[TASK_TYPE.UPCOMING]));
    }

    if (!inProgressStorage) {
      localStorage.setItem(
        TASK_TYPE.IN_PROGRESS,
        JSON.stringify(defaultData[TASK_TYPE.IN_PROGRESS]),
      );
    }

    if (!doneStorage) {
      localStorage.setItem(TASK_TYPE.DONE, JSON.stringify(defaultData[TASK_TYPE.DONE]));
    }
  }, []);

  useEffect(() => {
    if (upcomingStorage && inProgressStorage && doneStorage) {
      const configuration: PlannerConfigType = {
        [TASK_TYPE.UPCOMING]: JSON.parse(upcomingStorage),
        [TASK_TYPE.IN_PROGRESS]: JSON.parse(inProgressStorage),
        [TASK_TYPE.DONE]: JSON.parse(doneStorage),
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
