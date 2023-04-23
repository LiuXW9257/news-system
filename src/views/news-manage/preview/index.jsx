import React, { memo, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Descriptions, PageHeader, Button } from 'antd';
import { getNewsDetail } from '@/services'

import { timeFormat_1 } from '@/utils/common/time-format';
import { getAuditStateTag, getPublishStateTag } from '@/utils/news-manage';

const NewsPreview = memo(() => {
  const location = useLocation()
  const [newsDetal, setNewsDetail] = useState(null)
  const [showAuditBtn, setShowAuditBtn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const {newsId, isAudit} = location.state
    getNewsDetail(newsId).then(res => {
      setNewsDetail(res.data)
    })
    if (isAudit) {
      setShowAuditBtn(true)
    }
  },[location])

  return (
    <div>
      {newsDetal &&
      <div>
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            ghost={false}
            onBack={() => navigate(-1)}
            title={newsDetal.title}
            subTitle={newsDetal.category.title}
            extra={ showAuditBtn && [
              <Button key="2">驳回</Button>,
              <Button key="1" type="primary">
                通过
              </Button>,
            ]}
          >
            <Descriptions size="small" column={3}>
              <Descriptions.Item label="创建人">{newsDetal.author}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{timeFormat_1(newsDetal.createTime)}</Descriptions.Item>
              <Descriptions.Item label="发布时间">{newsDetal.publishTime?timeFormat_1(newsDetal.publishTime):'-'}</Descriptions.Item>
              <Descriptions.Item label="区域">{newsDetal.author}</Descriptions.Item>
              <Descriptions.Item label="审核状态">{getAuditStateTag(newsDetal.auditState)}</Descriptions.Item>
              <Descriptions.Item label="发布状态">{getPublishStateTag(newsDetal.publishState)}</Descriptions.Item>
              <Descriptions.Item label="访问数量">{newsDetal.view}</Descriptions.Item>
              <Descriptions.Item label="点赞数量">{newsDetal.star}</Descriptions.Item>
              {/* <Descriptions.Item label="评论数量">{newsDetal.author}</Descriptions.Item> */}
            </Descriptions>
          </PageHeader>
        </div>
        <div
          style={{margin:'16px 24px', borderTop:'1px solid gray', paddingTop: '16px'}} 
          dangerouslySetInnerHTML={{__html:newsDetal.content}}>
        </div>
      </div>
      }
    </div>
  )
})

export default NewsPreview