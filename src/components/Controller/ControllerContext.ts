import {createContext} from 'react';
import {PlannerConfigType, PlannerType, TaskDataType} from '@/types';

type ControllerType = {
  config: PlannerConfigType;
  currentTask: TaskDataType | null;
  data: PlannerType[];

  isModalOpen: boolean;
  isDragOverTask: boolean;
  isOnDrag: boolean;

  handleDragEventStart: (data: TaskDataType) => void;
  handleDragOverEvent: (status: boolean) => void;
  handleDragEventEnd: () => void;

  handleModalOpen: () => void;
  handleModalClose: () => void;
};

export const ControllerContext = createContext<ControllerType | null>(null);
