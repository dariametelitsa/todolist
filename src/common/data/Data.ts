import { Tasks, TodoListDomain } from './dataPropsTypes';
import { v1, v4 } from 'uuid';
import { TaskStatuses, TodoTaskPriorities } from '../enums/enums';

export const todolistId1 = v4();
export const todolistId2 = v4();

export const tasksArr: Tasks = {
  [todolistId1]: [
    {
      id: v1(),
      title: 'XP',
      status: TaskStatuses.New,
      todoListId: todolistId1,
      description: '',
      priority: TodoTaskPriorities.Low,
      order: 0,
      addedDate: '',
      startDate: '',
      deadline: '',
    },
    {
      id: v1(),
      title: 'DDD',
      status: TaskStatuses.New,
      todoListId: todolistId1,
      description: '',
      priority: TodoTaskPriorities.Low,
      order: 0,
      addedDate: '',
      startDate: '',
      deadline: '',
    },
    {
      id: v1(),
      title: 'Scrum',
      status: TaskStatuses.New,
      todoListId: todolistId1,
      description: '',
      priority: TodoTaskPriorities.Low,
      order: 0,
      addedDate: '',
      startDate: '',
      deadline: '',
    },
  ],
  [todolistId2]: [
    {
      id: v1(),
      title: 'CSS&HTML',
      status: TaskStatuses.New,
      todoListId: todolistId2,
      description: '',
      priority: TodoTaskPriorities.Low,
      order: 0,
      addedDate: '',
      startDate: '',
      deadline: '',
    },
    {
      id: v1(),
      title: 'JS',
      status: TaskStatuses.New,
      todoListId: todolistId2,
      description: '',
      priority: TodoTaskPriorities.Low,
      order: 0,
      addedDate: '',
      startDate: '',
      deadline: '',
    },
    {
      id: v1(),
      title: 'React',
      status: TaskStatuses.New,
      todoListId: todolistId2,
      description: '',
      priority: TodoTaskPriorities.Low,
      order: 0,
      addedDate: '',
      startDate: '',
      deadline: '',
    },
    {
      id: v1(),
      title: 'Redux',
      status: TaskStatuses.New,
      todoListId: todolistId2,
      description: '',
      priority: TodoTaskPriorities.Low,
      order: 0,
      addedDate: '',
      startDate: '',
      deadline: '',
    },
  ],
};

export const todoListsData: TodoListDomain[] = [
  { id: todolistId1, title: 'What to learn', filter: 'all', addedDate: Date(), order: 0, entityStatus: 'idle' },
  { id: todolistId2, title: 'What to do', filter: 'all', addedDate: Date(), order: 0, entityStatus: 'idle' },
];
