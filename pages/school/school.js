// pages/school/school.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    str:'',
    schoolArr:[],
    change: 'save'
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
  saveSchool(){
    if (this.data.str.length > 0) {
      console.log(app.globalData.eduInfo)
      if (app.globalData.eduInfo !== null) {
        app.globalData.eduInfo.school = this.data.str
      }
      app.globalData.schoolName = this.data.str
      app.globalData.schoolWriteStatus = 1
      wx.navigateBack({
        delta: 1
      })
    } else {
      wx.showToast({
        title: '未填写学校名称',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //获取学校数据
  getLength(e){
    var that=this;
    this.setData({
      str:e.detail.value.trim()
    }); 
    app.globalData.schoolName = e.detail.value.trim()
    if (that.data.str !== " " && that.data.str.length>0){
      wx.request({
        url: app.globalData.url + '/university/findUniversity',
        method: 'POST',
        data: {
          name: that.data.str
        },
        header: { "content-type": "application/x-www-form-urlencoded" },
        success: function (res) {
          if (res.statusCode === 200) {
              that.setData({
                schoolArr: JSON.parse(res.data.data)
              })
          }
        }
      })
    }
  },
  //删除输入内容
  clearValue(){
    this.setData({
      str:null,
      schoolArr:[]
    })
  },
  //点击获取学校名称
  getSchoolName(e){
    this.setData({
      str:e.currentTarget.dataset.name,
      schoolArr:[]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log()
    if (options.schoolName !== undefined && options.schoolName.length > 0){
      this.setData({
        str: options.schoolName
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
    app.globalData.editTime = 1
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