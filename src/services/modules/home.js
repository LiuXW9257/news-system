import req from '../index'


// 获取用户最多浏览
export function getMostViewNews(){
  return req.get(`/news?publishState=2&_sort=view&_order=desc&_limit=6`)
}

// 获取用户点赞最多
export function getMostSatrNews(){
  return req.get(`/news?publishState=2&_sort=star&_order=desc&_limit=6`)
}