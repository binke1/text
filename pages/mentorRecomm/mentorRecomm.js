// pages/mentorRecomm/mentorRecomm.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    str: '',
    num: 0,
    change: 'save',
    isWrite:0,
    saveClickNum: 0
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
  saveMentor() {
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
        if (that.data.isWrite === 0) {
          wx.request({
            url: app.globalData.url + '/userTeachersRecommend/save',
            method: 'POST',
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            data: {
              userToken: app.globalData.userToken,
              teachersRecommend: that.data.str
            },
            success: function(res) {
              if (res.statusCode === 200) {
                wx.showToast({
                  title: '添加成功',
                  icon: 'success',
                  duration: 2000
                })
                setTimeout(function(){
                  wx.navigateBack({
                    delta: 1
                  })
                },1000)
              }
            }
          })
        } else {
          wx.request({
            url: app.globalData.url + '/userTeachersRecommend/update',
            method: 'PUT',
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            data: {
              userToken: app.globalData.userToken,
              teachersRecommend: that.data.str
            },
            success: function (res) {
              if (res.statusCode === 200) {
                if(res.data.code === 0){
                  wx.showToast({
                    title: '修改成功',
                    icon: 'success',
                    duration: 2000
                  })
                  setTimeout(function () {
                    wx.navigateBack({
                      delta: 1
                    })
                  }, 1000)
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
  contentChange(e) {
    var len = e.detail.value.length
    if (len > 300) {
      e.detail.value = e.detail.value.slice(0, 300)
      this.setData({
        str: e.detail.value,
        num: e.detail.value.length
      })
    } else {
      this.setData({
        num: e.detail.value.length,
        str: e.detail.value
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.request({
      url: app.globalData.url + '/userTeachersRecommend/findUserTeachersRecommendByToken',
      data: {
        userToken: app.globalData.userToken
      },
      success: function(res) {
        if (res.statusCode === 200) {
          if (res.data.code === 0) {
            that.setData({
              str: res.data.data.teachersRecommend,
              isWrite: 1,
              num: res.data.data.teachersRecommend.length
            })
          }
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