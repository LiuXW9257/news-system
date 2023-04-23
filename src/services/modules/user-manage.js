import req from "../index";

export function getUserList(){
  return req.get(`/users`)
}

export function updateUserState(userId, data){
  return req.patch(`/users/${userId}`, data)
}

export function getAllRegion(){
  return req.get(`/regions`)
}

export function addUser(user) {
  return req.post(`/users`, user)
}

export function updateUser(user){
  return req.patch(`/users/${user.id}`, user)
}

export function deleteUser(userId) {
  return req.delete(`/users/${userId}`)
}


// 根据用户名 获取用户详细信息
export function getUserDetailInfo(username){
  return req.get(`/users?username=${username}&_expand=role`)
}

// 根据 admin 的 releId 和 region 获取 其下能管理的用户列表
export function getUserListByRoleCondition(condition){
  const { roleId, region } = condition
  let url = `/users?`
  if (region) {
    url += `region=${region}&roleId_gte=${roleId}`
  }else{
    url += `roleId_gte=${roleId}`
  }
  return req.get(url)
}