// pages/certificate/certificate.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textIsShow: 'add',
    isShow: 'hideImg',
    uploadSrc: null,
    tempFile: null,
    change:'save',
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
  saveCertificate() {
    var that = this
    if (that.data.tempFile !== null) {
      wx.request({
        url: app.globalData.url + '/schoolCertificate/findSchoolCertificateByUser',
        data: {
          userToken: app.globalData.userToken
        },
        success: function(res) {
          if (res.data.data === null) {
            wx.uploadFile({
              url: app.globalData.url + '/schoolCertificate/save',
              filePath: that.data.tempFile[0],
              name: 'photoFiles',
              header: {
                "Content-Type": "multipart/form-data"
              },
              formData: {
                userToken: app.globalData.userToken
              },
              success: function(res) {
                wx.showToast({
                  title: '上传成功',
                  icon: 'success',
                  duration: 2000
                })
              }
            })
          } else {
            wx.uploadFile({
              url: app.globalData.url + '/schoolCertificate/update',
              filePath: that.data.tempFile[0],
              name: 'photoFiles',
              header: {
                "Content-Type": "multipart/form-data"
              },
              formData: {
                userToken: app.globalData.userToken,
                schoolCertificateId: res.data.data.schoolCertificate
              },
              success: function(res) {
                if (res.statusCode === 200) {
                  wx.showToast({
                    title: '修改成功',
                    icon: 'success',
                    duration: 2000
                  })
                }
              }
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '你未修改图片',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 选择图片
  selectImg() {
    var that = this
    wx.chooseImage({
      count: 1,
      success: function(res) {
        that.setData({
          textIsShow: 'hideImg',
          isShow: '',
          uploadSrc: res.tempFilePaths,
          tempFile: res.tempFilePaths
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.request({
      url: app.globalData.url + '/schoolCertificate/findSchoolCertificateByUser',
      data: {
        userToken: app.globalData.userToken
      },
      success: function(res) {
        if (res.data.data !== null) {
          that.setData({
            textIsShow: 'hideImg',
            isShow: '',
            uploadSrc: app.globalData.url + '/resources/findResourcesById?id=' + res.data.data.schoolCertificate
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