import { Button, Tag } from 'antd';
import { DashboardContext } from 'modules/dashboard/context';
import React, { Component } from 'react';

export default class Counter2 extends Component {
  render = () => (
    <DashboardContext.Consumer>
      {({ count, increment }) => (
        <div className="flex gap-2">
          <Tag className="grid place-items-center">{count}</Tag>
          <Button onClick={increment}>Increment</Button>
        </div>
      )}
    </DashboardContext.Consumer>
  );
}
