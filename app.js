// app.js
import localConfigs from './config'

App({
  // 程序一启动就执行
  onLaunch() {
    // 计算导航栏高度
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.StatusBar = res.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - res.statusBarHeight;
      },
    })
  },
  globalData: {
    
  },
  
  // 获取配置
  getConfig(key = "") {
    // 不指定key，返回全部
    if (key === "") {
      return localConfigs
    }
    // 不存在配置
    if (!localConfigs[key]) {
      console.warn(`${key} config is no exist`)
      return undefined
    }
    // 配置是否区分环境
    if (typeof localConfigs[key] === "object" && typeof localConfigs[key] !== null) {
      // 获取当前环境类型
      const env = this.getConfig("env")
      return localConfigs[key][env]
    }
    return localConfigs[key]
  }
})
