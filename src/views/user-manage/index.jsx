import React, { Fragment, memo, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Switch, Button, Modal, message } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { fetchUserList, updateUserList } from '@/store/modules/user-manage'
import { addUser, deleteUser, getRoleList, updateUser, updateUserState } from '@/services'
import UserInfoForm from '@/components/user-manage/user-info-form'
const { confirm } = Modal 

const UserList = memo(() => {
  const dispatch = useDispatch()
  const { userList } = useSelector(state => state.userManage)
  const { adminInfo } = useSelector(state => state.adminPersonalCenter)
  const [roleList, setRoleList] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [preUpdateUser, setPreUpdateUser] = useState({})
  const [addOrUpdate, setAddOrUpdate] = useState("")

  const [isShowUserInfoForm, setIsShowUserInfoForm] = useState(false)

  const userInfoFormNode = useRef()

  useEffect(() => {
    getRoleList().then(res => {
      setRoleList(res.data)
    })
  },[])

  useEffect(() => {
    const condition ={
      roleId: adminInfo.roleId + 1,
      region: adminInfo.region,
    }
    dispatch(fetchUserList(condition))
  }, [dispatch, adminInfo])

  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      render: (region)=><b>{region? region : "全球"}</b>
    },
    {
      title: '角色名',
      render:(user) => roleList.find((item) => item.id === user.roleId)?.roleName
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render: (roleState, user) => 
      <Switch 
        defaultChecked={roleState}
        disabled={user.default}
        onChange={(result)=>{handleUpdateRoleState(result, user)}} />
    },
    {
      title: '操作',
      render: (user) =>
        <div>
            <Button 
            type="danger" 
            shape="circle" 
            disabled={user.default}
            onClick={()=>{handleDelete(user)}}
            icon={<DeleteOutlined />} 
          />&nbsp;

          <Button 
            type="primary" 
            shape="circle" 
            disabled={user.default}
            icon={<EditOutlined /> } 
            onClick={()=>{handleEditUserInfo(user)}}
          />
        </div>
    },
  ];

  // 切换用户状态
  const handleUpdateRoleState = (result, user) => {
    const newUserList = userList.map((item) => {
      if (item.id === user.id) {
        return {...item, roleState: result}
      }else{
        return item
      }
    })
    dispatch(updateUserList(newUserList))
    updateUserState(user.id, {roleState: result})
  }

  // 编辑用户信息
  const handleEditUserInfo = (user) => {
    setAddOrUpdate('update')
    setIsShowUserInfoForm(true)
    setPreUpdateUser(user)
    setIsAdmin(false)
    if (user.roleId === 1) {
      setIsAdmin(true)
    }else{
      setIsAdmin(false)
    }
    // FIXME 这里需要异步触发，因为需要等待组件创建才能进行赋值，不然第一次点击会出错
    setTimeout(() => {
      userInfoFormNode.current.setFieldsValue(user)
    }, 0);
  }

  // 添加用户
  const handleAddUser = () => {
    setAddOrUpdate('add')
    setIsShowUserInfoForm(true)
    setTimeout(() => {
      userInfoFormNode.current.resetFields()
    }, 0); 
  }

  // 删除用户
  const handleDelete = (user) => {
    confirm({
      title: 'Are you sure delete this user?',
      icon: <ExclamationCircleOutlined />,
      content: 'It will be permanent',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteUser(user.id)
        message.success('delete uccess');
        dispatch(updateUserList(userList.filter(item => item.id !== user.id)))
      },
      onCancel() {
      },
    });
  }

  // 确认添加
  const sureAdd = () => {
    userInfoFormNode.current.validateFields().then(async res => {
      const result = await addUser({
        ...res,
        roleState: true,
        default: false,
      })
      dispatch(updateUserList([...userList, result.data]))
      setIsShowUserInfoForm(false)
    }).catch(err=>{
      message.error('请填写完整')
      console.warn(err);
    })
  }

  // 确认更新
  const sureUpdate = () => {
    userInfoFormNode.current.validateFields().then(async res => {
      updateUser({...preUpdateUser, ...res})
      const result = userList.map((item) => {
        if (item.id !== preUpdateUser.id) {
          return item
        }else{
          return {...item, ...res}
        }
      })
      dispatch(updateUserList(result))
      setIsShowUserInfoForm(false)
    }).catch(err=>{
      message.error('请填写完整')
      console.warn(err);
    })
  }

  // 确认按钮
  const handleOk = () => {
    if (addOrUpdate === 'add') {
      sureAdd()
    }else if(addOrUpdate === 'update'){
      sureUpdate()
    }
  }

  // 取消按钮
  const handleCancel = () => {
    setIsShowUserInfoForm(false)
  }

  return (
    <Fragment>
      <Button
        onClick={handleAddUser}
        type="primary"
      >添加用户</Button>
      <Table
        dataSource={userList}
        columns={columns} 
        rowKey={ (item) => item.id}/>

      <Modal title="Basic Modal" open={isShowUserInfoForm} onOk={handleOk} onCancel={handleCancel}>
       <UserInfoForm ref={userInfoFormNode} regionDisable={isAdmin} roleList={roleList}/>
      </Modal>

    </Fragment>
  )
})

export default UserList