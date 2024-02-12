// import React, { useState } from 'react';
// import { Button, Form, Input, Modal, Popconfirm, Table } from 'antd';
// import { useList } from 'modules/shops/hooks';
// import { Create, Delete, Update } from 'modules/shops/shop';
// import { values } from 'lodash';
// import { IEntity, IForm } from 'modules/shops/types';
// import { config } from 'config';
// import { session } from 'services';
// // const token = session.get()

// const Shops: React.FC = () => {
//   const { isLoading, shops, refetch } = useList();

//   const [state, setState] = useState<{ isModalOpen: boolean; shopdata: IEntity.Shop | null }>({
//     isModalOpen: false,
//     shopdata: null
//   });

//   const addShop = (value: any) => {
//     setState(prev => ({ ...prev, isModalOpen: false }));
//     console.log(value);
//     Create(value);
//     refetch();
//   };

//   const remove = (id: any) => {
//     console.log(`[DELETE] = ${id}`);
//     Delete(id);
//     refetch();
//   };

//   const edit = (id: string) => {
//     console.log(shops);
//     // setState(prev => ({ ...prev, isModalOpen: true }));
//     // console.log(`[EDIT] = ${id}`);
//     // const shopdata = shops.filter(shop => shop.id === id);
//     // console.log(shopdata[0]);
//     // setState(prev => ({ ...prev, shopdata: shopdata[0] }));
//     // console.log(state.shopdata);
//     // // const update = Update({id,...shopdata});
//     // refetch();
//   };

//   const modalStyles = {
//     header: {
//       borderLeft: `5px solid`,
//       borderRadius: 0,
//       paddingInlineStart: 5
//     },
//     mask: {
//       backdropFilter: 'blur(10px)'
//     },
//     oncancel: {
//       display: 'none'
//     }
//   };

//   return (
//     <>
//       <div className="flex justify-between">
//         <h2 className="text-white">Shops</h2>
//         <Button onClick={() => setState(prev => ({ ...prev, isModalOpen: true }))}>Add</Button>
//       </div>
//       <>
//         <Modal
//           title="Basic Modal"
//           footer={false}
//           open={state.isModalOpen}
//           onOk={() => setState(prev => ({ ...prev, isModalOpen: false }))}
//           onCancel={() => setState(prev => ({ ...prev, isModalOpen: false }))}
//           styles={modalStyles}
//         >
//           <Form
//             onFinish={value => {
//               addShop(value);
//             }}
//           >
//             <Form.Item label="title" name="title">
//               <Input placeholder="title" />
//             </Form.Item>
//             <Form.Item label="location" name="location">
//               <Input placeholder="location" />
//             </Form.Item>
//             <Form.Item label="phone" name="phone">
//               <Input placeholder="phone" />
//             </Form.Item>
//             <Form.Item label="number" name="number">
//               <Input placeholder="number" />
//             </Form.Item>
//             <Form.Item>
//               <Button htmlType="submit" className="bg-green-300" type="primary">
//                 Save
//               </Button>
//             </Form.Item>
//           </Form>
//         </Modal>
//       </>

//       <Table
//         loading={isLoading}
//         dataSource={shops}
//         rowKey="id"
//         columns={[
//           {
//             title: 'Title',
//             dataIndex: 'title'
//           },
//           {
//             title: 'Location',
//             dataIndex: 'location'
//           },
//           {
//             title: 'Phone',
//             dataIndex: 'phone'
//           },
//           {
//             title: 'Shop number',
//             dataIndex: 'number'
//           },
//           {
//             title: 'Created At',
//             dataIndex: 'createdAt'
//           },
//           {
//             title: 'sellers',
//             dataIndex: 'sellers',
//             render: (sellers, index) => (
//               <Button.Group>
//                 <Button onClick={() => console.log(`sellers = ${sellers}`)}>sellers</Button>
//               </Button.Group>
//             )
//           },
//           {
//             title: 'Actions',
//             dataIndex: 'id',
//             render: (id, record, index) => (
//               <Button.Group>
//                 <Button onClick={() => edit(id)}>Edit</Button>
//                 <Popconfirm
//                   title="Delete the shop"
//                   description="Are you sure to delete this shop?"
//                   okText="Yes"
//                   cancelText="No"
//                 >
//                   <Button danger type="primary" onClick={() => remove(id)}>
//                     Delete
//                   </Button>
//                 </Popconfirm>
//               </Button.Group>
//             )
//           }
//         ]}
//       />
//     </>
//   );
// };

// export default Shops;

import React from 'react';
import { Button, Form, Input, Modal, Popconfirm, Table } from 'antd';
import { useList } from 'modules/shops/hooks';
import { StringParam, useQueryParam } from 'use-query-params';
import { Create, Delete, Update } from 'modules/shops/shop';
import { IApi, IForm } from 'modules/shops/types';
import { session } from 'services';

const Shops: React.FC = () => {
  const { isLoading, shops, refetch } = useList();
  const [shopId, setShopId] = useQueryParam('shopId', StringParam);

  const addShop = (value: IApi.Add.Request) => {
    console.log(value);
    Create(value);
    refetch();
  };
  const remove = (id: any) => {
    console.log(`[DELETE] = ${id}`);
    Delete(id, session.get());
    refetch();
  };

  const edit = (id: string) => {
    console.log(shops);
    console.log(`[EDIT] = ${id}`);
    const shopdata = shops.filter(shop => shop.id === id);
    console.log(shopdata[0]);
    // const update = Update({id,...shopdata});
    refetch();
  };

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-white">Shops</h2>
        <Button onClick={() => setShopId('new')}>Add</Button>
      </div>
      <Table
        loading={isLoading}
        dataSource={shops}
        rowKey="id"
        columns={[
          {
            title: 'Title',
            dataIndex: 'title'
          },
          {
            title: 'Location',
            dataIndex: 'location'
          },
          {
            title: 'Phone',
            dataIndex: 'phone'
          },
          {
            title: 'Shop number',
            dataIndex: 'number'
          },
          {
            title: 'Created At',
            dataIndex: 'createdAt'
          },
          {
            title: 'sellers',
            dataIndex: 'sellers',
            render: (sellers, index) => (
              <Button.Group>
                <Button onClick={() => console.log(`sellers = ${sellers}`)}>sellers</Button>
              </Button.Group>
            )
          },
          {
            title: 'Actions',
            dataIndex: 'id',
            render: id => (
              <Button.Group>
                <Button onClick={() => setShopId(id)}>Edit</Button>
                <Popconfirm
                  title="Delete the shop"
                  description="Are you sure to delete this shop?"
                  onConfirm={() => remove(id)}
                  onCancel={() => console.log('no')}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger type="primary" onClick={() => console.log(`[DELETE] = ${id}`)}>
                    Delete
                  </Button>
                </Popconfirm>
              </Button.Group>
            )
          }
        ]}
      />

      <Modal closeIcon={null} open={!!shopId} className="p-0" footer={null} onCancel={() => setShopId(undefined)}>
        {shopId === 'new' ? (
          <>
            <Form
              onFinish={value => {
                addShop(value);
              }}
            >
              <Form.Item label="title" name="title">
                <Input placeholder="title" />
              </Form.Item>
              <Form.Item label="location" name="location">
                <Input placeholder="location" />
              </Form.Item>
              <Form.Item label="phone" name="phone">
                <Input placeholder="phone" />
              </Form.Item>
              <Form.Item label="number" name="number">
                <Input placeholder="number" />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" className="bg-green-300" type="primary">
                  Save
                </Button>
              </Form.Item>
            </Form>
          </>
        ) : (
          <>
            <Form
              onFinish={value => {
                addShop(value);
              }}
            >
              <Form.Item label="title" name="title">
                <Input placeholder="title" />
              </Form.Item>
              <Form.Item label="location" name="location">
                <Input placeholder="location" />
              </Form.Item>
              <Form.Item label="phone" name="phone">
                <Input placeholder="phone" />
              </Form.Item>
              <Form.Item label="number" name="number">
                <Input placeholder="number" />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" className="bg-green-300" type="primary">
                  Save
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Modal>
    </>
  );
};

export default Shops;
