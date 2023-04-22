import req from "../index"


// 根据角色id 获取角色导航栏权限
export function getAdminNavByRoleId(roleId){
  return req.get(`/roles/${roleId}`)
}