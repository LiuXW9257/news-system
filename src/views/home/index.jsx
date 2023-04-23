import React, { memo, useEffect, useState } from 'react'
import {Avatar, Card, Col, Row } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import MyCard from '@/components/home/my-card';
import { getMostSatrNews, getMostViewNews } from '@/services/modules/home';
const { Meta } = Card;

const Home = memo(() => {

  const [mostViewNewsList, setMostViewNewsList] = useState([])
  const [mostStarNewsList, setMostStarNewsList] = useState([])

  useEffect(() => {
    getMostViewNews().then(res => {
      setMostViewNewsList(res.data)
    })
  }, [])

  useEffect(() => {
    getMostSatrNews().then(res => {
      console.log(res);
      setMostStarNewsList(res.data)
    })
  }, [])


  return (
    <div className="site-card-wrapper">
    <Row gutter={16}>
      <Col span={8}>
        <MyCard title="用户最常浏览" dataSource={mostViewNewsList} />
      </Col>
      <Col span={8}>
        <MyCard title="用户点赞最多" dataSource={mostStarNewsList}/>
      </Col>
      <Col span={8}>
      <Card
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title="Card title"
          description="This is the description"
        />
      </Card>
      </Col>
    </Row>
  </div>
  )
})

export default Home