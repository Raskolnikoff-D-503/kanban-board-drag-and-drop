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

export const PALETTE = {
  RED: '#ffbdae',
  YELLOW: '#ffea79',
  GREEN: '#93e396',
} as const;
