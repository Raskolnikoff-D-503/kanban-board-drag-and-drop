import React, {ReactNode, useCallback, useEffect, useState} from 'react';
import {PlannerConfigType, TaskDataType, PlannerType} from '@/types';
import {ControllerContext} from './ControllerContext';
import {convertJSONToTasks, convertTasksToJSON} from '@/utils';
import {TASK_TYPE} from '@/constants';

type Props = {
  children: ReactNode;
};

const defaultData: PlannerConfigType = {
  [TASK_TYPE.UPCOMING]: [],
  [TASK_TYPE.IN_PROGRESS]: [],
  [TASK_TYPE.COMPLETE]: [],
};

export const plannerStructure: PlannerType[] = [
  {
    id: TASK_TYPE.UPCOMING,
    label: 'Upcoming',
    tasks: [],
  },
  {
    id: TASK_TYPE.IN_PROGRESS,
    label: 'In progress',
    tasks: [],
  },
  {
    id: TASK_TYPE.COMPLETE,
    label: 'Complete',
    tasks: [],
  },
];

export const Controller = ({children}: Props) => {
  const upcomingStorage = localStorage.getItem(TASK_TYPE.UPCOMING);
  const inProgressStorage = localStorage.getItem(TASK_TYPE.IN_PROGRESS);
  const completeStorage = localStorage.getItem(TASK_TYPE.COMPLETE);

  const [config, setConfig] = useState<PlannerConfigType>(defaultData);
  const [currentTask, setCurrentTask] = useState<TaskDataType | null>(null);

  const [isOnDrag, setIsOnDrag] = useState<boolean>(false);
  const [isDragOverTask, setIsDragOverTask] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const configuratedData = plannerStructure.map((item) => ({...item, tasks: config[item.id]}));

  const handleDragEventStart = (data: TaskDataType) => {
    setCurrentTask(data);
    setIsOnDrag(true);
  };

  const handleDragOverEvent = (status: boolean) => {
    setIsDragOverTask(status);
  };

  const handleDragEventEnd = useCallback(() => {
    setCurrentTask(null);
    setIsOnDrag(false);
  }, []);

  const handleModalOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    const upcomingStorage = localStorage.getItem(TASK_TYPE.UPCOMING);
    const inProgressStorage = localStorage.getItem(TASK_TYPE.IN_PROGRESS);
    const completeStorage = localStorage.getItem(TASK_TYPE.COMPLETE);

    if (!upcomingStorage) {
      localStorage.setItem(TASK_TYPE.UPCOMING, convertTasksToJSON(defaultData[TASK_TYPE.UPCOMING]));
    }

    if (!inProgressStorage) {
      localStorage.setItem(
        TASK_TYPE.IN_PROGRESS,
        convertTasksToJSON(defaultData[TASK_TYPE.IN_PROGRESS]),
      );
    }

    if (!completeStorage) {
      localStorage.setItem(TASK_TYPE.COMPLETE, convertTasksToJSON(defaultData[TASK_TYPE.COMPLETE]));
    }
  }, []);

  useEffect(() => {
    if (upcomingStorage && inProgressStorage && completeStorage) {
      const configuration: PlannerConfigType = {
        [TASK_TYPE.UPCOMING]: convertJSONToTasks(upcomingStorage),
        [TASK_TYPE.IN_PROGRESS]: convertJSONToTasks(inProgressStorage),
        [TASK_TYPE.COMPLETE]: convertJSONToTasks(completeStorage),
      };

      setConfig(configuration);
    }
  }, [upcomingStorage, inProgressStorage, completeStorage]);

  return (
    <ControllerContext.Provider
      value={{
        config,
        currentTask,
        data: configuratedData,

        isModalOpen,
        isDragOverTask,
        isOnDrag,

        handleDragEventStart,
        handleDragOverEvent,
        handleDragEventEnd,

        handleModalOpen,
        handleModalClose,
      }}
    >
      {children}
    </ControllerContext.Provider>
  );
};
