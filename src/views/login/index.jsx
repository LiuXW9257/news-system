import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, message } from 'antd'
import style from './index.module.less'
import { getUserDetailInfo, userLogin } from '@/services'
const Login = memo(() => {

  const navigate = useNavigate() 

  // 登录请求
  const onFinish = async(userInfo) => {
    const res = await userLogin(userInfo)
    if (res.data.length) {
      // 登陆成功
      message.success('登陆成功');
      getUserDetailInfo(userInfo.username).then(res => {
        // 记录用户信息
        const adminInfo = res.data[0]
        const token = JSON.stringify(adminInfo)
        // 放入localStorage中
        localStorage.setItem('token', token)
        navigate('/home')
        })
    }else{
      message.warning('账号或密码错误...');
    }
  }
  
  const onFinishFailed = () => {
    console.log('表单验证失败');
  }

  return (
    <div className={style['login-page']}>
      <div className={style['form-box']}>
        <Form 
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
})

export default Login