import React, { memo, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Layout } from 'antd';
import style from './index.module.less'
import SideMenu from './side-menu';
import TopHeader from './top-header';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminNavByRoleId } from '@/services';
import { updateAdminInfo, updateRightList } from '@/store/modules/admin-personal-center';
import { checkLoginStatus } from '@/utils/check-login';

const { Sider, Content } = Layout;

const MyLayout = memo(() => {
  const { collapsed } = useSelector(state => state.topHeader)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const token = checkLoginStatus()
    if (!token) {
      navigate('/login')
    }else{
      getAdminNavByRoleId(token.roleId).then(res => {
      dispatch(updateAdminInfo(token))
      dispatch(updateRightList(res.data.rights))
      localStorage.setItem('right', JSON.stringify({rightList: res.data.rights}))
      })
    }
  }, [dispatch, navigate])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {/* logo */}
        <div className={style.logo} style={{overflow: 'hidden'}}>news_system ^__^</div>
        {/* 菜单 */}
        <SideMenu/>
      </Sider>
      <Layout className={style['site-layout']}>
        {/* header */}
        <TopHeader />
        {/* pages */}
        <Content
          className={style['site-layout-background']}
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
})

export default MyLayout