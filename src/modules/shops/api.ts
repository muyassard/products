import { http } from 'services';
import { IApi } from './types';

export const List = ({ page, limit }: IApi.List.Request) =>
  http.get<IApi.List.Response>(`/shops?limit=${limit}&page=${page}`); 

export const Single = ({ id }: IApi.Single.Request) => http.get<IApi.Single.Response>(`/shops/${id}`);

export const Add = (data: IApi.Add.Request) => http.post<IApi.Add.Response>(`/shops`, data);
export const Update = ({ id, ...data }: IApi.Update.Request) => http.put<IApi.Update.Response>(`/shops/${id}`, data);

export const Delete = ({ id }: IApi.Delete.Request) => http.delete<IApi.Delete.Response>(`/shops/${id}`);
