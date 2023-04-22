import { newsPublish } from '@/services'
import React, { memo } from 'react'

const PublishNewsBtn = memo((props) => {
  const { news } = props

  const handlePublishNews = () => {
    newsPublish(news.id).then(res => {
      
    })
  }
  return (
    <div onClick={handlePublishNews} style={{display:'inline-block'}}>
      {props.render()}
    </div>
  )
})

export default PublishNewsBtn