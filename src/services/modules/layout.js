import req from '../index'

export function getSideMenuByRoleId(roleId){
  return req.get('/rights?_embed=children')
}