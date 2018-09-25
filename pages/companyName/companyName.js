// pages/companyName/companyName.js
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
  getLength: function (content) {
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
  saveCompany(){
    if (this.data.str.length > 0) {
      app.globalData.company = this.data.str
      app.globalData.companyWriteStatus = 1
      wx.navigateBack({
        delta: 1
      })
    }else{
      wx.showToast({
        title: '你未填写信息',
        icon: 'none',
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.companyName !== undefined && options.companyName.length > 0){
      this.setData({
        str: options.companyName
      })
    }
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
    app.globalData.returnWork = 1
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
    app.globalData.workExperience = 1
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