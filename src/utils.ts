import {PlannerConfigType, TaskDataType, TaskType} from './types';

export const getTaskIndex = (tasks: TaskDataType[], taskId: string): number =>
  tasks.findIndex((item) => item.id === taskId);

export const getTasksCopyByType = (config: PlannerConfigType, type: TaskType): TaskDataType[] => [
  ...config[type],
];

export const convertTasksToJSON = (tasks: TaskDataType[]): string => JSON.stringify(tasks);
export const convertJSONToTasks = (tasks: string): TaskDataType[] => JSON.parse(tasks);
