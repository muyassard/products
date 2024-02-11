import { http } from 'services';
import { IApi } from './types';

export const List = () => http.get<IApi.List.Response>('/shops');
export const Single = ({ shopId }: IApi.Single.Request) => http.get<IApi.Single.Response>(`/shops/${shopId}`);
