// pages/score/index.js
import {
    getScoreListRequest,
    getRawScoreListRequest
} from "../../api/main"

// 创建缓存
const scoreCacheKey = "scores"
const rawScoreCacheKey = "rawScores"

Page({

    /**
     * 页面的初始数据
     */
    data: {
      type: 1,       // 1为有效成绩，2为原始成绩
      list: [],
      termIndex: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.getList()
    },

    getList() {
      // 先从缓存中查询
      const cache = wx.getStorageSync(this.data.type == 1 ? scoreCacheKey : rawScoreCacheKey)
      if (cache) {
        this.setData({
          list: cache
        })
        return
      }
      this.update()
    },

    update() {
      const that = this
      let scoreType = null
      if (that.data.type == 1) {
        scoreType = getScoreListRequest()
      } else {
        scoreType = getRawScoreListRequest()
      }
      scoreType.then(res => {
        console.log(res)
        that.setData({
          list: res.data
        })
        // 将查询的成绩存储到缓存中
        wx.setStorageSync(this.data.type == 1 ? scoreCacheKey : rawScoreCacheKey, res.data)
      })
    },

    // 切换成绩类型
    changeScoreType(e) {
      // 链式操作
      const type = e.currentTarget.dataset.type
      this.setData({
        type
      })
      this.getList()
    },

    changeTerm(e) {
      const termIndex = e.detail.value
      this.setData({
        termIndex
      })
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