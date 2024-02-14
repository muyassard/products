import React from 'react';
import { IApi } from '../types';
import { message } from 'antd';
import { Api } from '..';

interface IState extends IApi.List.Response {
  isLoading: boolean;
}

export const useList = (params: IApi.List.Request) => {
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
      setState(prev => ({ ...prev, ...data, isLoading: false }));
    } catch (err) {
      setState(prev => ({ ...prev, isLoading: false }));
      message.error('Failed to load shops');
    }
  };

  React.useEffect(() => {
    refetch();
  }, [params.limit, params.page]); // HM_0001

  return { ...state, refetch };
};
