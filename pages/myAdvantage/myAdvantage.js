// pages/myAdvantage/myAdvantage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputNumber: 0,
    str: '',
    change: 'save',
    saveClickNum: 0
    // hintInfo:null,
    // isShowHint:'hintHidden'
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
  //保存我的优势
  saveMyAdv() {
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
      if (that.data.str.length > 0) {
        var that = this
        if (app.globalData.jobHunterInfo !== null) {
          wx.request({
            url: app.globalData.url + '/jobHunter/update',
            method: 'PUT',
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            data: {
              userToken: app.globalData.userToken,
              id: app.globalData.jobHunterInfo.id,
              advantage: that.data.str
            },
            success: function(res) {
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000
              })
              app.globalData.jobHunterInfo.advantage = that.data.str
              setTimeout(function() {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)
            }
          })
        } else {
          wx.request({
            url: app.globalData.url + '/jobHunter/save',
            method: 'POST',
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            data: {
              userToken: app.globalData.userToken,
              advantage: that.data.str
            },
            success: function(res) {
              if (res.statusCode === 200) {
                if (res.data.code === 0) {
                  wx.request({
                    url: app.globalData.url + '/jobHunter/findJobHunterByUser',
                    data: {
                      userToken: app.globalData.userToken
                    },
                    success: function(res) {
                      if (res.statusCode === 200) {
                        if (res.data.code === 0) {
                          app.globalData.jobHunterInfo = res.data.data
                          wx.showToast({
                            title: '添加成功',
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
                    }
                  })
                }
              }
            }
          })
        }
      } else {
        wx.showToast({
          title: '你未填写信息',
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  //内容改变时
  getLength(e) {
    var len = e.detail.value.length
    if (len > 300) {
      e.detail.value = e.detail.value.slice(0, 300)
      this.setData({
        str: e.detail.value,
        inputNumber: e.detail.value.length
      })
    } else {
      this.setData({
        inputNumber: e.detail.value.length,
        str: e.detail.value
      })
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
    if (app.globalData.jobHunterInfo !== null) {
      if (app.globalData.jobHunterInfo.advantage !== null) {
        this.setData({
          str: app.globalData.jobHunterInfo.advantage,
          inputNumber: app.globalData.jobHunterInfo.advantage.length
        })
      }
    }
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