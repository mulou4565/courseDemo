import createRequest from '../utils/request'

// 登录请求封装函数
export function loginRequest(data) {
  return createRequest({
      url: '/login',
      method: 'POST',
      data,
      needLogin: false
  })
}

// 查询有效成绩封装函数
export function getScoreListRequest(data) {
  return createRequest({
      url: '/scores',
      method: 'GET',
      data,
      needLogin: true
  })
}

// 查询原始成绩封装函数
export function getRawScoreListRequest(data) {
  return createRequest({
      url: '/raw-scores',
      method: 'GET',
      data,
      needLogin: true
  })
}

// 查询课表封装函数
export function getCourseListRequest(data) {
  return createRequest({
      url: '/courses',
      method: 'GET',
      data,
      needLogin: true
  })
}