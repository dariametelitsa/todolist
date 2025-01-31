import { BaseResponse } from 'common/types';
import { LoginParams } from './authAPI.types';
import { baseApi } from 'app/baseApi';
import { Paths } from 'common/Paths';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<BaseResponse<{ id: number; login: string; email: string }>, void>({
      query: () => ({ url: `${Paths.auth}/me` }),
    }),
    login: builder.mutation<BaseResponse<{ userId: number; token: string }>, LoginParams>({
      query: (data) => ({ url: `${Paths.auth}/login`, method: 'POST', body: data }),
    }),
    logout: builder.mutation<BaseResponse, void>({
      query: () => ({ url: `${Paths.auth}/login`, method: 'DELETE' }),
    }),
  }),
});

export const { useMeQuery, useLogoutMutation, useLoginMutation } = authApi;
