import { http } from 'services';
import { IApi, IEntity, IForm } from './types';
import { config } from 'config';

export async function List(): Promise<IEntity.Shop[]> {
  const shops: IEntity.Shop[] = await http.get(`/shops`);
  // const data: IEntity.Shop[] = await res.json(); // JSON string -> convert object

  return shops;
}

export async function Single(shopId: string): Promise<IEntity.Shop> {
  const shop: IEntity.Shop = await http.get(`/shops/${shopId}`);
  return shop;
}

export async function Create({ token,...values }:IApi.Add.Request ) {
  const res = await http.post('/shops',JSON.stringify(values), { headers: { [config.api.tokenKEY]: token } });
  return res; 
}


export const Delete = ( { token,id }: IApi.Delete.Request) =>
  http.delete(`/shops/${id}`, { headers: { [config.api.tokenKEY]: token } });

export async function Update({ id, ...body }: IForm.Update) {
  const res = await http.patch(`/shops/${id}`, JSON.stringify(body));
  return res;
}
