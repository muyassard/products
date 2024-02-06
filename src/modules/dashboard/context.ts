import React from 'react';   
import { IContext } from './types';

export const DashboardContext = React.createContext<IContext>({} as IContext);

DashboardContext.displayName = 'DashboardContext'; 
