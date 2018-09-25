// pages/microSignal/microSignal.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    str: '',
    isFocus: false,
    change: 'save',
    saveClickNum: 0,
    isMicroSignal: false
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
  getLength: function(content) {
    this.setData({
      str: content.detail.value
    })
  },
  clearValue() {
    this.setData({
      str: '',
      isFocus: true
    })
  },
  saveMicroSignal() {
    var that = this
    if (that.data.saveClickNum === 0) {
      that.setData({
        saveClickNum: 1
      })
      setTimeout(function() {
        that.setData({
          saveClickNum: 0
        })
      }, 1000)
      if (that.data.str.length > 0) {
        if (that.data.isMicroSignal === false) {
          wx.request({
            url: app.globalData.url + '/userDetailedInformation/save',
            data: {
              userToken: app.globalData.userToken,
              wechat: that.data.str
            },
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            method: 'POST',
            success: function(res) {
              console.log(res)
              if (res.statusCode === 200) {
                if (res.data.code === 0) {
                  wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 2000
                  })
                  setTimeout(function() {
                    wx.navigateBack({
                      delta: 1
                    })
                  }, 1000)
                } else {
                  wx.showToast({
                    title: '保存失败',
                    icon: 'none',
                    duration: 2000
                  })
                }
              }
            }
          })
        } else {
          wx.request({
            url: app.globalData.url + '/userDetailedInformation/update',
            data:{
              userToken:app.globalData.userToken,
              wechat: that.data.str
            },
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            method: 'POST',
            success:function(res){
              if(res.statusCode === 200 && res.data.code === 0){
                wx.showToast({
                  title: '修改成功',
                  icon: 'none',
                  duration: 2000
                })
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 1000)
              }
            }
          })
        }
      } else {
        wx.showToast({
          title: '未填写微信号',
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.request({
      url: app.globalData.url + '/userDetailedInformation/findUserDetailedInformationByToken',
      data: {
        userToken: app.globalData.userToken
      },
      success: function(res) {
        if (res.statusCode === 200 && res.data.code === 0) {
          that.setData({
            isMicroSignal: true,
            str:res.data.data.wechat
          })
        }
      }
    })
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