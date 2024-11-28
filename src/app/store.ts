import { todolistsReducer } from 'features/todolistList/model/todolistsSlice';
import { tasksReducer } from 'features/todolistList/model/tasksSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { appReducer } from 'app/model/appSlice';
import { authReducer } from 'features/auth/model/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import { todolistApi } from 'features/todolistList/api/todolistAPI';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
    [todolistApi.reducerPath]: todolistApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todolistApi.middleware),
});

setupListeners(store.dispatch);

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

// @ts-ignore
window.store = store;
