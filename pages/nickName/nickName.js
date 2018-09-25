// pages/nickName/nickName.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    str: '',
    isFocus: false,
    change: 'save',
    saveClickNum: 0,
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
  /**
   * 生命周期函数--监听页面加载
   */
  getLength: function(content) {
    var len = content.detail.value.length
    if (len > 4) {
      content.detail.value = content.detail.value.slice(0, 4)
      this.setData({
        str: content.detail.value
      })
    } else {
      this.setData({
        num: content.detail.value.length,
        str: content.detail.value
      })
    }
  },
  clearValue() {
    this.setData({
      str: '',
      num: 0,
      isFocus: true
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
        wx.request({
          url: app.globalData.url + '/user/update',
          data: {
            userToken: app.globalData.userToken,
            name: that.data.str
          },
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          method: 'POST',
          success: function(res) {
            if (res.statusCode === 200) {
              if (res.data.code === 0) {
                app.globalData.guanPeiShengUserInfo.name = that.data.str
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
              }else{
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
        wx.showToast({
          title: '姓名不能为空',
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  onLoad: function(options) {
    if(app.globalData.guanPeiShengUserInfo !== null){
      this.setData({
        str: app.globalData.guanPeiShengUserInfo.name,
        num: app.globalData.guanPeiShengUserInfo.name.length
      })
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