import { BaseResponse } from 'common/types';
import { AddTaskArgs, DeleteTaskArgs, ResponseTypeGetTask, Task, UpdateTaskModelType } from './taskAPI.types';
import { baseApi } from 'app/baseApi';
import { Paths } from 'common/Paths';

export const PageSize = 4;

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTask: builder.query<ResponseTypeGetTask, { todolistId: string; args: { page: number; count?: number } }>({
      query: ({ todolistId, args }) => {
        return {
          url: `${Paths.todolists}/${todolistId}/tasks`,
          params: { ...args, count: args.count ?? PageSize },
        };
      },
      providesTags: (result, error, { todolistId }) =>
        result
          ? [...result.items.map(({ id }) => ({ type: 'Task', id }) as const), { type: 'Task', id: todolistId }]
          : [{ type: 'Task' }],
    }),
    addTask: builder.mutation<BaseResponse<{ item: Task }>, AddTaskArgs>({
      query: (arg) => {
        const { todolistId, title } = arg;
        return {
          url: `${Paths.todolists}/${todolistId}/${Paths.tasks}`,
          body: { title },
          method: 'POST',
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Task', id: arg.todolistId }],
    }),
    deleteTask: builder.mutation<BaseResponse, DeleteTaskArgs>({
      query: (arg) => {
        const { todolistId, taskId } = arg;
        return {
          url: `${Paths.todolists}/${todolistId}/${Paths.tasks}/${taskId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Task', id: arg.taskId }],
    }),
    updateTask: builder.mutation<
      BaseResponse<{ item: Task }>,
      { todolistId: string; taskId: string; model: UpdateTaskModelType }
    >({
      query: (arg) => {
        const { taskId, model, todolistId } = arg;
        return {
          url: `${Paths.todolists}/${todolistId}/${Paths.tasks}/${taskId}`,
          method: 'PUT',
          body: model,
        };
      },
      async onQueryStarted({ todolistId, taskId, model }, api) {
        const cachedArgsForQuery = taskApi.util.selectCachedArgsForQuery(api.getState(), 'getTask');
        let patchResults: any[] = [];
        cachedArgsForQuery.forEach(({ args }) => {
          patchResults.push(
            api.dispatch(
              taskApi.util.updateQueryData(
                'getTask',
                { todolistId, args: { page: args.page, count: PageSize } },
                (state) => {
                  const index = state.items.findIndex((t) => t.id === taskId);
                  if (index !== -1) {
                    state.items[index] = { ...state.items[index], ...model };
                  }
                }
              )
            )
          );
        });
        try {
          await api.queryFulfilled;
        } catch (e) {
          patchResults.forEach((patchResult) => patchResult.undo());
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Task', id: arg.taskId }],
    }),
  }),
});

export const { useGetTaskQuery, useAddTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = taskApi;
