// 获取时间的函数：早上|上午|下午|晚上
export const getTime = () => {
  let time = ''
  const hour = new Date().getHours()
  if (hour <= 9) {
    time = '早上好'
  } else if (hour <= 12) {
    time = '上午好'
  } else if (hour <= 14) {
    time = '中午好'
  } else if (hour <= 18) {
    time = '下午好'
  } else {
    time = '晚上好'
  }
  return time
}
