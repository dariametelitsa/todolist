import { v1 } from 'uuid';
import {
  addTodolist,
  changedTodolistCover,
  changedTodolistFilter,
  changeTodolistTitle,
  deleteTodolist,
  getTodolists,
  todolistsReducer,
} from './todolistsSlice';
import { TodoListDomainType } from 'common/data/dataPropsTypes';
import { ActionTypeForTest } from 'common/types';
import { TodolistType } from '../todolistAPI/todolistAPI.types';

//test data
let todolistId1: string;
let todolistId2: string;
let startState: TodoListDomainType[] = [];

//initialization
beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  startState = [
    { id: todolistId1, title: 'What to learn', filter: 'all', addedDate: Date(), order: 0, entityStatus: 'idle' },
    { id: todolistId2, title: 'What to buy', filter: 'all', addedDate: Date(), order: 0, entityStatus: 'idle' },
  ];
});

test('correct todolist should be removed', () => {
  const action: ActionTypeForTest<typeof deleteTodolist.fulfilled> = {
    type: deleteTodolist.fulfilled.type,
    payload: todolistId1,
  };
  const endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(1);
  // удалится нужный тудулист, а не любой
  expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
  const title = 'new todolist';
  const newTodo: TodolistType = { id: 'test', title, order: 0, addedDate: '' };
  const action: ActionTypeForTest<typeof addTodolist.fulfilled> = {
    type: addTodolist.fulfilled.type,
    payload: {
      todolist: newTodo,
    },
  };

  const endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(title);
});

test('correct todolist should change its name', () => {
  const changedTitle = 'New Todolist';
  const action: ActionTypeForTest<typeof changeTodolistTitle.fulfilled> = {
    type: changeTodolistTitle.fulfilled.type,
    payload: {
      todolistId: todolistId2,
      title: changedTitle,
    },
  };
  const endState = todolistsReducer(startState, action);
  expect(endState[0].title).toBe('What to learn');
  expect(endState[1].title).toBe(changedTitle);
});

test('correct filter of todolist should be changed', () => {
  const endState = todolistsReducer(startState, changedTodolistFilter({ id: todolistId2, filter: 'completed' }));
  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe('completed');
});

test('correct todolist cover changed', () => {
  const endState = todolistsReducer(startState, changedTodolistCover({ id: todolistId2, coverImage: 'newImg' }));
  expect(endState[0].coverImage).toBe(undefined);
  expect(endState[1].coverImage).toBe('newImg');

  const endState2 = todolistsReducer(endState, changedTodolistCover({ id: todolistId1, coverImage: 'newImg' }));
  expect(endState2[0].coverImage).toBe('newImg');
  expect(endState2[1].coverImage).toBe('newImg');
});

test('todolists should br set to the state', () => {
  const action: ActionTypeForTest<typeof getTodolists.fulfilled> = {
    type: getTodolists.fulfilled.type,
    payload: { todolists: startState },
  };
  const endState = todolistsReducer([], action);
  expect(endState.length).toBe(2);
});
