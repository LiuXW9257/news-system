import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Table, Button } from 'antd'
import { getNewsCategories, getNewsPrePublish, newsPublish } from '@/services'
import TitleInTable from '@/components/news-manage/title-in-table'


const Unpublished = memo(() => {
  const {adminInfo} = useSelector(state => state.adminPersonalCenter)
  const [newsList, setNewsList] = useState([])
  const [newsCategories, setNewsCategories] = useState([])

   // 获取新闻分类
   useEffect(() => {
    getNewsCategories().then(res => {
      setNewsCategories(res.data)
    })
  }, [])


  // 获取待发布的news
  useEffect(() => {
    const { username } = adminInfo
    getNewsPrePublish(username).then(res=>{
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
      // dataIndex: 'title',
      render: (news)=><TitleInTable news={news} />
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '分类',
      dataIndex: 'categoryId',
      render:(categoryId) => <p>{newsCategories.find(item => item.id === categoryId).title}</p>
    },
    {
      title: '地区',
      dataIndex: 'region',
    },
    {
      title: '操作',
      render:(news) => <div>
        <Button type="danger">撤销</Button>&nbsp;
        <Button onClick={()=>{handleClickPublic(news)}} type="primary">发布</Button>
      </div>
    },
  ];

  const handleClickPublic = (news) => {
    newsPublish(news.id).then(res => {
      setNewsList(newsList.filter(item => item.id !== news.id))
    })
  }
  return (
    <Table dataSource={newsList} columns={columns} rowKey={(item) => item.id}/>
  )
})

export default Unpublished