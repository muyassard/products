import { http, session } from 'services';
import { IApi, IEntity } from './types';
import { config } from 'config';

export async function List(): Promise<IEntity.Shop[]> {
  const shops: IEntity.Shop[] = await http.get(`/shops`);

  return shops;
}

export async function Single(shopId: IApi.Single.Request): Promise<IEntity.Shop> {
  const shop: IEntity.Shop = await http.get(`/shops/${shopId}`);
  return shop;
}

export async function Create({ token, ...value }: IApi.Add.Request) {
  const res = await http.post('/shops', value);
  return res;
}

export const Delete = async ( id:string, token :string) => {
  const res = await http.delete(`/shops/${id}`, { headers: { [config.api.tokenKEY]: token } });
  return res;
};

export async function Update({ id, ...body }: IApi.Update.Request): Promise<any> {
  const res = await http.patch(`/shops/${id}`, body);
  return res;
}
