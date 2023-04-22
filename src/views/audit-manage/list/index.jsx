import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Table, Button, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { getNewsByCondition, getNewsCategories, updateNews } from '@/services'
import { getAuditStateTag } from '@/utils/news-manage'
import style from './index.module.less'
import UpdateNewsBtn from '@/components/news-manage/update-news-btn'

const { confirm } = Modal;

const AuditList = memo(() => {
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
      dataIndex: 'title',
      render: (title)=><div style={{'textDecoration': 'underline', 'color': '#58a9ff', 'cursor':'pointer'}} href="">{title}</div>
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
      title: '状态',
      dataIndex: 'auditState',
      render: (auditState) => <div>{getAuditStateTag(auditState)}</div>
    },
    {
      title: '操作',
      render:(news) => <div>
        <Button onClick={()=>{handleClickRevoke(news)}} type='danger'>撤销</Button>&nbsp;
        {/* 这里使用 slot 的形式，来是实现服用，可以传入不同的 bnt 样式, 并在子组件中通过冒泡进行统一的点击事件处理（跳转） */}
        {(news.auditState === 1 || news.auditState === 3) && <UpdateNewsBtn news={news} render={()=><Button>修改</Button>} />}&nbsp;
        <Button className={(news.auditState !== 2)?style['hidden']:''} onClick={()=>{handleClickPublish(news)}} type='primary'>发布</Button>
        <Button className={(news.auditState !== 3)?style['hidden']:''} type='primary'>提交审核</Button>
      </div>
    },
  ];

  // 删除草稿news
  const handleClickRevoke = (news) => {
    confirm({
      title: 'Are you sure revoke this news?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        updateNews(news.id, {
          auditState: 0,
        }).then(res => {
          setNewsList(newsList.filter(item=>item.id!==news.id))
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const handleClickPublish = (news) => {

  }

  return (
    <Table dataSource={newsList} columns={columns} rowKey={(item) => item.id}/>
  )
})

export default AuditList