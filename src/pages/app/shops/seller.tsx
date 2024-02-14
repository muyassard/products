import { Button, Form, Input, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { Api, Mappers, Types } from 'modules/shops';
import React, { useEffect, useState } from 'react';

interface AddProps {
  id: string;
}
const Seller: React.FC<AddProps> = ({ id }) => {
  const [shop, setShop] = useState<Types.IEntity.Shop>();
  const [seller, setSeller] = useState();

  useEffect(() => {
    Api.Single({ id: id }).then(({ data }) => {
      const shop = Mappers.Shop(data);
      setShop(shop);
    });
  }, [id]);
  return (
    <div>
      <div className="">seller</div>
      {shop?.sellers.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <div className="">{idx + 1}</div>
          <div className="">{item.firstName}</div>
          <div className="">{item.lastName}</div>
          <div className="">{item.phone}</div>
          <Button color="green">add</Button>
        </div>
      ))}
    </div>
  );
};

export default Seller;
