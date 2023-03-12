import {createContext, DragEvent} from 'react';
import {PlannerType, TaskDataType} from '@/types';

type ControllerType = {
  data: PlannerType[];
  isModalOpen: boolean;
  handleDragStart: (data: TaskDataType) => (event: DragEvent<HTMLDivElement>) => void;
  handleDrop: (data: TaskDataType) => (event: DragEvent<HTMLDivElement>) => void;
  handleBoardDrop: (data: PlannerType) => (event: DragEvent<HTMLDivElement>) => void;
  handleDragEnd: (event: DragEvent<HTMLDivElement>) => void;
  handleDragOver: (event: DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (event: DragEvent<HTMLDivElement>) => void;
  handleBoardDragOver: (event: DragEvent<HTMLDivElement>) => void;
  handleModalOpen: () => void;
  handleModalClose: () => void;
};

export const ControllerContext = createContext<ControllerType | null>(null);
