import { v1 } from 'uuid'
import {
  addTodolistAC,
  changedTodolistCoverAC,
  changedTodolistFilterAC,
  changeTodolistTitleAC,
  deleteTodolistAC,
  setTodolistsAC,
  todolistsReducer,
} from './todolistsReducer'
import { TodoListDomainType } from '../../../data/dataPropsTypes'
import { TodolistType } from '../../../api/todolist-api'

//test data
let todolistId1: string
let todolistId2: string
let startState: TodoListDomainType[] = []

//initialization
beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()
  startState = [
    { id: todolistId1, title: 'What to learn', filter: 'all', addedDate: Date(), order: 0, entityStatus: 'idle' },
    { id: todolistId2, title: 'What to buy', filter: 'all', addedDate: Date(), order: 0, entityStatus: 'idle' },
  ]
})

test('correct todolist should be removed', () => {
  const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1))

  expect(endState.length).toBe(1)
  // удалится нужный тудулист, а не любой
  expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
  const title = 'new todolist'
  const newTodo: TodolistType = { id: 'test', title, order: 0, addedDate: '' }

  const endState = todolistsReducer(startState, addTodolistAC(newTodo))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(title)
})

test('correct todolist should change its name', () => {
  const changedTitle = 'New Todolist'

  const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, changedTitle))
  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(changedTitle)
})

test('correct filter of todolist should be changed', () => {
  const endState = todolistsReducer(startState, changedTodolistFilterAC(todolistId2, 'completed'))
  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe('completed')
})

test('correct todolist cover changed', () => {
  const endState = todolistsReducer(startState, changedTodolistCoverAC(todolistId2, 'newImg'))
  expect(endState[0].coverImage).toBe(undefined)
  expect(endState[1].coverImage).toBe('newImg')

  const endState2 = todolistsReducer(endState, changedTodolistCoverAC(todolistId1, 'newImg'))
  expect(endState2[0].coverImage).toBe('newImg')
  expect(endState2[1].coverImage).toBe('newImg')
})

test('todolists should br set to the state', () => {
  const endState = todolistsReducer([], setTodolistsAC(startState))

  expect(endState.length).toBe(2)
})
