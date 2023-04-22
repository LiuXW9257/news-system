// 判断登录状态并跳转 login页
export function checkLoginStatus() {
  const token = localStorage.getItem('token') ?? undefined
  if (!token) {
    return undefined
  }else{
    return JSON.parse(token)
  }
}