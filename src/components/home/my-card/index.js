import React, { memo } from 'react'
import { Link } from 'react-router-dom';
import { Card, List } from 'antd';

const MyCard = memo((props) => {
  const { title, dataSource} = props

  return (
    <Card title={title} bordered={true}>
      <List
        size="small"
        dataSource={dataSource}
        renderItem={item => 
        <List.Item>
          <Link to={{pathname:'/news-manage/preview'}} state={{newsId: item.id}}>{item.title}</Link>
        </List.Item>}
      />
    </Card>
  )
})

export default MyCard