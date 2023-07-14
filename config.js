// 开发环境 develop
// 生产环境 production
let env = "develop"

// 防止我们在上传代码的时候，没有将env改成production
// wx.getAccountInfoSync()获取当前小程序环境
const envVersion = wx.getAccountInfoSync().miniProgram.envVersion
if (envVersion === "release" && env !== "production") {
  env = "production"
}

// 导出一个配置对象
// 以每个环境作为key，分别配置参数
export default {
  // 当前环境
  env,
  // 请求接口域名
  baseUrl: {
    develop: 'http://localhost:3000', 
    production: 'http://api.xxx.com',
  },
}