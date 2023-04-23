import { Suspense, lazy } from "react"
import Login from "@/views/login"
import MyLayout from "@/components/layout"

// 首页
const Home = lazy(() => import('@/views/home'))
// 404
const ErrorPage = lazy(() => import('@/views/error'))

// 用户管理
const UserUpdate = lazy(() => import('@/views/user-manage/update'))
const UserAdd = lazy(() => import('@/views/user-manage/add'))
const UserDelete = lazy(() => import('@/views/user-manage/delete'))
const UserList = lazy(() => import('@/views/user-manage'))

// 权限管理
// 权限列表
const RightList = lazy(() => import('@/views/right-manage/right'))
// 角色列表
const RoleList = lazy(() => import('@/views/right-manage/role'))

// 新闻管理
const NewsDraft = lazy(() => import('@/views/news-manage/draft'))
const NewsCategory = lazy(() => import('@/views/news-manage/category'))
const NewsPreview = lazy(() => import('@/views/news-manage/preview'))
const AddOrUpdateNews = lazy(() => import('@/views/news-manage/add-update-news'))

// 审核管理
const AuditList = lazy(() => import('@/views/audit-manage/list'))
const NewsAudit = lazy(() => import('@/views/audit-manage/audit'))

//发布管理
const Sunset = lazy(() => import('@/views/publish-manage/sunset'))
const Published = lazy(() => import('@/views/publish-manage/published'))
const Unpublished = lazy(() => import('@/views/publish-manage/unpublished'))


// 路由懒加载需要 <Suspense>
const pageLazyLoad = (Page) => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Page/>
    </Suspense>
  )
}

const routes = [
  {
    // FIXME 这里使用空，方便后边递归怕判断路由权限问题
    path: '',
    element: <MyLayout />,
    children: [
      {
        // 首页
        path: 'home',
        element: pageLazyLoad(Home)
      },
      {
        // 用户管理
        path: 'user-manage',
        children: [
          {
            path: 'add',
            auth: true,
            element: pageLazyLoad(UserAdd)
          },
          {
            path: 'delete',
            auth: true,
            element: pageLazyLoad(UserDelete)
          },
          {
            path: 'update',
            auth: true,
            element: pageLazyLoad(UserUpdate)
          },
          {
            path: 'list',
            auth: true,
            element: pageLazyLoad(UserList)
          }
        ]
      },
      {
        path: 'right-manage',
        children: [
          {
            path: 'role',
            children: [
              {
                path: 'list',
                auth: true,
                element: pageLazyLoad(RoleList)
              },
            ]
          },
          {
            path: 'right',
            children: [
              {
                path: 'list',
                auth: true,
                element: pageLazyLoad(RightList)
              },
            ]
          },
        ]
      },
      {
        path: 'news-manage',
        children: [
          {
            path: 'add',
            auth: true,
            element: pageLazyLoad(AddOrUpdateNews)
          },
          {
            path: 'draft',
            auth: true,
            element: pageLazyLoad(NewsDraft)
          },
          {
            path: 'category',
            auth: true,
            element: pageLazyLoad(NewsCategory)
          },
          {
            path: 'preview',
            auth: true,
            element: pageLazyLoad(NewsPreview)
          },
          {
            path: 'update',
            auth: true,
            element: pageLazyLoad(AddOrUpdateNews)
          }
          
        ]
      },
      {
        path: 'audit-manage',
        children: [
          {
            path: 'audit',
            auth: true,
            element: pageLazyLoad(NewsAudit)
          },
          {
            path: 'list',
            auth: true,
            element: pageLazyLoad(AuditList)
          },

        ]
      },
      {
        path: 'publish-manage',
        children: [
          {
            path: 'unpublished',
            auth: true,
            element: pageLazyLoad(Unpublished)
          },
          {
            path: 'published',
            auth: true,
            element: pageLazyLoad(Published)
          },
          {
            path: 'sunset',
            auth: true,
            element: pageLazyLoad(Sunset)
          },
        ]
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path:'/error',
    element: pageLazyLoad(ErrorPage)
  },
  {
    path: '*',
    element: pageLazyLoad(ErrorPage)
  },
]

// 递归判断是否纯在该路由
const checkRoute = (routes, pathname, fatherPath='') => {
  for(const route of routes){
    const currentPath = fatherPath + route.path
    if (currentPath === pathname) {
      return route
    }
    if (route.children) {
      const res = checkRoute(route.children, pathname, currentPath + '/')
      if (res) {
        return res
      }
    }
  }
  return null;
}

export function checkRouteAuth(pathname) {
  let auth = null
  auth = checkRoute(routes, pathname)
  return auth
}

export default routes