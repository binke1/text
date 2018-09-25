// pages/editPhone/editPhone.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    phone: '',
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
  clearValue() {
    this.setData({
      phone: '',
      num: 0,
      isFocus: true
    })
  },
  getLength: function(content) {
    var len = content.detail.value.length
    if (len > 11) {
      content.detail.value = content.detail.value.slice(0, 11)
      this.setData({
        phone: content.detail.value,
        num: content.detail.value.length
      })
    } else {
      this.setData({
        phone: content.detail.value,
        num: content.detail.value.length
      })
    }
  },
  savePhone() {
    var that = this
    if (this.data.phone.length === 11) {
      if (that.data.saveClickNum === 0) {
        that.setData({
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
            phoneNumber: that.data.phone
          },
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          method: 'POST',
          success: function(res) {
            if(res.statusCode === 200){
              if(res.data.code === 0){
                wx.showToast({
                  title: '保存成功',
                  icon: 'success',
                  duration: 2000
                })
                app.globalData.guanPeiShengUserInfo.phoneNumber = that.data.phone
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 1000)
              }else if(res.data.code === 1){
                wx.showToast({
                  title: '格式不正确,请重新输入',
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
        title: '请输入11位手机号',
        icon: 'none',
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.guanPeiShengUserInfo !== null){
      if (app.globalData.guanPeiShengUserInfo.phoneNumber !== null){
        this.setData({
          phone: String(app.globalData.guanPeiShengUserInfo.phoneNumber),
          num: String(app.globalData.guanPeiShengUserInfo.phoneNumber).length
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