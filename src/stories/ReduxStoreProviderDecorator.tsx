import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { todolistsReducer } from '../features/todolistList/redusers/todolistsReducer'
import { tasksReducer } from '../features/todolistList/redusers/tasksReduser'
import React from 'react'
import { thunk } from 'redux-thunk'
import { TaskStatuses, TodoTaskPriorities } from '../api/todolist-api'
import { appReducer } from '../app/reducers/appReducer'
import { authReducer } from '../features/login/reduser/auth-reduser'
import { MemoryRouter, RouterProvider } from 'react-router-dom'
import { router } from '../routes/router'

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
})

type returnReducerType = ReturnType<typeof rootReducer>

const initialGlobalState = {
  tasks: {
    todolistId1: [
      {
        id: '1',
        status: TaskStatuses.New,
        title: 'XP',
        todoListId: 'todolistId1',
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
        todoListId: 'todolistId1',
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
        todoListId: 'todolistId1',
        description: '',
        priority: TodoTaskPriorities.Low,
        order: 0,
        addedDate: '',
        startDate: '',
        deadline: '',
      },
    ],
    todolistId2: [
      {
        id: '1',
        status: TaskStatuses.New,
        title: 'CSS&HTML',
        todoListId: 'todolistId2',
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
        todoListId: 'todolistId2',
        description: '',
        priority: TodoTaskPriorities.Low,
        order: 0,
        addedDate: '',
        startDate: '',
        deadline: '',
      },
    ],
  },
  todolists: [
    { id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: Date(), order: 0, entityStatus: 'idle' },
    { id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: Date(), order: 0, entityStatus: 'idle' },
  ],
  app: {
    status: 'idle',
    error: null,
    isInitialized: true,
  },
  auth: {
    isLoggedIn: true,
  },
} as returnReducerType

export const storybookStore = legacy_createStore(rootReducer, initialGlobalState as any, applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return (
    <Provider store={storybookStore}>
      <RouterProvider router={router} />
      {/*<MemoryRouter>{storyFn()}</MemoryRouter>*/}
    </Provider>
  )
}
