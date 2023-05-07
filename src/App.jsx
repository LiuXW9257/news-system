import React, { Fragment, memo, useEffect } from 'react'
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { message } from 'antd'
import routes, { checkRouteAuth } from './router';
import { checkLoginStatus } from './utils/check-login';

const App = memo(() => {
  const outlet = useRoutes(routes)
  
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    // 判断路由
    if (pathname === '/') {
      navigate(`/news/list`)
      return
    }
    const route = checkRouteAuth(pathname)
    // 地址是否存在
    if (!route) {
      // 这里要使用 replace， 不然点击回退，会一直走这个逻辑
      navigate('/error', {replace: true})
    }else{
      // 判断权限
      if (route.auth) {
        // 判断用户是否登录
        const token = checkLoginStatus()
        if (token) {
          const rightList = JSON.parse(localStorage.getItem('right')).rightList
          if (!rightList.includes(pathname)) {
            message.error('账号权限不足 ！')
            navigate('/error', {replace: true})
          }
        }else{
          message.error('请先登录 ！')
          navigate('/login')
        }
      }
    }
  }, [pathname, navigate])
 
  
  return (
    <Fragment>
      {outlet}
    </Fragment>
  )
})

export default App