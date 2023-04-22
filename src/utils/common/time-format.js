import dayjs from "dayjs";

// 时间格式化 YYYY/MM/DD HH:mm:ss'
export function timeFormat_1(date) {
  return dayjs(date).format('YYYY/MM/DD HH:mm:ss')
}
