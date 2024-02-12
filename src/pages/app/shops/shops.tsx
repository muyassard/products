import React from 'react';
import { Button, Modal, Popconfirm, Table, Tag } from 'antd';
import { useList } from 'modules/shops/hooks';
import { StringParam, useQueryParam } from 'use-query-params';
import Add from './add';
import Update from './update';
import { Api } from 'modules/shops';
import Single from './single';

const Main: React.FC = () => {
  const { isLoading, shops, isFetching, refetch } = useList();
  const [shopId, setShopId] = useQueryParam('shopId', StringParam);

  const onSuccess = () => {
    setShopId(undefined);
    refetch();
  };
  const onInfo = (id: string) => {
    setShopId('info');
    return id;
  };

  const onDelete = async (id: string) => {
    try {
      await Api.Delete({ id });
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-white">Shops</h2>
        <Button onClick={() => setShopId('new')}>Add</Button>
      </div>
      <Table
        loading={isLoading || isFetching}
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
            title: 'Sellers',
            dataIndex: 'sellers',
            render: (seller, record, index) => (
              <Tag
                onClick={() => {
                  console.log(shops[index]);
                }}
                color="grey"
                className=" cursor-pointer"
              >
                seller
              </Tag>
            )
          },
          {
            title: 'Created At',
            dataIndex: 'createdAt'
          },
          {
            title: 'Actions',
            dataIndex: 'id',
            render: id => (
              <Button.Group>
                <Button type="primary" onClick={() => setShopId(id)}>
                  Edit
                </Button>
                <Button type="primary" onClick={() => onInfo(id)}>
                  info
                </Button>
                <Popconfirm
                  title="Delete the shop"
                  description="Are you sure to delete this shop?"
                  okText="Yes"
                  onConfirm={() => onDelete(id)}
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
      <Modal open={!!shopId} className="p-0" footer={null} closeIcon={false} onCancel={() => setShopId(undefined)}>
        {shopId === 'new' ? (
          <Add onSuccess={onSuccess} />
        )  : (
          <Update onSuccess={onSuccess} shopId={shopId!} />
        )}
      </Modal>
      <Modal open={false} className="p-0" footer={null} closeIcon={false} >
        {(
          <Single shopId={shopId!}/>
        )}
      </Modal>

    </>
  );
};

export default Main;
