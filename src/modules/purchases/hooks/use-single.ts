import React from 'react';
import { message } from 'antd';

import { IApi, IEntity } from '../types';
import { Api } from '..';

interface IState {
  isLoading: boolean;
  item: IEntity.Purchase | null;
}

export const useSingle = (params: IApi.Single.Request) => {
  const [state, setState] = React.useState<IState>({ isLoading: false, item: null });

  React.useEffect(() => {
    async function load() {
      try {
        const { data: item } = await Api.Single(params);
        setState({ item, isLoading: false });
      } catch (err) {
        setState({ item: null, isLoading: false });
        message.error('Failed to load shops');
      }
    }
    load();
  }, []);

  return { ...state };
};
