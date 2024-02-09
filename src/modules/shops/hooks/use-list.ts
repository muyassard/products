import React from 'react';
import { IEntity } from '../types';
import { message } from 'antd';
import { session } from 'services';
import { Api, Mappers } from '..';

interface IState {
  isLoading: boolean;
  shops: IEntity.Shop[];
}

export const useList = () => {
  const [state, setState] = React.useState<IState>({
    isLoading: false,
    shops: []
  });

  React.useEffect(() => {
    async function load() {
      try {
        const { data } = await Api.List({ token: session.get() });
        const shops = (data.data || []).map(Mappers.Shop);
        setState({ shops, isLoading: false });
      } catch (err) {
        setState({ shops: [], isLoading: false });
        message.error('Failed to load shops');
      }
    }
    load();
  }, []);

  const refetch = () => {};

  return { ...state, refetch };
};

/**
 * https://axios-http.com/docs/interceptors
 * https://axios-http.com/docs/req_config
 */
