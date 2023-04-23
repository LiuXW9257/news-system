import React, { memo, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {Avatar, Card, Col, Row } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import * as echarts from 'echarts'
import _ from 'lodash'
import MyCard from '@/components/home/my-card'
import { getMostSatrNews, getMostViewNews } from '@/services/modules/home'
import { getNewsWithCategory } from '@/services'
const { Meta } = Card;

const Home = memo(() => {
  const [mostViewNewsList, setMostViewNewsList] = useState([])
  const { adminInfo } = useSelector(state => state.adminPersonalCenter)
  const [mostStarNewsList, setMostStarNewsList] = useState([])
  const barNode = useRef()

  useEffect(() => {
    getMostViewNews().then(res => {
      setMostViewNewsList(res.data)
    })
  }, [])

  useEffect(() => {
    getMostSatrNews().then(res => {
      setMostStarNewsList(res.data)
    })
  }, [])

  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(barNode.current);
    // TODO 获取数据
    getNewsWithCategory().then(res => {
      const data = _.groupBy(res.data, item=>item.category.title)
      // 指定图表的配置项和数据
      const option = {
        title: {
          text: '新闻分类统计'
        },
        tooltip: {},
        legend: {
          data: ['数量']
        },
        xAxis: {
          data: Object.keys(data)
        },
        yAxis: {},
        series: [
          {
            name: '数量',
            type: 'bar',
            data: Object.values(data).map(item=>item.length)
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    })
  }, [barNode])

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
            title={adminInfo.username}
            description={
              <div>
                <b>{adminInfo.region?adminInfo.region:"全球"}</b>&nbsp;&nbsp;
                <span>{adminInfo.role.roleName}</span>
              </div>
            }
          />
        </Card>
        </Col>
      </Row>

      {/* 可视化图 */}
      <div ref={barNode} style={{width: "100%", height: "400px"}}></div>
    </div>
  )
})

export default Home