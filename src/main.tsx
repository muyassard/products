import Products from 'pages/products';
import Stores from 'pages/stores';
import React from 'react';

interface MainProps {}

const Main: React.FC<MainProps> = props => {
  return (
    <div className="flex mx-auto container w-[500px] flex-col items-center gap-4">
      <Stores />
      <hr className="w-full" />
      <Products />
    </div>
  );
};

export default Main;
