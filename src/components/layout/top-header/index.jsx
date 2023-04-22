import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Layout, Avatar, Dropdown } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';

import style from './index.module.less'
import { changeCollapsed } from '@/store/modules/top-header';

const { Header } = Layout;

const items = [
  {
    label: '信息管理',
    key: 'info0-manage',
  },
  {
    label: '退出登录',
    key: 'logout',
    danger: true,
  },
];

const TopHeader = memo(() => {
  const { collapsed } = useSelector(state => state.topHeader)
  const { adminInfo } = useSelector(state => state.adminPersonalCenter)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleMenuClick(e) {
    const { key } = e
    if (key === 'logout') {
      // 清除localStorage的token
      localStorage.removeItem('token')
      localStorage.removeItem('right')
      // 跳转登录
      navigate('/login')
    }
  }

  return (
    <Header
      className={style['site-layout-background']}
      style={{padding: 0}}
    >
      {/* 展开栏按钮 */}
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: style.trigger,
        onClick: () => dispatch(changeCollapsed(!collapsed)),
      })}
      {/* 头像 */}
      <div className={style.adminInfo}>
        <span style={{fontSize: '16px', marginRight: '10px'}}>{adminInfo.username}, 欢迎回来</span>
        <Dropdown menu={{
          items,
          onClick: handleMenuClick,
        }}>
          <Avatar size={46} icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  )
})

export default TopHeader