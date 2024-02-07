import { Button, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';

interface MainProps {}

let url = 'http://137.184.188.134:4000/api/shop';

const Dashboard: React.FC<MainProps> = props => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const responseData = await response.json();
        setData(responseData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container  py-2">
      <Table
        dataSource={data}
        rowKey="_id"
        loading={isLoading}
        pagination={false}
        columns={[
          { title: '№', render: (v, r, idx) => idx + 1 },
          { title: 'Title', dataIndex: 'title' },
          {
            title: 'Location',
            dataIndex: 'location',
            filters: [{ text: 'Abu Saxiy', value: true }],
            onFilter: (value: any, record: any) => {
              return record.completed === value;
            }
          },
          {
            title: 'Phone number',
            dataIndex: 'phone',
            render: (_, { tags }) => (
              <>
                {tags.map((tag: any) => {
                  return (
                    <Tag color="blue" key={tag}>
                      {tag.toUpperCase()}
                    </Tag>
                  );
                })}
              </>
            )
          },
          { title: 'Number', dataIndex: 'number' }
        ]}
      />
    </div>
  );
};

export default Dashboard;