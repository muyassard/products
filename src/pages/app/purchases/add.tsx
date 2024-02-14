import React from 'react';
import { Button, Form, Select, Tag, message } from 'antd';
import { useForm } from 'antd/es/form/Form';

import { Api, Types } from 'modules/purchases';
import { useList } from 'modules/shops/hooks';

interface AddProps {
  onSuccess?: () => void;
}
const Add: React.FC<AddProps> = ({ onSuccess }) => {
  const [loading, setLoading] = React.useState(false);
  const [form] = useForm<Types.IForm.Add>();
  const { items, isLoading } = useList({ page: 1, limit: 10000 });

  const onFinish = async (values: Types.IForm.Add) => {
    try {
      setLoading(true);

      values.products = [
        { name: 'Sumka', amount: 10, price: 100 },
        { name: 'Kurtka', amount: 5, price: 200 }
      ];

      await Api.Add(values);
      message.success(`Purchase added successfully`);

      form.resetFields();
      setLoading(false);
      onSuccess!();
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="m-0 mb-2 text-center">Add Purchase</h1>
      <Form form={form} onFinish={onFinish} className="flex flex-col gap-2">
        <Form.Item<Types.IForm.Add>
          className="m-0"
          name="shop"
          rules={[{ required: true, message: 'Please input shop title!' }]}
        >
          <Select
            size="large"
            placeholder="Please select shop"
            loading={isLoading}
            options={items.map(({ title, id, phone }) => ({
              label: (
                <div className="flex items-center gap-2">
                  <b>{title}</b>
                  <Tag color="purple">{phone}</Tag>
                </div>
              ),
              value: id
            }))}
          />
        </Form.Item>

        <Button loading={loading} size="large" type="primary" htmlType="submit">
          Add Shop
        </Button>
      </Form>
    </div>
  );
};

export default Add;
