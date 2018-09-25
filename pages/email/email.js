// pages/email/email.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    change: 'save',
    saveClickNum: 0,
    str: ''
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
  saveNickName() {
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
        if (that.data.str.match(/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g) !== null) {
          if (app.globalData.allUserInfo !== null) {
            wx.request({
              url: app.globalData.url + '/userDetailedInformation/update',
              data: {
                userToken: app.globalData.userToken,
                email: that.data.str
              },
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              method: 'POST',
              success: function(res) {
                if (res.statusCode === 200) {
                  if (res.data.code === 0) {
                    app.globalData.allUserInfo.nationality = that.data.str
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
                  } else {
                    wx.showToast({
                      title: '修改失败',
                      icon: 'none',
                      duration: 2000
                    })
                  }
                }
              }
            })
          } else {
            wx.request({
              url: app.globalData.url + '/userDetailedInformation/save',
              data: {
                userToken: app.globalData.userToken,
                email: that.data.str
              },
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              method: 'POST',
              success: function(res) {
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
          }
        } else {
          wx.showToast({
            title: '邮箱格式不正确',
            icon: 'none',
            duration: 2000
          })
        }
      } else {
        wx.showToast({
          title: '你未输入邮箱',
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
    if (app.globalData.allUserInfo !== null && app.globalData.allUserInfo.email !== null) {
      this.setData({
        str: app.globalData.allUserInfo.email
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