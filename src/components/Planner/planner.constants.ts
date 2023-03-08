import {PlannerType, TaskDataType} from '@/types';
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

export const mockData: TaskDataType[] = [
  {id: '1', content: 'Work on my schedule', type: TASK_TYPE.BACKLOG, order: 1},
  {id: '2', content: 'Buy groceries', type: TASK_TYPE.BACKLOG, order: 3},
  {id: '3', content: 'Code new project', type: TASK_TYPE.IN_PROGRESS, order: 1},
  {id: '4', content: 'Code snake game', type: TASK_TYPE.DONE, order: 1},
  {id: '5', content: 'Do workout', type: TASK_TYPE.BACKLOG, order: 2},
];
