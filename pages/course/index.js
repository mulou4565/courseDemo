// pages/course/index.js
import {
   getCourseListRequest 
} from '../../api/main'

const courseCacheKey = "courses"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        nowMonth: 1,
        nowWeek: 1,
        totalWeek: 20,
        showSwitchWeek: false,
        weekDayCount: 7,
        weekIndexText: ['一','二','三','四','五','六','日'],
        // 计算不同周的日期
        startDate: '2023/03/20',
        courseList: [],
        colorList: [
            "#116A7B",
            "#DD58D6",
            "#30A2FF",
            "#0079FF",
            "#F79327",
            "#47A992",
            "#7A3E3E",
            "#FF55BB",
            "#A0D8B3",
            "#539165",
            "#3A98B9",
            "#609966"
        ],
        courseColor: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const {windowWidth} = wx.getSystemInfoSync()
        this.setData({
            windowWidth
        })
        this.getWeekDates()
        this.getNowWeek()
        this.getDate()
    },

    selectWeek() {
        this.setData({
            showSwitchWeek: true
        })
    },

    switchWeek(e) {
        const week = e.currentTarget.dataset.week
        this.setData({
            nowWeek: week,
            showSwitchWeek: false
        })
        this.getWeekDates()
    },

    hideSwitchWeek() {
        this.setData({
            showSwitchWeek: false
        })
    },

    getWeekDates() {
        const startDate = new Date(this.data.startDate)
        const addTime = (this.data.nowWeek - 1) * 7 * 24 * 60 * 60 * 1000
        const firstDate = startDate.getTime() + addTime
        const { month } = this.getDateObject(new Date(firstDate))
        const weekCalendar = []
        for(let i = 0; i < this.data.weekDayCount; i++) {
            const date = new Date(firstDate + i * 24 * 60 * 60 * 1000)
            const { day } = this.getDateObject(date)
            weekCalendar.push(day)
        }
        this.setData({
            weekCalendar,
            nowMonth: month
        })
    },

    getDateObject(date = new Date()) {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        return {
            year, 
            month,
            day
        }
    },

    getNowWeek() {
        const nowDate = new Date().getTime()
        const startDate = new Date(this.data.startDate)
        const time = nowDate - startDate
        const nowWeek = Math.ceil(time / 1000 / 60 / 60 / 24 / 7)
        this.setData({
            nowWeek
        })
        this.getWeekDates()
    }, 

    getDate() {
        const cache = wx.getStorageSync(courseCacheKey)
        if (cache) {
            this.setData({
                courseList: cache
            })
            return
        }
        this.update()
    },

    update() {
        const that = this
        getCourseListRequest().then(res => {
            console.log("in url")
            const courseColor = {}
            let colorIndex = 0
            res.data.map(item => {
                if (courseColor[item.name] === undefined) {
                    courseColor[item.name] = that.data.colorList[colorIndex]
                    colorIndex++
                }
            })
            that.setData({
                courseList: res.data,
                courseColor
            })
            wx.showToast({
              title: '更新成功',
              icon: 'success'
            })
            wx.setStorageSync(courseCacheKey, res.data)
        })
    }
})