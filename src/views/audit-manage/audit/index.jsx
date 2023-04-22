import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Table, Button } from 'antd'
import { getNews2BeAudited, getNewsCategories, newsAudit } from '@/services'
import TitleInTable from '@/components/news-manage/title-in-table'


const NewsAudit = memo(() => {
  const {adminInfo} = useSelector(state => state.adminPersonalCenter)
  const [newsList, setNewsList] = useState([])
  const [newsCategories, setNewsCategories] = useState([])

   // 获取新闻分类
   useEffect(() => {
    getNewsCategories().then(res => {
      setNewsCategories(res.data)
    })
  }, [])


  // 获取自己能审核的news
  useEffect(() => {
    const condition = {
      region: adminInfo.region,
      username: adminInfo.username
    }
    getNews2BeAudited(condition).then(res => {
      setNewsList(res.data)
    })
  },[adminInfo])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '标题',
      render: (news)=><TitleInTable news={news} isAudit={true}/>
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '分类',
      dataIndex: 'categoryId',
      render:(categoryId) => <p>{newsCategories.find(item => item.id === categoryId)?.title}</p>
    },
    {
      title: '地区',
      dataIndex: 'region',
    },
    {
      title: '操作',
      render:(news) => <div>
        <Button onClick={()=>{handleClickAudit(news, false)}}>驳回</Button>&nbsp;
        <Button onClick={()=>{handleClickAudit(news, true)}} type="primary">通过</Button>
      </div>
    },
  ];


  // 审核
  const handleClickAudit = (news, isPass) => {
    const condition = {
      newsId: news.id,
      isPass,
    }
    newsAudit(condition).then(res => {
      setNewsList(newsList.filter(item=>item.id!==news.id))
    })
  }

  return (
    <Table dataSource={newsList} columns={columns} rowKey={(item) => item.id}/>
  )
})

export default NewsAudit