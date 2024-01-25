import { Component } from 'react';
import { Button, Form, Input } from 'antd';

import { Types } from 'modules/products';

export default class Products extends Component {
  onFinish = (values: Types.IForm.Product.Add) => {
    console.log('values = ', values);
  };

  render() {
    return (
      <div className="flex w-[500px] flex-col items-center">
        <h2>Add Product</h2>
        <Form
          autoComplete="off"
          onFinishFailed={error => {
            console.log(error);
          }}
          className="w-full"
          onFinish={this.onFinish}
        >
          <Form.Item hasFeedback name="name" rules={[{ required: true, message: 'Please input product name!' }]}>
            <Input placeholder="Product Name" />
          </Form.Item>

          <Form.Item
            hasFeedback
            name="description"
            rules={[{ required: true, type: 'string', message: 'Please input product description!' }]}
          >
            <Input placeholder="Description" />
          </Form.Item>

          <Form.Item hasFeedback name="price" rules={[{ required: true, message: 'Please input product price!' }]}>
            <Input placeholder="Price" type="number" min={0} />
          </Form.Item>

          <Form.Item hasFeedback name="amount" rules={[{ required: true, message: 'Please input product amount!' }]}>
            <Input placeholder="amount" type="number" min={1} />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
