import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'

const TitleInTable = memo((props) => {
  const { news, isAudit } = props
  const navigate = useNavigate()

  // 预览 news
  const handleClickPreview = () => {
    navigate(`/news-manage/preview`, {
      state:{
        newsId: news.id,
        isAudit
      }
    })
  }

  return (
    <div 
    onClick={handleClickPreview} 
    style={{'textDecoration': 'underline', 'color': '#58a9ff', 'cursor':'pointer'}} 
    >{news.title}</div>
  )
})

export default TitleInTable