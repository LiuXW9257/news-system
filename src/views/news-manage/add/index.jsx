import React, { memo, useEffect, useRef, useState } from 'react'
import { PageHeader, Steps, Button, Form, Input, Select } from 'antd'
import style from './index.module.less'
import { adddNews, getNewsCategories } from '@/services'
import MyEditor from '@/components/news-manage/my-editor'
import { useSelector } from 'react-redux'
const { Option } = Select
const NewsAdd = memo(() => {
  const [currentStep, setCurrentStep] = useState(0)
  const [newsContent, setNewsContent] = useState({})
  const { adminInfo } = useSelector(state => state.adminPersonalCenter)
  const [newsCategories, setNewsCategories] = useState([])
  const formNode = useRef()

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
      console.log(formNode.current);
      formNode.current.validateFields().then(res => {
        console.log(res);
        setNewsContent(res)
        setCurrentStep(currentStep+1)
      }).catch(e => {

      })
    }else if (currentStep === 1) {
      console.log(newsContent);
      // 检查 内容是否是否为空
      const {content} = newsContent
      if (content === '<p></p>') {
        console.log('新闻内容不能为空');
      }else{
        console.log(newsContent);
        setCurrentStep(currentStep+1)
      }
    }
  }

  // 打包新闻为 json 格式
  const packageNews = (news, auditState=0) => {
    const categorieObj =  newsCategories.find((item) => item.value === news.categorie)
    const { title, content } = newsContent
    news = {
      title,
      categoryId: categorieObj.id,
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
    const newObj = packageNews(newsContent)
    adddNews(newObj).then(res => {
      console.log(res);
    })
  }

  const getNewsContent = (content) => {
    content = content.trim()
    setNewsContent({...newsContent, content,})
  }

  return (
    <div>
      {/* 页头 */}
      <PageHeader
        className={style['site-page-header']}
        title="撰写新闻"
        subTitle="add news"
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
            name="categorie"
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
        <MyEditor getNewsContent={getNewsContent}/>
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