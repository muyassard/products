import { Api, Mappers, Types } from 'modules/shops';
import React, { useEffect, useState } from 'react';

interface AddProps {
  shopId: string;
}
const Single: React.FC<AddProps> = ({ shopId }) => {
  const [shop, setShop] = useState<Types.IEntity.Shop>();

  useEffect(() => {
    Api.Single({ id: shopId }).then(({ data }) => {
      const shop = Mappers.Shop(data);
      setShop(shop);
    });
  }, [shopId]);
  return (
    <div>
      <h1 className="m-0">shop info</h1>
      <div className="">Title:{shop?.title}</div>
      <div className="">location:{shop?.location}</div>
      <div className="">phone:{shop?.phone}</div>
      <div className="">number:{shop?.number}</div>
      <div className="">createdAt:{shop?.createdAt}</div>
    </div>
  );
};

export default Single;
