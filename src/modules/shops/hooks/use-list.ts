import React from 'react';
import { IEntity } from '../types';
import { message } from 'antd';
import { Api, Mappers } from '..';
import { http, session } from 'services';
import { config } from 'config';

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
        const { data } = await Api.List();
        const shops = (data || []).map(Mappers.Shop);
        setState({ shops, isLoading: false });
      } catch (err) {
        setState({ shops: [], isLoading: false });
        message.error('Failed to load shops');
      }
    }
    load();
  }, []);

  const refetch = async () => {
    try {
      const { data } = await Api.List();
      const shops = (data || []).map(Mappers.Shop);
      setState({ shops, isLoading: false });

      message.success('fetched data');
    } catch (error) {
      message.error('not is fetching data');
    } finally {
      setState(prev=>({...prev, isLoading: false }));
    }
  };
  return { ...state, refetch };
};

/**
 * https://axios-http.com/docs/interceptors
 * https://axios-http.com/docs/req_config
 */
