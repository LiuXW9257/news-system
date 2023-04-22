import req from "../index";

export function userLogin(userInfo = {}){
  const { username, password } = userInfo
  return req.get(`/users?username=${username}&password=${password}`)
}