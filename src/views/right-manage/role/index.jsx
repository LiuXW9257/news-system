import React, { memo, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Table, Modal } from 'antd'
import { DeleteOutlined, MenuOutlined } from '@ant-design/icons'
import { fetchRightList, fetchRoleList, updateRoleList } from '@/store/modules/right-manage'
import RightMenuTree from '@/components/right-manage/right-menu-tree'
import { getAllNavPath, updateRoleRightsById } from '@/services'
import { updateRightList } from '@/store/modules/admin-personal-center'

const RoleList = memo(() => {
  const dispatch = useDispatch()
  const roleRightNode = useRef(null)
  const { roleList } = useSelector(state => state.rightManage)
  const { adminInfo } = useSelector(state => state.adminPersonalCenter)
  const [isShowMenu, setIsShowMenu] = useState(false)
  const [roleRightMenu, setRoleRightMenu] = useState([])
  const [currentRole, setCurrentRole] = useState({})

  useEffect(() => {
    dispatch(fetchRightList())
    dispatch(fetchRoleList())
  }, [dispatch])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id)=><b>{id}</b>
    },
    {
      title: '角色名',
      dataIndex: 'roleName',
      key: 'age',
    },
    {
      title: '操作',
      render:(role) => <div>
        <Button 
          type="danger" 
          shape="circle" 
          icon={<DeleteOutlined />} 
        />&nbsp;

        <Button 
          type="primary" 
          shape="circle" 
          icon={<MenuOutlined /> } 
          onClick={()=>{handleClickRightMenu(role)}}
        />
      </div>
    },
  ];

  const handleClickRightMenu = (role) => {
    setCurrentRole(role)
    setRoleRightMenu(role.rights)
    setIsShowMenu(true)
  }

  const handleOk = () => {
    updateRoleRights(roleRightNode.current.state.checkedKeys)
    setIsShowMenu(false)
    setCurrentRole({})
  }

  const updateRoleRights = (roleRights) => {
    updateRoleRightsById(currentRole.id, {rights: roleRights})

    const newRoleList = roleList.map((role) => {
      if (role.id !== currentRole.id) {
        return role
      }else{
        return {...role, rights: roleRights}
      }
    })

    dispatch(updateRoleList(newRoleList))

    // 判断是否是当前角色
    if (currentRole.roleType === adminInfo.roleId) {
      getAllNavPath().then(res => {
        dispatch(updateRightList(roleRights))
      })
    }
  }

  const handleCancel = () => {
    setIsShowMenu(false)
    setCurrentRole({})
  }

  return (
    <div>
      <Table
        dataSource={roleList}
        columns={columns} 
        rowKey={(item) => item.id}/>
        {
          isShowMenu ?
          <Modal 
            title="权限列表" 
            open={isShowMenu} 
            onOk={handleOk} 
            onCancel={handleCancel}
          >
           <RightMenuTree
            ref={roleRightNode}
            roleRightsMenu={roleRightMenu}/>
          </Modal>  : ""
        }
      
    </div>
  )
})

export default RoleList