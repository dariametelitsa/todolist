import { v4 } from 'uuid';
import { TasksType } from '../../../data/dataPropsTypes';
import { addTask, cleanTasksList, deleteTask, fetchTasks, tasksReducer, updateTask } from './tasksSlice';
import { addTodolist, deleteTodolist, setTodolists } from './todolistsSlice';
import { TaskStatuses, TodolistType, TodoTaskPriorities } from '../../../api/todolist-api';
import { ActionTypeForTest } from '../../../common/types/types';

const todolistId1 = v4();
const todolistId2 = v4();

let state: TasksType = {};

beforeEach(() => {
  state = {
    [todolistId1]: [
      {
        id: '1',
        status: TaskStatuses.New,
        title: 'XP',
        todoListId: todolistId1,
        description: '',
        priority: TodoTaskPriorities.Low,
        order: 0,
        addedDate: '',
        startDate: '',
        deadline: '',
      },
      {
        id: '2',
        status: TaskStatuses.Completed,
        title: 'DDD',
        todoListId: todolistId1,
        description: '',
        priority: TodoTaskPriorities.Low,
        order: 0,
        addedDate: '',
        startDate: '',
        deadline: '',
      },
      {
        id: '3',
        status: TaskStatuses.New,
        title: 'Scrum',
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
        id: '1',
        status: TaskStatuses.New,
        title: 'CSS&HTML',
        todoListId: todolistId2,
        description: '',
        priority: TodoTaskPriorities.Low,
        order: 0,
        addedDate: '',
        startDate: '',
        deadline: '',
      },
      {
        id: '2',
        status: TaskStatuses.Completed,
        title: 'JS',
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
});

test('correct task should be removed', () => {
  const action: ActionTypeForTest<typeof deleteTask.fulfilled> = {
    type: deleteTask.fulfilled.type,
    payload: {
      todolistId: todolistId1,
      taskId: '1',
    },
  };

  const endState = tasksReducer(state, action);

  expect(endState[todolistId1].length).toBe(2);
  expect(endState[todolistId1][0].title).toBe('DDD');
  expect(Object.keys(endState).length).toBe(2);
  expect(endState[todolistId2][0].title).toBe('CSS&HTML');
});

test('task should be add correct', () => {
  const newTitle = "I'm new here!";
  const newTask = {
    id: '1',
    status: TaskStatuses.New,
    title: newTitle,
    todoListId: todolistId1,
    description: '',
    priority: TodoTaskPriorities.Low,
    order: 0,
    addedDate: '',
    completed: false,
    startDate: '',
    deadline: '',
  };
  const action: ActionTypeForTest<typeof addTask.fulfilled> = {
    type: addTask.fulfilled.type,
    payload: { task: newTask },
  };
  const endState = tasksReducer(state, action);

  expect(endState[todolistId1].length).toBe(4);
  expect(endState[todolistId1][0].title).toBe(newTitle);
  expect(endState[todolistId1][0].status).toBe(TaskStatuses.New);
  expect(Object.keys(endState).length).toBe(2);

  expect(endState[todolistId2].length).toBe(2);
  expect(endState[todolistId2][0].title).toBe('CSS&HTML');

  const newTask2 = {
    id: '1',
    status: TaskStatuses.New,
    title: newTitle,
    todoListId: todolistId2,
    description: '',
    priority: TodoTaskPriorities.Low,
    order: 0,
    addedDate: '',
    completed: false,
    startDate: '',
    deadline: '',
  };
  const action2: ActionTypeForTest<typeof addTask.fulfilled> = {
    type: addTask.fulfilled.type,
    payload: { task: newTask2 },
  };
  const endState2 = tasksReducer(state, action2);
  expect(endState2[todolistId2].length).toBe(3);
  expect(endState2[todolistId2][0].title).toBe(newTitle);
});

test('correct rename task title', () => {
  const newTitle = "I'm was changed";
  let taskToUpdate = state[todolistId1].find((t) => t.id === '1');
  taskToUpdate ? (taskToUpdate.title = newTitle) : (taskToUpdate = state[todolistId1][0]);
  const action: ActionTypeForTest<typeof updateTask.fulfilled> = {
    type: updateTask.fulfilled.type,
    payload: {
      task: taskToUpdate,
    },
  };

  const endState = tasksReducer(state, action);
  expect(endState[todolistId1].length).toBe(3);
  expect(endState[todolistId1][0].title).toBe(newTitle);
  expect(endState[todolistId1][1].title).toBe('DDD');
  expect(Object.keys(endState).length).toBe(2);
  expect(endState[todolistId2][0].title).toBe('CSS&HTML');
});

test('clean all tasks list from correct todolist', () => {
  const action: ActionTypeForTest<typeof cleanTasksList.fulfilled> = {
    type: cleanTasksList.fulfilled.type,
    payload: todolistId2,
  };
  const endState = tasksReducer(state, action);

  expect(Object.keys(endState).length).toBe(2);
  expect(endState[todolistId1].length).toBe(3);
  expect(endState[todolistId2].length).toBe(0);
});

test('task status should be changed correctly', () => {
  let newStatus = TaskStatuses.Completed;
  let taskToUpdate = state[todolistId1].find((t) => t.id === '1');
  taskToUpdate ? (taskToUpdate.status = newStatus) : (taskToUpdate = state[todolistId1][0]);
  const action: ActionTypeForTest<typeof updateTask.fulfilled> = {
    type: updateTask.fulfilled.type,
    payload: {
      task: taskToUpdate,
    },
  };
  const endState = tasksReducer(state, action);

  expect(endState[todolistId1].length).toBe(3);
  expect(endState[todolistId1][0].status).toBe(newStatus);
  expect(Object.keys(endState).length).toBe(2);
  expect(endState[todolistId2][0].status).toBe(TaskStatuses.New);
});

test('clean all tasks from todolist, todolist should be empty', () => {
  const action: ActionTypeForTest<typeof cleanTasksList.fulfilled> = {
    type: cleanTasksList.fulfilled.type,
    payload: todolistId1,
  };
  const endState = tasksReducer(state, action);

  expect(Object.keys(endState).length).toBe(2);
  expect(endState[Object.keys(endState)[0]].length).toBe(0);
});

test('create new tasks list to correct todolist', () => {
  const title = 'new todolist';
  const newTodo: TodolistType = { id: 'test', title, order: 0, addedDate: '' };
  const action: ActionTypeForTest<typeof addTodolist.fulfilled> = {
    type: addTodolist.fulfilled.type,
    payload: {
      todolist: newTodo,
    },
  };
  const endState = tasksReducer(state, action);

  const { [todolistId1]: first, todolistId2: second, ...newTasks } = endState;
  expect(Object.keys(endState).length).toBe(3);
  expect(endState.hasOwnProperty(newTodo.id)).toBe(true);
  expect(endState[newTodo.id].length).toBe(0);
});

test('correct task should be added to correct array', () => {
  const newTask = {
    id: '1',
    status: TaskStatuses.New,
    title: 'juice',
    todoListId: todolistId2,
    description: '',
    priority: TodoTaskPriorities.Low,
    order: 0,
    addedDate: '',
    completed: false,
    startDate: '',
    deadline: '',
  };
  const action: ActionTypeForTest<typeof addTask.fulfilled> = {
    type: addTask.fulfilled.type,
    payload: { task: newTask },
  };

  const endState = tasksReducer(state, action);

  expect(endState[todolistId1].length).toBe(3);
  expect(endState[todolistId2].length).toBe(3);
  expect(endState[todolistId2][0].id).toBeDefined();
  expect(endState[todolistId2][0].title).toBe('juice');
  expect(endState[todolistId2][0].status).toBe(TaskStatuses.New);
});

test('new array should be added when new todolist is added', () => {
  const title = 'new todolist';
  const newTodo: TodolistType = { id: 'test', title, order: 0, addedDate: '' };
  const action: ActionTypeForTest<typeof addTodolist.fulfilled> = {
    type: addTodolist.fulfilled.type,
    payload: {
      todolist: newTodo,
    },
  };
  const endState = tasksReducer(state, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== todolistId1 && k !== todolistId2);
  if (!newKey) {
    throw Error('new key should be added');
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
  const action: ActionTypeForTest<typeof deleteTodolist.fulfilled> = {
    type: deleteTodolist.fulfilled.type,
    payload: todolistId2,
  };
  const endState = tasksReducer(state, action);
  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState[todolistId2]).not.toBeDefined();
});

test('empty arrays should be added when we set todolists', () => {
  const action = setTodolists({
    todolists: [
      { id: todolistId1, title: 'What to learn', addedDate: Date(), order: 0 },
      { id: todolistId2, title: 'What to buy', addedDate: Date(), order: 0 },
    ],
  });

  const endState = tasksReducer({}, action);
  const keys = Object.keys(endState);

  expect(keys.length).toBe(2);
  expect(endState[todolistId1]).toStrictEqual([]);
  expect(endState[todolistId2]).toStrictEqual([]);
});

test('tasks should be added for todolist', () => {
  // type Action = {
  //   type: string;
  //   payload: {
  //     tasks: TaskType[];
  //     todolistId: string;
  //   };
  // };
  type Action = Omit<ReturnType<typeof fetchTasks.fulfilled>, 'meta'>;

  const action: Action = {
    type: fetchTasks.fulfilled.type,
    payload: {
      tasks: state[todolistId1],
      todolistId: todolistId1,
    },
  };

  // const action_ = fetchTasks.fulfilled(
  //   { tasks: state[todolistId1], todolistId: todolistId1 },
  //   'requestId',
  //   todolistId1
  // );

  const endState = tasksReducer(
    {
      [todolistId1]: [],
      [todolistId2]: [],
    },
    action
  );

  expect(endState[todolistId1].length).toBe(3);
  expect(endState[todolistId2].length).toBe(0);
});
