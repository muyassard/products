import React from 'react';
import { Button, Modal, Popconfirm, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useList } from 'modules/shops/hooks';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';
import Add from './add';
import Update from './update';
import { Api } from 'modules/shops';

const Main: React.FC = () => {
  const [{ page, limit, shopId }, setParams] = useQueryParams({
    limit: NumberParam,
    page: NumberParam,
    shopId: StringParam
  });
  const params = React.useMemo(() => ({ page: page!, limit: limit! }), [page, limit]);
  const { isLoading, items, refetch, meta } = useList(params);

  const onSuccess = () => {
    setParams({ shopId: undefined });
    refetch();
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
      <Table
        loading={isLoading}
        dataSource={items}
        rowKey="id"
        pagination={{
          pageSize: meta.limit,
          total: meta.total,
          current: meta.page,
          onChange: (page, limit) => setParams({ page, limit })
        }}
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
            render: shopId => (
              <Button.Group>
                <Button onClick={() => setParams({ shopId })}>Edit</Button>
                <Popconfirm
                  title="Delete the shop"
                  description="Are you sure to delete this shop?"
                  okText="Yes"
                  onConfirm={() => onDelete(shopId)}
                  cancelText="No"
                >
                  <Button danger type="primary" onClick={() => console.log(`[DELETE] = ${shopId}`)}>
                    Delete
                  </Button>
                </Popconfirm>
              </Button.Group>
            )
          }
        ]}
      />
      <Button
        danger
        type="primary"
        className="absolute bottom-8 right-8 !h-[50px] !w-[50px] rounded-full"
        icon={<PlusOutlined />}
        onClick={() => setParams({ shopId: 'new' })}
      />
      <Modal
        open={!!shopId}
        className="p-0"
        footer={null}
        closeIcon={false}
        onCancel={() => setParams({ shopId: undefined })}
      >
        {shopId === 'new' ? <Add onSuccess={onSuccess} /> : <Update onSuccess={onSuccess} shopId={shopId!} />}
      </Modal>
    </>
  );
};

export default Main;
