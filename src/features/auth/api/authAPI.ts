import { BaseResponse } from 'common/types';
import { instance } from 'common/instance/instance';
import { LoginParams } from './authAPI.types';

export const authAPI = {
  login(data: LoginParams) {
    return instance.post<BaseResponse<{ userId: number }>>('auth/login', data);
  },
  me() {
    return instance.get<BaseResponse<{ id: number; login: string; email: string }>>('auth/me');
  },
  logOut() {
    return instance.delete<BaseResponse>('auth/login');
  },
};
