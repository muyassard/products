import { http } from 'services';
import { IEntity, IForm } from './types';

export async function List() {
  const shops: IEntity.Shop[] = await http.get(`/shops`);
  // const data: IEntity.Shop[] = await res.json(); // JSON string -> convert object

  return shops;
}

export async function Single(shopId: string) {
  const shop: IEntity.Shop = await http.get(`/shops/${shopId}`);
  return shop;
}

export async function Create(values: IForm.Add) {
  const res = await http.post('/shops', JSON.stringify(values));
  return res;
}
export async function Delete(shopId: string) {
  const res = await http.delete(`/shops/${shopId}`);
  return res;
}
export async function Update({ id, ...body }: IForm.Update) {
  const res = await http.patch(`/todos/${id}`, JSON.stringify(body));
  
  return res;
}
