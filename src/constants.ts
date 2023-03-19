export const TASK_TYPE = {
  UPCOMING: 'UPCOMING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETE: 'COMPLETE',
} as const;

export const TASK_STATUS = {
  [TASK_TYPE.UPCOMING]: 'upcoming',
  [TASK_TYPE.IN_PROGRESS]: 'in-progress',
  [TASK_TYPE.COMPLETE]: 'complete',
} as const;

export const COLOR = {
  RED: 'red',
  YELLOW: 'yellow',
  GREEN: 'green',
} as const;
