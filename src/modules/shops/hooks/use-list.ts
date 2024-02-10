import React from 'react';
import { IEntity } from '../types';
import { message } from 'antd';
import { session } from 'services';
import { Api, Mappers } from '..';
import axios from 'axios';
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

  const refetch = async () => { 
    try {
      setState(prev => ({ ...prev, isLoading: true })); 

      const { data } = await axios.get(config.api.baseURL + '/shops', {
        headers: { 'x-auth-token': config.api.tokenKEY }
      });
      setState(prev => ({ ...prev, shops: data.data })); 
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  return { ...state, refetch };
};

/**
 * https://axios-http.com/docs/interceptors
 * https://axios-http.com/docs/req_config
 */
