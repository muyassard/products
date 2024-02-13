import { http } from 'services';
import { SellerIApi } from './types';

export const Add = (data: SellerIApi.Add.Request) => http.post<SellerIApi.Add.Response>(`/shops`, data);

export const Delete = ({ shopID, sellerID }: SellerIApi.Delete.Request) =>
  http.delete<SellerIApi.Delete.Response>(`shops/${shopID}/seller/${sellerID}`);
