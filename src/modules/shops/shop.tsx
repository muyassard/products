import { http, session } from 'services';
import { IApi, IEntity, IForm } from './types';
import { config } from 'config';

export async function List(): Promise<IEntity.Shop[]> {
  const shops: IEntity.Shop[] = await http.get(`/shops`);

  return shops;
}

export async function Single(shopId: IApi.Single.Request): Promise<IEntity.Shop> {
  const shop: IEntity.Shop = await http.get(`/shops/${shopId}`);
  return shop;
}

export async function Create({ token, ...value }: IApi.Add.Request): Promise<any> {
  const res = await http.post('/shops', value, { headers: { [config.api.tokenKEY]: session.get() } });
  return res;
}

export const Delete = async ({ token, id }: IApi.Delete.Request): Promise<any> => {
  const res = await http.delete(`/shops/${id}`, { headers: { [config.api.tokenKEY]: token } });
  return res;
};

export async function Update({ id, ...body }: IApi.Update.Request): Promise<any> {
  const res = await http.patch(`/shops/${id}`, JSON.stringify(body));
  return res;
}
