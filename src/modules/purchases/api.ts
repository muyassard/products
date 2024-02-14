import { http } from 'services';
import { IApi } from './types';

export const List = ({ page, limit }: IApi.List.Request) =>
  http.get<IApi.List.Response>(`/purchases?limit=${limit}&page=${page}`);

export const Single = ({ _id }: IApi.Single.Request) => http.get<IApi.Single.Response>(`/purchases/${_id}`);

export const Add = (data: IApi.Add.Request) => http.post<IApi.Add.Response>(`/purchases`, data);
