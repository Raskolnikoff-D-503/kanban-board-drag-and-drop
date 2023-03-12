import React, {DragEvent, ReactNode, useState} from 'react';
import {PlannerConfigType, TaskDataType, PlannerType} from '@/types';
import {ControllerContext} from './ControllerContext';
import {TASK_TYPE} from '@/constants';

type Props = {
  children: ReactNode;
};

//TODO: delete
export const mockData: PlannerConfigType = {
  UPCOMING: [
    {id: '1', content: 'Work on my schedule', type: TASK_TYPE.UPCOMING},
    {id: '5', content: 'Do workout', type: TASK_TYPE.UPCOMING},
    {id: '2', content: 'Buy groceries', type: TASK_TYPE.UPCOMING},
  ],
  IN_PROGRESS: [{id: '3', content: 'Code new project', type: TASK_TYPE.IN_PROGRESS}],
  DONE: [{id: '4', content: 'Code snake game', type: TASK_TYPE.DONE}],
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
  const [config, setConfig] = useState<PlannerConfigType>(mockData);
  const [currentTask, setCurrentTask] = useState<TaskDataType | null>(null);
  const [isDragOverTask, setIsDragOverTask] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const configuratedData = plannerStructure.map((item) => ({...item, tasks: config[item.id]}));

  const handleDragStart = (data: TaskDataType) => (_: DragEvent<HTMLDivElement>) => {
    setCurrentTask(data);
  };

  const handleDragLeave = (_: DragEvent<HTMLDivElement>) => {
    setIsDragOverTask(false);
  };

  const handleDragEnd = (_: DragEvent<HTMLDivElement>) => {
    setCurrentTask(null);
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

        setConfig((current) => ({
          ...current,
          [data.type]: board,
        }));
      } else {
        const currentBoard = [...config[currentTask.type]];
        const board = [...config[data.type]];

        const currentIndex = currentBoard.findIndex((item) => item.id === currentTask.id);
        currentBoard.splice(currentIndex, 1);

        const dropIndex = board.findIndex((item) => item.id === data.id);
        board.splice(dropIndex, 0, {...currentTask, type: data.type});

        setConfig((current) => ({
          ...current,
          [data.type]: board,
          [currentTask.type]: currentBoard,
        }));
      }

      setCurrentTask(null);
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

        setConfig((current) => ({
          ...current,
          [data.id]: board,
        }));
      } else {
        const currentBoard = [...config[currentTask.type]];
        const board = [...data.tasks];

        const currentIndex = currentBoard.findIndex((item) => item.id === currentTask.id);

        currentBoard.splice(currentIndex, 1);
        board.push({...currentTask, type: data.id});

        setConfig((current) => ({
          ...current,
          [currentTask.type]: currentBoard,
          [data.id]: board,
        }));
      }

      setCurrentTask(null);
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <ControllerContext.Provider
      value={{
        data: configuratedData,
        isModalOpen,
        handleDragStart,
        handleDragLeave,
        handleDragEnd,
        handleDragOver,
        handleDrop,
        handleBoardDragOver,
        handleBoardDrop,
        handleModalOpen,
        handleModalClose,
      }}
    >
      {children}
    </ControllerContext.Provider>
  );
};
