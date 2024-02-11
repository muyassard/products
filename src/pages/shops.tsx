import React, { useState } from 'react';
import { Button, Form, Input, Modal, Popconfirm, Table } from 'antd';
import { useList } from 'modules/shops/hooks';
import { Update } from 'modules/shops/shop';
import { values } from 'lodash';
import { IEntity } from 'modules/shops/types';

const Shops: React.FC = () => {
  const { isLoading, shops, refetch } = useList();

  const [state, setState] = useState<{ isModalOpen: boolean; shopdata: IEntity.Shop | null }>({
    isModalOpen: false,
    shopdata: null
  });

  const addShop = () => {
    setState(prev => ({ ...prev, isModalOpen: true }));
  };

  const edit = (id: any) => {
    // setState(prev => ({ ...prev, isModalOpen: true }));
    // console.log(`[EDIT] = ${id}`);
    // const shopdata = shops.filter(shop => shop.id === id);
    // console.log(shops);
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
        <h2>Shops</h2>
        <Button onClick={() => addShop()}>Add</Button>
      </div>
      <>
        <Modal
          title="Basic Modal"
          open={state.isModalOpen}
          onOk={() => setState(prev => ({ ...prev, isModalOpen: false }))}
          onCancel={() => setState(prev => ({ ...prev, isModalOpen: false }))}
          styles={modalStyles}
        >
          <Form
            onFinish={() => {
              console.log(values);
            }}
          >
            <Form.Item label="Title" name="title">
              <Input defaultValue="title" />
            </Form.Item>
            <Form.Item label="Location" name="location">
              <Input defaultValue="location" />
            </Form.Item>
            <Form.Item label="phone" name="phone">
              <Input defaultValue="phone" />
            </Form.Item>
            <Form.Item label="number" name="number">
              <Input defaultValue="number" />
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
    </>
  );
};

export default Shops;
