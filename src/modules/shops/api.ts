import { http } from 'services';
import { IApi } from './types';
import { config } from 'config';

export const List = ({ token }: IApi.List.Request) =>
  http.get<IApi.List.Response>('/shops', { headers: { [config.api.tokenKEY]: token } });

export const Single = ({ token, shopId }: IApi.Single.Request) =>
  http.get<IApi.Single.Response>(`/shops/${shopId}`, { headers: { [config.api.tokenKEY]: token } });
