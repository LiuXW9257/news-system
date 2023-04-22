import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import React, { memo, useEffect, useRef, useState } from 'react'
import { PageHeader, Steps, Button, Form, Input, Select, message } from 'antd'
import MyEditor from '@/components/news-manage/my-editor'
import style from './index.module.less'
import { adddNews, getNewsCategories, getNewsDetail, updateNews } from '@/services'
const { Option } = Select
const NewsAdd = memo(() => {
  // 记录本次是编写还是修改 news
  const [isUpdate, setIsUpdate] = useState(false)
  // 如果本次是修改，这里记录新闻id，交给editor组件
  const [updateNewsId, setUpdateNewsId] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [newsContent, setNewsContent] = useState({})
  const { adminInfo } = useSelector(state => state.adminPersonalCenter)
  const [newsCategories, setNewsCategories] = useState([])
  const location = useLocation()
  const navigate = useNavigate()

  const formNode = useRef()

  // 判断是否是修改
  useEffect(() => {
    const { state } = location
    if (!state) {
      // 不是修改
      setIsUpdate(false)
      // 回到第一步
      setCurrentStep(0)
      // 清空表信息
      formNode.current.resetFields()
      // 清空 news 信息
      setNewsContent({})
      // 清空传递给editor的content
      setUpdateNewsId(null)
    }else{
      const { newsId } = state
      setIsUpdate(true)
      // 获取新闻信息
      getNewsDetail(newsId).then(res => {
        formNode.current.setFieldsValue({
          title: res.data.title,
          category: res.data.category.value
        })
        setUpdateNewsId(res.data.id)
      })
      // 复现新闻
    }
  }, [location])

  // 获取新闻分类
  useEffect(() => {
    getNewsCategories().then(res => {
      setNewsCategories(res.data)
    })
  }, [])

  const handleBtnClickAboutStep = (type) => {

    const typeObj = {
      'pre': ()=>{},
      'next': clickNextBtn,
      'add2Draft': clickAdd2DraftBtn,
      'submitAudit':()=>{},
    }
    typeObj[type] && typeObj[type]()

  }

  // 点击下一步
  const clickNextBtn = () => {
    if (currentStep === 0) {
      // 表单验证
      formNode.current.validateFields().then(res => {
        setNewsContent(res)
        setCurrentStep(currentStep+1)
      }).catch(e => {

      })
    }else if (currentStep === 1) {
      // 检查 内容是否是否为空
      const {content} = newsContent
      if (content === '<p></p>') {
        message.error('新闻内容不能为空');
      }else{
        setCurrentStep(currentStep+1)
      }
    }
  }

  // 打包新闻为 json 格式
  const packageNews = (news, auditState=0) => {
    const categoryObj =  newsCategories.find((item) => item.value === news.category)
    const { title, content } = newsContent
    news = {
      title,
      categoryId: categoryObj.id,
      content,
      region: adminInfo.region===""?"全球":adminInfo.region,
      author: adminInfo.username,
      roleId: adminInfo.roleId,
      auditState,
      publishState: 0,
      createTime: new Date().getTime(),
      star: 0,
      view: 0,
    }
    return news
  }
  
  //保存到草稿箱
  const clickAdd2DraftBtn = () => {
    if(isUpdate){
      const categoryObj =  newsCategories.find((item) => item.value === newsContent.category)
      const { title, content } = newsContent
      const news = {
        title,
        categoryId: categoryObj.id,
        content,
        auditState: 0,
        publishState: 0,
      }
      updateNews(updateNewsId,news).then(res => {
        navigate('/news-manage/draft')
      })
    }else{
      const newsObj = packageNews(newsContent)
      adddNews(newsObj).then(res => {
        navigate('/news-manage/draft')
      })
    }
  }

  // 富文本editor失焦的回调，获取文本内容
  const getNewsContent = (content) => {
    content = content.trim()
    setNewsContent({...newsContent, content})
  }

  return (
    <div>
      {/* 页头 */}
      <PageHeader
        onBack={() => window.history.back()}
        className={style['site-page-header']}
        title={isUpdate?"修改新闻":"撰写新闻"}
        subTitle={isUpdate?"update news":"add news"}
      />
      {/* 步骤条 */}
      <Steps
        current={currentStep}
        items={[
          {
            title: '基本信息',
            description:'新闻标题、新闻分类'
          },
          {
            title: '新闻内容',
            description: '新闻主题内容'
          },
          {
            title: '新闻提交',
            description: '保存草稿或者提交审核',
          },
        ]}
      />

      {/* 表单 */}
      <div style={{'marginTop': '20px'}} className={currentStep===0?'':style['hidden']}>
        <Form
          ref={formNode}
          name="basic"
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 22 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: 'Please input your title!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="分类"
            name="category"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              allowClear
            >
              {newsCategories.map(item => <Option key={item.id} value={item.value}>{item.title}</Option>)}
            </Select>
          </Form.Item>
        </Form>           
      </div>

      {/* 富文本编辑器 */}
      <div style={{'marginTop':'20px'}} className={currentStep === 1?'':style.hidden}>
        <MyEditor getNewsContent={getNewsContent} updateNewsId={updateNewsId}/>
      </div>

      <div className={style['btn-box']}>
        <Button className={currentStep === 0?style.hidden:''} onClick={()=>{setCurrentStep(currentStep-1)}}>上一步</Button>&nbsp;
        <Button className={currentStep === 2?style.hidden:''} onClick={()=>{handleBtnClickAboutStep('next')}} type="primary">下一步</Button>
        <Button className={currentStep === 2?'':style.hidden} onClick={()=>{handleBtnClickAboutStep('add2Draft')}} type="primary">存草稿箱</Button>&nbsp;
        <Button className={currentStep === 2?'':style.hidden} onClick={()=>{setCurrentStep(currentStep+1)}} type="danger">提交审核</Button>
      </div>
    </div>
  )
})

export default NewsAdd