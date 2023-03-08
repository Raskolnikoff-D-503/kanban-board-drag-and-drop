import {TASK_TYPE} from '@/constants';

type TaskType = typeof TASK_TYPE[keyof typeof TASK_TYPE];

export type TaskDataType = {
  id: string;
  content: string;
  type: TaskType;
  order: number;
};

export type PlannerType = {
  id: TaskType;
  label: string;
  tasks: TaskDataType[];
};

export type PlannerConfigType = {
  [TASK_TYPE.BACKLOG]: TaskDataType[];
  [TASK_TYPE.IN_PROGRESS]: TaskDataType[];
  [TASK_TYPE.DONE]: TaskDataType[];
};
