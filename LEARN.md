- app.js : 小程序入口
- .json ： 配置文件
- app.wxss : 全局样式  css文件
- pages : 存放所有页面
- utils : 存放一些公共函数方法
- .wxml ： html文件
- 编译模式 ： 快速进入某一页面
- 在pages下创建文件夹，文件夹下创建page！输入页面名称，自动生成4个相关文件。此页面在app.json中的pages中相对照
- wxml中的view 对应 html的div
- .js ： 逻辑实现
- wxml中的model:value="{{stuId}}" 与 js中data的stuId双向绑定  ---类似vue的双向绑定
- 将主题色设置为变量，在css中引用
- 网络请求axios：对axios进行一层封装，对请求和响应体进行拦截操作
- 给项目配置一些环境变量：例如配置不同环境的域名
- bindtap="changeScoreType" data-type="1" ：设置事件，e.currentTarget.dataset.type链式操作获取data-type的值
- tabber页面：客户端窗口的底部或顶部有tab栏可以切换页面。在app.json中配置
- 自定义导航栏：全局配置---window---navigationStyle : custom
- bind:back="update": 可触发事件update，通过back绑定