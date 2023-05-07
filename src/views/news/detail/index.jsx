import React, { memo, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Descriptions, PageHeader, message } from 'antd'
import { HeartTwoTone } from '@ant-design/icons';
import { getNewsDetail, giveLike2News } from '@/services'

const NewsDetail = memo(() => {
  const [newsDetail, setNewsDetail] = useState(null)
  const [isLiked, setIsLiked] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const { newsId } = location.state
    getNewsDetail(newsId).then(res => {
      setNewsDetail(res.data)
    })
  },[location])

  const addStar2News = (newsId) => {
    if (isLiked) {
      message.error('你已经点过赞咯！');
      return
    }
    giveLike2News(newsId, newsDetail.star+1).then(res => {
      setNewsDetail({...newsDetail, star: newsDetail.star+1})
      message.success('点赞成功！')
      setIsLiked(true)
    })
  }

  return (
    <div>
      {newsDetail && 
      <div>
        <PageHeader
          ghost={false}
          onBack={() => window.history.back()}
          title={newsDetail.title}
          subTitle={<div>{newsDetail.category.title}&nbsp;<HeartTwoTone onClick={()=>{addStar2News(newsDetail.id)}} style={{cursor:'pointer'}} twoToneColor="#eb2f96" /></div>}
        >
          <Descriptions size="small" column={3}>
            <Descriptions.Item label="作者">{newsDetail.author}</Descriptions.Item>
            <Descriptions.Item label="发布时间">{newsDetail.publishTime}</Descriptions.Item>
            <Descriptions.Item label="区域">{newsDetail.region?newsDetail.region:"全球"}</Descriptions.Item>
            <Descriptions.Item label="访问数量"><span style={{color: '#81ba8f', fontWeight: '700'}}>{newsDetail.view}</span></Descriptions.Item>
            <Descriptions.Item label="点赞数量"><span style={{color: '#81ba8f', fontWeight: '700'}}>{newsDetail.star}</span></Descriptions.Item>
          </Descriptions>
        </PageHeader>
        <div style={{margin:'20px 25px'}} dangerouslySetInnerHTML={{__html:newsDetail.content}}></div>
      </div>
      }
    </div>
  )
})

export default NewsDetail