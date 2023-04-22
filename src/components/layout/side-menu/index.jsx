import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { getAdminNavTree, sideMenuFormat } from '@/utils/side-menu-format';
import { getAllNavPath } from '@/services';


const SideMenu = memo(() => {
  const navigate = useNavigate()
  const { rightList } = useSelector(state => state.adminPersonalCenter)
  const [sideMenu, setSideMenu] = useState([])
  const { pathname } = useLocation()
  const openKeys = '/'+pathname.split('/')[1];

  useEffect(() => {
    getAllNavPath().then(res => {
      setSideMenu(getAdminNavTree(res.data, rightList))
    })
  }, [rightList])
    
  function handleMenuItemClick(item){
    // 点击切换页面
    navigate(item.key)
  }
  
  return (
    <Menu
      theme="dark"
      mode="inline"
      onClick={handleMenuItemClick}
      defaultOpenKeys={[openKeys]}
      selectedKeys={[pathname]}
      items={sideMenuFormat(sideMenu)}
    />
  )
})

export default SideMenu