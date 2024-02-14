import { Button, Form, Input, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { Api, Mappers, Types } from 'modules/shops';
import React from 'react';

interface UpdateProps {
  onSuccess?: () => void;
  shopId: string;
}
const Update: React.FC<UpdateProps> = ({ onSuccess, shopId }) => {
  const [loading, setLoading] = React.useState(false);
  const [form] = useForm<Types.IForm.Update>();

  const onFinish = async (values: Types.IForm.Update) => {
    try {
      setLoading(true);
      const { data } = await Api.Update({ ...values, id: shopId });
      const shop = Mappers.Shop(data);
      message.success(`Shop ${shop.title} Updated successfully`);
      setLoading(false);
      onSuccess!();
    } catch (err) {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    Api.Single({ id: shopId }).then(({ data }) => {
      const shop = Mappers.Shop(data);
      form.setFieldsValue(shop);
    });
  }, [shopId]);

  return (
    <div>
      <h1 className="m-0">Update Shop</h1>
      <Form form={form} onFinish={onFinish} className="flex flex-col gap-2">
        <Form.Item<Types.IForm.Update>
          className="m-0"
          name="title"
          rules={[{ required: true, message: 'Please input shop title!' }]}
        >
          <Input size="large" placeholder="Title" />
        </Form.Item>
        <Form.Item<Types.IForm.Update>
          className="m-0"
          name="location"
          rules={[{ required: true, message: 'Please input shop location!' }]}
        >
          <Input size="large" placeholder="Location" />
        </Form.Item>
        <Form.Item<Types.IForm.Update>
          className="m-0"
          name="phone"
          rules={[{ required: true, message: 'Please input shop phone!' }]}
        >
          <Input size="large" placeholder="Phone" />
        </Form.Item>
        <Form.Item<Types.IForm.Update>
          className="m-0"
          name="number"
          rules={[{ required: true, message: 'Please input shop number!' }]}
        >
          <Input size="large" placeholder="Number" />
        </Form.Item>

        <Button loading={loading} size="large" type="primary" htmlType="submit">
          Update Shop
        </Button>
      </Form>
    </div>
  );
};

export default Update;
