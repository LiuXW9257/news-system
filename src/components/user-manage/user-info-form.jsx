import React, { forwardRef, useEffect, useState } from 'react'
import { Form, Input, Select  } from 'antd'
import { getAllRegion } from '@/services'
import { useSelector } from 'react-redux'
const { Option } = Select

const UserInfoForm = forwardRef((props, ref) => {
  const { adminInfo } = useSelector(state => state.adminPersonalCenter)
  const { roleList } = props
  const [regions, setRegions] = useState([])
  const [isSelectRegions, setIsSelectRegions] = useState(true)
  const { regionDisable } = props

  useEffect(() => {
    getAllRegion().then(res => {
      setRegions(res.data)
    })
  },[])

  useEffect(() => {
    setIsSelectRegions(!regionDisable)
  }, [regionDisable])

  const handleFormValueChange = (changedValues, allValues) => {
    if (changedValues.roleId) {
      if (changedValues.roleId === 1) {
        ref.current.setFieldsValue({
          region: ''
        })
        setIsSelectRegions(false)
      }else{
        setIsSelectRegions(true)
      }
    }
  }

  return (
    <Form
    ref={ref}
    name="basic"
    initialValues={{ remember: true }}
    autoComplete="off"
    layout='vertical'
    onValuesChange={handleFormValueChange}
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

    <Form.Item
      name="region"
      label="区域"
      rules={[
        {
          required: isSelectRegions,
        },
      ]}
    >
      <Select
        allowClear
        disabled={!isSelectRegions}
      >
        {regions.map((item) => <Option disabled={adminInfo.region && adminInfo.region!==item.value} key={item.id} value={item.value}>{item.title}</Option>)}
      </Select>
    </Form.Item>

      <Form.Item
        name="roleId"
        label="角色名"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          allowClear
        >
          {roleList.map((item) => <Option disabled={adminInfo.roleId > item.roleType} key={item.id} value={item.roleType}>{item.roleName}</Option>)}
        </Select>
      </Form.Item>

  </Form>
  )
})


export default UserInfoForm