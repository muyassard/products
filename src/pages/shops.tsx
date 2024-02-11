import React, { useState } from 'react';
import { Button, Form, Input, Modal, Popconfirm, Table } from 'antd';
import { useList } from 'modules/shops/hooks';
import { Create, Delete, Update } from 'modules/shops/shop';
import { values } from 'lodash';
import { IEntity, IForm } from 'modules/shops/types';
import { config } from 'config';

const Shops: React.FC = () => {
  const { isLoading, shops, refetch } = useList();

  const [state, setState] = useState<{ isModalOpen: boolean; shopdata: IEntity.Shop | null }>({
    isModalOpen: false,
    shopdata: null
  });

  const addShop = (values: any) => {
    setState(prev => ({ ...prev, isModalOpen: false }));
    console.log(values);
    Create(values);
    refetch();
  };
  
  const remove = (id: any) => {
    console.log(`[DELETE] = ${id}`);
    Delete(id);
    refetch();
  };

  const edit = (id: string) => {
    // setState(prev => ({ ...prev, isModalOpen: true }));
    // console.log(`[EDIT] = ${id}`);
    // const shopdata = shops.filter(shop => shop.id === id);
    console.log(shops);
    // console.log(shopdata[0]);
    // setState(prev => ({ ...prev, shopdata: shopdata[0] }));
    // console.log(state.shopdata);
    // // const update = Update({id,...shopdata});
    // refetch();
  };

  const modalStyles = {
    header: {
      borderLeft: `5px solid`,
      borderRadius: 0,
      paddingInlineStart: 5
    },
    mask: {
      backdropFilter: 'blur(10px)'
    },
    oncancel: {
      display: 'none'
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-white">Shops</h2>
        <Button onClick={() => setState(prev => ({ ...prev, isModalOpen: true }))}>Add</Button>
      </div>
      <>
        <Modal
          title="Basic Modal"
          open={state.isModalOpen}
          footer={null}
          onCancel={() => setState(prev => ({ ...prev, isModalOpen: false }))}
          styles={modalStyles}
        >
          <Form onFinish={values => addShop(values)}>
            <Form.Item label="Title" name="title">
              <Input placeholder="title" />
            </Form.Item>
            <Form.Item label="Location" name="location">
              <Input placeholder="location" />
            </Form.Item>
            <Form.Item label="phone" name="phone">
              <Input placeholder="phone" />
            </Form.Item>
            <Form.Item label="number" name="number">
              <Input placeholder="numer" />
            </Form.Item>
            <Form.Item>
              <Button onClick={() => addShop(values)} htmlType="submit" className="bg-green-300" type="primary">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>

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
            render: (sellers: any[], index) => (
              <Button.Group>
                <Button onClick={() => console.log(`${sellers}`)}>sellers</Button>
              </Button.Group>
            )
          },
          {
            title: 'Actions',
            dataIndex: 'id',
            render: (id, record, index) => (
              <Button.Group>
                <Button onClick={() => edit(id)}>Edit</Button>
                <Popconfirm
                  title="Delete the shop"
                  description="Are you sure to delete this shop?"
                  okText="Yes"
                  cancelText="No"
                ></Popconfirm>
                <Button danger type="primary" onClick={() => remove(id)}>
                  Delete
                </Button>
              </Button.Group>
            )
          }
        ]}
      />
    </>
  );
};

export default Shops;
