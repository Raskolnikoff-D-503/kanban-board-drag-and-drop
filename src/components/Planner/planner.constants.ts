import {PlannerConfigType, PlannerType} from '@/types';
import {TASK_TYPE} from '@/constants';

export const plannerStructure: PlannerType[] = [
  {
    id: TASK_TYPE.BACKLOG,
    label: 'Backlog',
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

export const mockData: PlannerConfigType = {
  BACKLOG: [
    {id: '1', content: 'Work on my schedule', type: TASK_TYPE.BACKLOG},
    {id: '5', content: 'Do workout', type: TASK_TYPE.BACKLOG},
    {id: '2', content: 'Buy groceries', type: TASK_TYPE.BACKLOG},
  ],
  IN_PROGRESS: [{id: '3', content: 'Code new project', type: TASK_TYPE.IN_PROGRESS}],
  DONE: [{id: '4', content: 'Code snake game', type: TASK_TYPE.DONE}],
};
