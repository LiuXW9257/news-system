import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'

const UpdateNewsBtn = memo((props) => {
  const { news } = props
  const navigate = useNavigate()

  const handClick = () => {
    navigate('/news-manage/update',{
      state: {
        newsId: news.id,
        isUpdate: true
      }
    })
  }

  return (
    <div 
      onClick={handClick}
      style={{display:'inline-block'}}>
      {props.render()}
    </div>
  )
})

export default UpdateNewsBtn