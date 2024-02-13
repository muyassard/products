import React from 'react';
import { IApi } from '../types';
import { message } from 'antd';
import { Api, Mappers } from '..';

interface IState extends IApi.List.Response {
  isLoading: boolean;
}
interface Params extends IApi.List.Request {}

export const useList = (params: Params) => {
  const [state, setState] = React.useState<IState>({
    isLoading: false,
    items: [],
    meta: {
      limit: 0,
      page: 0,
      total: 0
    }
  });

  const refetch = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const { data } = await Api.List(params);
      const items = (data.items || []).map(Mappers.Shop);
      const meta = data.meta;
      setState(prev => ({ ...prev, items, meta, isLoading: false }));
    } catch (err) {
      setState(prev => ({ ...prev, isLoading: false }));
      message.error('Failed to load shops');
    }
  };

  React.useEffect(() => {
    refetch();
  }, [params]); // HM_0001

  return { ...state, refetch };
};
