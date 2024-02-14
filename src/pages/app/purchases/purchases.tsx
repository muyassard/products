import React from 'react';
import dayjs from 'dayjs';
import { Button, Dropdown, Modal, Table, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { BooleanParam, NumberParam, useQueryParams } from 'use-query-params';

import { useList } from 'modules/purchases/hooks';
import { IEntity } from 'modules/purchases/types';
import { IEntity as ShopIEntity } from 'modules/shops/types';

import Add from './add';

const Main: React.FC = () => {
  const [{ page, limit, isOpen }, setParams] = useQueryParams({
    limit: NumberParam,
    page: NumberParam,
    isOpen: BooleanParam
  });
  const { isLoading, items, refetch, meta } = useList({ page: page!, limit: limit! });

  const onSuccess = () => {
    setParams({ isOpen: undefined });
    refetch();
  };

  return (
    <>
      <Table
        loading={isLoading}
        dataSource={items}
        rowKey="_id"
        pagination={{
          pageSize: meta.limit,
          total: meta.total,
          current: meta.page,
          onChange: (page, limit) => setParams({ page, limit })
        }}
        columns={[
          {
            title: 'Shop',
            dataIndex: 'shop',
            render: (shop: ShopIEntity.Shop) => (
              <div className="flex items-center gap-2">
                <p>{shop.title}</p>
                <Tag color="purple">
                  <a href="tel:+998-99-896-13-48">+998-99-896-13-48</a>
                </Tag>
              </div>
            )
          },
          {
            title: 'Total',
            dataIndex: 'total',
            render: (total: number) => `${total.toLocaleString('uz-Uz')} UZS`
          },
          {
            title: 'Debt 🥺',
            dataIndex: 'debt',
            render: (debt: number) => <b>{`${debt.toLocaleString('uz-Uz')} UZS`}</b>
          },
          {
            title: 'Payouts',
            dataIndex: 'payouts',
            render: (payouts: IEntity.Payout[]) => (
              <div className="flex items-center gap-2">
                <Dropdown
                  trigger={['click']}
                  disabled={!payouts.length}
                  menu={{
                    items: payouts.map(({ _id, amount, createdAt }) => ({
                      key: _id,
                      label: (
                        <div className="flex justify-between">
                          <Tag color="green">{amount.toLocaleString('uz-Uz')} UZS</Tag>
                          <span>{dayjs(createdAt).format('MMMM D, YYYY')}</span>
                        </div>
                      )
                    }))
                  }}
                >
                  <Tag className="cursor-pointer">{payouts.length}</Tag>
                </Dropdown>
                <Button type="dashed">+Payout</Button>
              </div>
            )
          },
          {
            title: 'Products',
            dataIndex: 'products',
            render: (payouts: IEntity.Product[]) => (
              <Dropdown
                trigger={['click']}
                disabled={!payouts.length}
                menu={{
                  items: payouts.map(({ _id, amount, name, price }) => ({
                    key: _id,
                    label: (
                      <div className="flex justify-between gap-2">
                        {name}
                        <div className="flex gap-0.5">
                          <Tag color="magenta" className="flex items-center justify-center">
                            {amount} x {price.toLocaleString('uz-UZ')} UZS
                          </Tag>
                          <Tag color="blue" className="flex items-center justify-center">
                            {(amount * price).toLocaleString('uz-UZ')} UZS
                          </Tag>
                        </div>
                      </div>
                    )
                  }))
                }}
              >
                <Tag className="cursor-pointer">{payouts.length}</Tag>
              </Dropdown>
            )
          },
          {
            title: 'Created At',
            dataIndex: 'createdAt',
            render: (createdAt: string) => dayjs(createdAt).format('MMMM D, YYYY')
          }
        ]}
      />
      <Button
        danger
        type="primary"
        className="absolute bottom-8 right-8 !h-[50px] !w-[50px] rounded-full"
        icon={<PlusOutlined />}
        onClick={() => setParams({ isOpen: true })}
      />
      <Modal
        open={isOpen!}
        className="p-0"
        footer={null}
        closeIcon={false}
        onCancel={() => setParams({ isOpen: undefined })}
      >
        <Add onSuccess={onSuccess} />
      </Modal>
    </>
  );
};

export default Main;
