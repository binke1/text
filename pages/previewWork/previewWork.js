// pages/previewWork/previewWork.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workArr:[],
    change: 'save',
    saveClickNum: 0,
    isShowAddBtn:true
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
  addWork(){
    app.globalData.returnWork = 1
    var that = this
    if (that.data.saveClickNum === 0) {
      that.setData({
        saveClickNum: 1
      })
      setTimeout(function () {
        that.setData({
          saveClickNum: 0
        })
      }, 1000)
      wx.navigateTo({
        url: './../workExperience/workExperience',
      })
    }
  },
  editWork(e){
    app.globalData.returnWork = 1
    var that = this
    if (that.data.saveClickNum === 0) {
      that.setData({
        saveClickNum: 1
      })
      setTimeout(function () {
        that.setData({
          saveClickNum: 0
        })
      }, 1000)
      wx.navigateTo({
        url: './../workExperience/workExperience?id=' + e.currentTarget.dataset.id,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.request({
      url: app.globalData.url + '/userWork/findUserWorkByToken',
      data: {
        userToken: app.globalData.userToken
      },
      success: res => {
        if (res.statusCode === 200 && res.data.code === 0) {
          if (res.data.data.length > 0) {
            this.setData({
              workArr: res.data.data
            })
            if(res.data.data.length >= 3){
              this.setData({
                isShowAddBtn:false
              })
            }else{
              this.setData({
                isShowAddBtn: true
              })
            }
          } else {
            wx.navigateTo({
              url: './../workExperience/workExperience',
            })
          }
        } else if (res.statusCode === 200 && res.data.code === 1) {
          wx.navigateTo({
            url: './../workExperience/workExperience',
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})