import { Tag } from 'antd'

// 获取审核状态
export function getAuditState(auditState){
  const arr = ['草稿箱', '待审核', '审核通过', '审核未通过']
  return arr[auditState]
}
// 获取发布状态
export function getPublishState(publishState){
  const arr = ['未审核', '待发布', '已发布', '已下架']
  return arr[publishState]
}

// 获取审核状态标签
export function getAuditStateTag(auditState){
  switch (auditState) {
    case 1:
      return <Tag color="orange">{getAuditState(auditState)}</Tag>
    case 2:
      return <Tag color="green">{getAuditState(auditState)}</Tag>
    case 3:
      return <Tag color="red">{getAuditState(auditState)}</Tag>
    default:
      return <Tag color="orange">{getAuditState(0)}</Tag>
  }
}

// 获取发布状态标签
export function getPublishStateTag(auditState){
  switch (auditState) {
    case 1:
      return <Tag color="green">{getPublishState(auditState)}</Tag>
    case 2:
      return <Tag color="blue">{getPublishState(auditState)}</Tag>
    case 3:
      return <Tag color="red">{getPublishState(auditState)}</Tag>
    default:
      return <Tag  color="orange">{getPublishState(0)}</Tag>
  }
}