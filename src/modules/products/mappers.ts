import get from 'lodash/get';
import { IEntity } from './types';

export {};
export const Product = (item?: any): IEntity.Product => ({
  id: get(item, '_id') || '',
  name: get(item, 'name') || '',
  description: get(item, 'description') || '',
  price: get(item, 'price') || '',
  amount: get(item, 'amount') || 0,
});
