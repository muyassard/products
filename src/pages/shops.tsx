import React from 'react';
import { Button, Popconfirm, Table } from 'antd';
import { useList } from 'modules/shops/hooks';

const Shops: React.FC = () => {
  const { isLoading, shops, refetch } = useList();

  return (
    <>
      <div className="flex justify-between">
        <h2>Shops</h2>
        <Button>Add</Button>
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
            title: 'Actions',
            dataIndex: 'id',
            render: id => (
              <Button.Group>
                <Button onClick={() => console.log(`[EDIT] = ${id}`)}>Edit</Button>
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
