// pages/myInfo/myInfo.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    s: '',
    userHeadImg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //跳转消息页
  jumpMsg() {
    wx.switchTab({
      url: './../msg/msg',
    })
  },
  //跳转个人预览页
  personalPreview() {
    wx.request({
      url: app.globalData.url + '/jobHunterEducation/findJobHunterEducationByToken',
      data: {
        userToken: app.globalData.userToken
      },
      success: function(res) {
        if (res.statusCode === 200) {
          if (res.data.data === null) {
            wx.showToast({
              title: '你的资料未填写完整不能预览',
              icon: 'none',
              duration: 2000
            })
          } else {
            wx.navigateTo({
              url: './../personView/personView',
            })
          }
        }
      }
    })
  },
  onLoad: function(options) {
    // if (app.globalData.userInfo !== null){
    //   this.setData({
    //     s: app.globalData.s
    //   })
    //   wx.request({
    //     url: app.globalData.url + '/jobHunterEducation/findJobHunterEducationByToken',
    //     data: {
    //       userToken: app.globalData.userToken
    //     },
    //     success: function (res) {
    //       app.globalData.eduExperience = res.data.data
    //     }
    //   })
    // } else {
    //   setTimeout(function(){
    //     wx.navigateTo({
    //       url: './../login/login',
    //     })
    //   },100)
    // }
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
    if (app.globalData.userInfo !== null) {
      this.setData({
        s: app.globalData.s
      })
      wx.request({
        url: app.globalData.url + '/jobHunterEducation/findJobHunterEducationByToken',
        data: {
          userToken: app.globalData.userToken
        },
        success: function(res) {
          app.globalData.eduExperience = res.data.data
        }
      })
    } else if (app.globalData.loginJumpIndex === 0) {
      wx.navigateTo({
        url: './../login/login',
      })
    }
    if (app.globalData.guanPeiShengUserInfo !== null) {
      this.setData({
        userName: app.globalData.guanPeiShengUserInfo.name,
        userHeadImg: app.globalData.userInfo.avatarUrl
      })
    } else if (app.globalData.userInfo !== null) {
      this.setData({
        userName: app.globalData.userInfo.nickName,
        userHeadImg: app.globalData.userInfo.avatarUrl
      })
    }
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