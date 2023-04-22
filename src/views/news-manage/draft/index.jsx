import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Table, Button, Modal } from 'antd'
import { DeleteOutlined, EditOutlined, UploadOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { delNews, getNewsByCondition, getNewsCategories, submit2Audit } from '@/services'
import TitleInTable from '@/components/news-manage/title-in-table'
import UpdateNewsBtn from '@/components/news-manage/update-news-btn'
const { confirm } = Modal;

const NewsDraft = memo(() => {
  const {adminInfo} = useSelector(state => state.adminPersonalCenter)
  const [newsList, setNewsList] = useState([])
  const [newsCategories, setNewsCategories] = useState([])

   // 获取新闻分类
   useEffect(() => {
    getNewsCategories().then(res => {
      setNewsCategories(res.data)
    })
  }, [])


  // 获取当前用户的草稿箱
  useEffect(() => {
    const condition = {
      auditState:0,
      author: adminInfo.username
    }
    getNewsByCondition(condition).then(res => {
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
      render: (news)=><TitleInTable news={news}/>
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
        <Button onClick={()=>{handleClickDel(news)}} type='danger' shape="circle" icon={<DeleteOutlined />}></Button>&nbsp;
        <UpdateNewsBtn news={news} render={()=><Button shape="circle" icon={<EditOutlined />}></Button>}/>&nbsp;
        <Button onClick={()=>{handleClickSubmit2Audit(news)}} type='primary' shape="circle" icon={<UploadOutlined />}></Button>
      </div>
    },
  ];

  // 删除草稿 news
  const handleClickDel = (news) => {
    confirm({
      title: 'Are you sure delete this news?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        delNews(news.id).then(res => {
          setNewsList(...newsList.filter(item=>item.id!==news.id))
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  // 提交审核
  const handleClickSubmit2Audit = (news) => {
    submit2Audit(news.id).then(res => {
      setNewsList(newsList.filter(item=>item.id!==news.id))
    })
  }

  return (
    <Table dataSource={newsList} columns={columns} rowKey={(item) => item.id}/>
  )
})

export default NewsDraft