/**
 * 递归格式化菜单树的数据
 * 1. 去除 rightId
 * 2. 去除 children = [] 的情况
 * 3. 去除 pagepermisson = 0 的情况
 * 4. 添加对应的 icon
 * @param {*} sideMune 
 * @returns 
 */

import { HomeOutlined, UserAddOutlined, AuditOutlined, ReadOutlined, VerifiedOutlined, SendOutlined} from '@ant-design/icons';

const iconList= {
  '/home': <HomeOutlined />,
  '/user-manage': <UserAddOutlined />,
  '/right-manage': <AuditOutlined />,
  '/news-manage': <ReadOutlined />,
  '/audit-manage': <VerifiedOutlined />,
  '/publish-manage': <SendOutlined />,
}

export function sideMenuFormat(menuList){
  return menuList.map((item) => {
    let children = []
    if (item.children) {
      children = sideMenuFormat(item.children)
    }
    const { id, title, label, key, grade, pagepermisson } = item
    if (pagepermisson) {
      return children.length > 0 ? {id, title, label, key, grade, children, icon: iconList[item.key]} : {id, title, label, key, grade, icon: iconList[item.key]}
    }else{
      return null
    }
  })
}

// 获取 admin 的导航菜单树
export function getAdminNavTree(allNav, adminMenuList) {
  return allNav.filter((item) => {
    let children = []
    if (item.children) {
      children = getAdminNavTree(item.children, adminMenuList)
    }
    if (adminMenuList.includes(item.key)) {
      item.children = children
      return item
    }else{
      return null
    }
  })
}