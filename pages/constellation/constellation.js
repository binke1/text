// pages/constellation/constellation.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    time: '',
    age: 0,
    constellation: '',
    birthday: null,
    change: 'save',
    saveClickNum: 0,
    nowDate: null
  },
  changButton() {
    this.setData({
      change: 'savePress'
    })
  },
  reductionButton() {
    this.setData({
      change: 'save'
    })
  },
  bindTimeChange(e) {
    var bjDate = new Date()
    var newDate = bjDate.getFullYear()
    var oldAge = e.detail.value.split('-')
    var monthDay = Number(oldAge[1] + '.' + oldAge[2]).toFixed(2)
    if (monthDay >= 1.20 && monthDay <= 2.18) {
      this.data.constellation = '水瓶座'
    } else if (monthDay >= 2.19 && monthDay <= 3.20) {
      this.data.constellation = '双鱼座'
    } else if (monthDay >= 3.21 && monthDay <= 4.19) {
      this.data.constellation = '白羊座'
    } else if (monthDay >= 4.20 && monthDay <= 5.20) {
      this.data.constellation = '金牛座'
    } else if (monthDay >= 5.21 && monthDay <= 6.21) {
      this.data.constellation = '双子座'
    } else if (monthDay >= 6.22 && monthDay <= 7.22) {
      this.data.constellation = '巨蟹座'
    } else if (monthDay >= 7.23 && monthDay <= 8.22) {
      this.data.constellation = '狮子座'
    } else if (monthDay >= 8.23 && monthDay <= 9.22) {
      this.data.constellation = '处女座'
    } else if (monthDay >= 9.23 && monthDay <= 10.23) {
      this.data.constellation = '天秤座'
    } else if (monthDay >= 10.24 && monthDay <= 11.22) {
      this.data.constellation = '天蝎座'
    } else if (monthDay >= 11.23 && monthDay <= 12.21) {
      this.data.constellation = '射手座'
    } else if ((monthDay >= 12.22 && monthDay < 12.31) || (monthDay <= 1.19 && monthDay > 0)) {
      this.data.constellation = '摩羯座'
    }
    this.setData({
      age: newDate - oldAge[0],
      constellation: this.data.constellation,
      birthday: e.detail.value
    })
  },
  saveAge() {
    if (this.data.saveClickNum === 0) {
      var that = this
      this.setData({
        saveClickNum: 1
      })
      setTimeout(function() {
        that.setData({
          saveClickNum: 0
        })
      }, 1000)
      wx.request({
        url: app.globalData.url + '/user/update',
        data: {
          userToken: app.globalData.userToken,
          birthday: that.data.birthday
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        success: function(res) {
          console.log(res)
          if (res.statusCode === 200 && res.data.code === 0) {
            app.globalData.guanPeiShengUserInfo.constellation = that.data.constellation
            app.globalData.guanPeiShengUserInfo.birthday = that.data.birthday
            if (that.data.birthday !== null) {
              app.globalData.s = that.data.birthday.split("-")[0].slice(2, 3)
            }
            app.globalData.guanPeiShengUserInfo.age = that.data.age
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000
            })
            setTimeout(function() {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var date = new Date()
    this.setData({
      nowDate: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    })
    if (app.globalData.guanPeiShengUserInfo !== null) {
      var birthday = app.globalData.guanPeiShengUserInfo.birthday
      var utils = require('./../../utils/util.js')
      var standardTime = new Date();
      if (birthday === null) {
        var str = standardTime.getFullYear() + '-' + (standardTime.getMonth() + 1) + '-' + standardTime.getDate()
        this.setData({
          age: 0,
          time: utils.formatTime(standardTime)
        })
      } else {
        this.setData({
          age: standardTime.getFullYear() - birthday.split('-')[0],
          time: birthday.split('T')[0],
          birthday: birthday,
          constellation: app.globalData.guanPeiShengUserInfo.constellation
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})