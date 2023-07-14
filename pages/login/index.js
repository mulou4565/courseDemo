// pages/login/index.js
import {
  loginRequest
} from "../../api/main"

// 钩子函数
Page({

    /**
     * 页面的初始数据
     */
    data: {
      stuId: '',
      password: '',
      saveCount: false,   //是否记住账号
    },

    //判定是否由缓存，有就直接填充
    initAccount() {
      const accountCache = wx.getStorageSync('account')
      if (accountCache) {
        this.setData({
          ...accountCache   //解构
        })
      }
    },

    //登录逻辑
    login() {
      // this指向Page对象，存储在that中
      const that = this
      //网络请求数据
      const postData = {
        stuId: that.data.stuId,
        password: that.data.password
      }
      wx.showToast({
        title: '登录中',
        icon: 'loading'
      })

      // 调用原理？？！
      loginRequest(postData).then(res => {
        // 登录成功后返回的逻辑
        wx.hideLoading()
        if (res.code == -1) {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          }) 
          return
        }
        // 存储cookie
        wx.setStorageSync('token', res.data.cookie)
        // 账号缓存
        if (that.data.saveCount) {
          wx.setStorageSync('account', postData)
        } else {
          wx.removeStorageSync('account')
        }
        // 绑定button点击事件
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        })
        //跳转并关闭当前页面
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }, 1500);
      })
    },

      //微信开发文档API---网络---发起请求 wx.request
    //   wx.request({
    //     url: 'http://localhost:3000/login',
    //     data: postData,
    //     method: 'POST',
    //     success(res){
    //       wx.hideLoading()
    //       if (res.data.code == -1) {
    //         wx.showToast({
    //           title: res.data.msg,
    //           icon: 'none'
    //         }) 
    //         return
    //       }
    //       wx.setStorageSync('token', res.data.data.cookie) //存储cookie
    //       if (that.data.saveCount) {
    //         wx.setStorageSync('account', postData)
    //       } else {
    //         wx.removeStorageSync('account')
    //       }
    //       wx.showToast({
    //         title: '登录成功',
    //         icon: 'success'
    //       })    //绑定button点击事件
    //       setTimeout(() => {
    //         //跳转并关闭当前页面
    //         wx.redirectTo({
    //           url: '/pages/index/index',
    //         })
    //       }, 1500);   //1.5秒
    //     }
    //   })
    // },

    switchStatus() {
      this.setData({
        saveCount: !this.data.saveCount
      })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.initAccount()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})