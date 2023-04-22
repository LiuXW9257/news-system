import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Tag, Button, Popover, Switch, Modal } from 'antd'
import { DeleteOutlined, ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons'
import { fetchRightList } from '@/store/modules/right-manage'
import { updateRightOfPagepermisson } from '@/services'
const { confirm } = Modal;

const RightList = memo(() => {

  const dispatch = useDispatch()
  const { rightList } = useSelector(state => state.rightManage)

  useEffect(() => {
    dispatch(fetchRightList())
  }, [dispatch])
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => <b>{id}</b>
    },
    {
      title: '权限名称',
      dataIndex: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render: (key) =>  <Tag color="orange">{key}</Tag>
    },
    {
      title: '操作',
      render: (item) => <div>
        <Button 
          type="danger" 
          shape="circle" 
          icon={<DeleteOutlined />}
          onClick={()=>{showDeleteConfirm(item)}}
        />&nbsp;
        <Popover
          style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}
          content={<Switch checked={item.pagepermisson} onChange={()=>{handleRightChange(item)}} />} 
          title="导航栏权限管理" 
          trigger={item.pagepermisson?"hover":""}>
          <Button disabled={!item.pagepermisson} type="primary" shape="circle" icon={<EditOutlined />} />
        </Popover>
      </div>
    },
  ]

  // 展示删除提醒
  const showDeleteConfirm = (item) => {
    confirm({
      title: '你确定要删除这项权限吗?',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后可能无法恢复哦！',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        handleDeleteRight(item)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  
  // 删除操作
  const handleDeleteRight = (item) => {
    console.log(item);

/*     deleteRightById(item).then(value => {
      // 重新获取权限信息进行展示
      dispatch(fetchRightList())
      // dispatch(updateRightList(value))
    })
     */
  }

  const handleRightChange = (item) => {
    console.log(item);
    updateRightOfPagepermisson(
    item,
    {
      pagepermisson: 1-item.pagepermisson
    }).then(value => {
      console.log(value);
      dispatch(fetchRightList())
    })
  }

  return (
    <Table
      dataSource={rightList}
      columns={columns}
      pagination={{
        pageSize: 5
      }} />
  )
})

export default RightList