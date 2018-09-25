// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {},
  getUserInfo(res) {
    if (res.detail.userInfo !== undefined) {
      app.globalData.loginJumpIndex = 1
      app.globalData.userInfo = res.detail.userInfo
      wx.request({
        url: app.globalData.url + '/weixin/login',
        method: 'POST',
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          code: app.globalData.code,
          name: res.detail.userInfo.nickName,
          sex: res.detail.userInfo.gender
        },
        success: function(res) {
          if (res.statusCode === 200) {
            if (res.data.code === 0) {
              app.globalData.userToken = res.data.data
              wx.request({
                url: app.globalData.url + '/user/findUserByToken',
                data: {
                  userToken: app.globalData.userToken
                },
                success: function(res) {
                  if (res.statusCode === 200) {
                    if (res.data.code === 0) {
                      app.globalData.guanPeiShengUserInfo = res.data.data
                      if (res.data.data.birthday !== null) {
                        var nowDate = new Date()
                        var nowYear = nowDate.getFullYear()
                        var birthday = res.data.data.birthday.split('-')[0]
                        app.globalData.s = birthday.slice(2, 3)
                        var age = nowYear - birthday
                        app.globalData.guanPeiShengUserInfo.age = age
                      }
                    }
                  }
                }
              })
              //查询求职者
              wx.request({
                url: app.globalData.url + '/jobHunter/findJobHunterByUser',
                data: {
                  userToken: app.globalData.userToken
                },
                success: function(res) {
                  if (res.statusCode === 200) {
                    if (res.data.code === 0) {
                      if (res.data.data !== null) {
                        app.globalData.jobHunterInfo = res.data.data
                        //查询用户标签
                        wx.request({
                          url: app.globalData.url + '/jobhunterLabels/findLabelsByJobhunter',
                          data: {
                            userToken: app.globalData.userToken,
                            jobHunterId: app.globalData.jobHunterInfo.id
                          },
                          success: function(res) {
                            app.globalData.myLabel = res.data.data
                          }
                        })
                      }
                    }
                  }
                }
              })
              //查询求职者教育信息
              wx.request({
                url: app.globalData.url + '/jobHunterEducation/findJobHunterEducationByToken',
                data: {
                  userToken: app.globalData.userToken
                },
                success: function(res) {
                  if (res.statusCode === 200) {
                    if (res.data.code === 0) {
                      if(res.data.data !== null){
                        app.globalData.eduInfo = res.data.data
                        app.globalData.schoolName = res.data.data.school
                      }
                    }
                  }
                }
              })
              wx.switchTab({
                url: './../myInfo/myInfo',
              })
            }else if(res.code === 1){
              wx.showToast({
                title: '登录失败',
                icon: 'none',
                duration: 2000
              })
            }
          }
        }
      })
    } else {
      wx.switchTab({
        url: './../index/index',
      })
    }
  },
  phoneLogin() {
    wx.navigateTo({
      url: './../phoneLogin/phoneLogin',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    if (app.globalData.loginJumpIndex === 0) {
      wx.switchTab({
        url: './../index/index',
      })
      app.globalData.loginJumpIndex = 1
    }
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