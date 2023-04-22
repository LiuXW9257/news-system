import req from '../index'

export function getRightList(){
  return req.get('/rights?_embed=children')
}

export function deleteRightById(item){
  if (item.grade === 1) {
    return req.delete(`/rights/${item.id}`)
  }else{
    return deleteChildRightById(item.id)
  }
}

export function getRoleList(){
  return req.get(`/roles`)
}

export function deleteChildRightById(id){
  return req.delete(`/children/${id}`)
}

export function updateRightOfPagepermisson(item, data){
  if (item.grade === 1) {
    return req.patch(`/rights/${item.id}`, data)
  }
  return updateChildRightOfPagepermisson(item.id, data)
}

export function updateChildRightOfPagepermisson(id, data){
  return req.patch(`/children/${id}`, data)
}

export function updateRoleRightsById(roleId, data){
  return req.patch(`/roles/${roleId}`, data)
}