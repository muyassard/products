import { Component } from 'react';
import { Button, Form, Input } from 'antd';

import { Types } from 'modules/products';

export default class Products extends Component {
  onFinish = (values: Types.IForm.Add) => {
    console.log('values = ', values);
  };

  render() {
    return (
      <div>
        <h2>Add Product</h2>
        <Form onFinish={this.onFinish}>
          <Form.Item<Types.IForm.Add> name="name" rules={[{ required: true, message: 'Please input product name!' }]}>
            <Input placeholder="Product Name" />
          </Form.Item>

          <Form.Item<Types.IForm.Add> name="price" rules={[{ required: true, message: 'Please input product price!' }]}>
            <Input placeholder="Price" type="number" />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form>
      </div>
    );
  }
}
