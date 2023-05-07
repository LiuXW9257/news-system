import React, { memo, useEffect, useState } from 'react'
import { PageHeader,Card, Col, Row, List, Button } from 'antd'
import { getNewsWithCategory, newsViewAdd } from '@/services'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'
const NewsList = memo(() => {
  const [newsList, setNewsList] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getNewsWithCategory().then(res => {
      const data = _.groupBy(res.data, item=>item.category.title)
      setNewsList(data)
    })
  },[])


  const handle2NewsDetail = (news) => {
    newsViewAdd(news.id, news.view+1)
    navigate('/news/detail',{
      state:{
        newsId: news.id
      }
    })
  }

  return (
    <div>
      {/* 页头 */}
      <PageHeader
        className="site-page-header"
        title="News-System"
        subTitle="Read news"
      />
      <div style={{margin:'10px 25px'}}>
        <Row gutter={[16,16]}>
        {newsList && Object.keys(newsList).map(category => {
          return (
            <Col span={8} key={category}>
              <Card title={category} bordered={true} hoverable={true}>
              <List
                size="small"
                dataSource={newsList[category]}
                pagination={{
                  pageSize: 3
                }}
                renderItem={news => 
                  <List.Item>
                     <Button onClick={()=>{handle2NewsDetail(news)}} type="link">
                     {news.title}
                    </Button>
                  </List.Item>}
              />
              </Card>
            </Col>
            )
        })}
      </Row>
      
      </div>
    </div>
  )
})

export default NewsList