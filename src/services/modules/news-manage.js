import req from '../index'

export function getNewsCategories(){
  return req.get(`/categories`)
}

/**
 * 
 * @param {*} condition 
 * auditState : 0 草稿箱
 * auditState : 1 审核中
 * auditState : 2 审核通过
 * auditState : 3 审核未通过
 * @returns 
 */
export function getNewsByCondition(condition){
  const {auditState, author} = condition
  // 查询个人草稿箱
  if (auditState === 0) {
    return req.get(`/news?publishState=0&author=${author}&auditState=${auditState}`)
  }else{
    // 查看个人审核列表
    return req.get(`news?publishState_lte=1&author=${author}&auditState_gte=1`)
  }
}

export function adddNews(news){
  return req.post(`/news`,news)
}

export function delNews(newId) {
  return req.delete(`/news/${newId}`)
}

// 存草稿箱
export function submit2Audit(newId){
  return req.patch(`/news/${newId}`, {
    auditState: 1
  })
}

// 审核
export function newsAudit(condition){
  const {newsId, isPass} = condition
  return req.patch(`/news/${newsId}`, {
    auditState: isPass?2:3,
    publishState: isPass?1:0
  })
}

// 发布
export function newsPublish(newsId){
  return req.patch(`/news/${newsId}`, {
    publishState: 2,
    publishTime: new Date().getTime()
  })
}

// 获取待审核 news
export function getNews2BeAudited(condition){
  const {region, username} = condition
  // 超级管理员
  if (region === '') {
    return req.get(`/news?auditState=${1}`)
  }else{
    // 区域管理员，不能审核自己的
    return req.get(`/news?auditState=${1}&region=${region}&author_ne=${username}`)

  }
}

// 获取待发布 news
export function getNewsPrePublish(username){
  return req.get(`/news?publishState=1&author=${username}`)
}

// 获取 news 的完整信息
export function getNewsDetail(id){
  return req.get(`/news/${id}?_expand=category&_expand=role`)
}

// 修改 news 
export function updateNews(newsId, news){
  return req.patch(`/news/${newsId}`, news)
}