// pages/politicalLandscape/politicalLandscape.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['党员', '团员', '群众'],
    index: 0,
    change: 'save',
    saveClickNum: 0,
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
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
  savePolitical() {
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
      if (app.globalData.allUserInfo !== null) {
        wx.request({
          url: app.globalData.url + '/userDetailedInformation/update',
          data: {
            userToken: app.globalData.userToken,
            politicalStatus: that.data.array[that.data.index]
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
            politicalStatus: that.data.array[that.data.index]
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
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.allUserInfo !== null){
      if (app.globalData.allUserInfo.politicalStatus !== null){
        for (let i = 0; i < this.data.array.length; i++) {
          if (this.data.array[i] === app.globalData.allUserInfo.politicalStatus) {
            this.setData({
              index: i
            })
          }
        }
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