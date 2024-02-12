import React from 'react';
import { Button, Form, Input, Modal, Popconfirm, Table } from 'antd';
import { useList } from 'modules/shops/hooks';
import { StringParam, useQueryParam } from 'use-query-params';
import { Create, Delete } from 'modules/shops/shop';
import { IApi } from 'modules/shops/types';
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

      <Modal open={!!shopId} className="p-0" footer={null} onCancel={() => setShopId(undefined)}>
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
