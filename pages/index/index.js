// 获取应用实例
const app = getApp()

Page({
  data: {
    navList: [
      {
        title: '查课表',
        icon: '',
        path: '/pages/coure/index'
      },
      {
        title: '查成绩',
        icon: '',
        path: '/pages/score/index'
      },
      {
        title: '查考勤',
        icon: '',
        path: '/pages/attendance/index'
      },
      {
        title: '查校历',
        icon: '',
        path: '/pages/calendar/index'
      }
    ]
  },
  // 事件处理函数
  onLoad() {
    
  },
  
  // 跳转
  nav(e) {
    const index = e.currentTarget.dataset.index
    const toPath = this.data.navList[index].path
    wx.navigateTo({
      url: toPath,
    })
  },

})
