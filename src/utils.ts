import {PlannerConfigType, TaskDataType} from '@/types';
import {TASK_TYPE} from './constants';

export const getPlannerConfig = (data: TaskDataType[]): PlannerConfigType => {
  const config: PlannerConfigType = {
    [TASK_TYPE.BACKLOG]: [],
    [TASK_TYPE.IN_PROGRESS]: [],
    [TASK_TYPE.DONE]: [],
  };

  data.forEach((item) => {
    if (item.type === TASK_TYPE.BACKLOG) {
      config[TASK_TYPE.BACKLOG].push(item);
    }

    if (item.type === TASK_TYPE.IN_PROGRESS) {
      config[TASK_TYPE.IN_PROGRESS].push(item);
    }

    if (item.type === TASK_TYPE.DONE) {
      config[TASK_TYPE.DONE].push(item);
    }
  });

  config[TASK_TYPE.BACKLOG].sort((a, b) => a.order - b.order);
  config[TASK_TYPE.IN_PROGRESS].sort((a, b) => a.order - b.order);
  config[TASK_TYPE.DONE].sort((a, b) => a.order - b.order);

  return config;
};
