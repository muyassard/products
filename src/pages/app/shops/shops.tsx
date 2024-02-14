import React, { useState } from 'react';
import { Button, Modal, Popconfirm, Table, Tag } from 'antd';
import { useList } from 'modules/shops/hooks';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';
import Add from './add';
import Update from './update';
import { Api } from 'modules/shops';
import Single from './single';
import Seller from './seller';

const Main: React.FC = () => {
  const [{ page, limit, shopId }, setParams] = useQueryParams({
    limit: NumberParam,
    page: NumberParam,
    shopId: StringParam
  });
  const params = React.useMemo(() => ({ page: page!, limit: limit! }), [page, limit]);
  const { isLoading, items, refetch, meta } = useList(params);
  const [open, setOpen] = useState(false);
  const [{ singleId, seller, sellershopid }, setState] = useState({
    singleId: '',
    seller: false,
    sellershopid: ''
  });

  const onSuccess = () => {
    setParams({ shopId: undefined });
    refetch();
  };

  const onInfo = (id: string) => {
    setState(prev => ({ ...prev, id }));
    setOpen(true);
  };

  const getSeller = (index: number) => {
    setState(prev => ({ ...prev, seller: true }));
    const seller = items[index].sellers;
    console.log(seller);
    setState(prev => ({ ...prev, sellershopid: items[index].id }));
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
        <Button onClick={() => setParams({ shopId: 'new' })}>Add</Button>
      </div>
      <Table
        loading={isLoading}
        dataSource={items}
        rowKey="id"
        pagination={{
          pageSize: meta.limit,
          total: meta.total,
          current: meta.page,
          onChange: (page, limit) => setParams({ page, limit }),
          showSizeChanger: true
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
            title: 'seller',
            dataIndex: 'seller',
            render: (record, val, index) => (
              <Tag onClick={() => getSeller(index)} color="grey" className="cursor-pointer">
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
            render: shopId => (
              <Button.Group>
                <Button
                  type="primary"
                  onClick={() => {
                    onInfo(shopId);
                  }}
                >
                  info
                </Button>
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
      <Modal
        open={!!shopId}
        className="p-0"
        footer={null}
        closeIcon={false}
        onCancel={() => setParams({ shopId: undefined })}
      >
        {shopId === 'new' ? <Add onSuccess={onSuccess} /> : <Update onSuccess={onSuccess} shopId={shopId!} />}
      </Modal>
      <Modal open={open!} className="p-0" footer={null} closeIcon={true} onCancel={() => setOpen(false)}>
        {<Single shopId={singleId} />}
      </Modal>

      <Modal
        open={seller}
        className="p-0"
        footer={null}
        closeIcon={true}
        onCancel={() => setState(prev => ({ ...prev, seller: false }))}
      >
        <Seller id={sellershopid} />
      </Modal>
    </>
  );
};

export default Main;
