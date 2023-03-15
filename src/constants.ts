export const TASK_TYPE = {
  UPCOMING: 'UPCOMING',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
} as const;

export const TASK_STATUS = {
  [TASK_TYPE.UPCOMING]: 'upcoming',
  [TASK_TYPE.IN_PROGRESS]: 'in-progress',
  [TASK_TYPE.DONE]: 'done',
} as const;
