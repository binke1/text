// pages/myLabel/myLabel.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    labelArr: [],
    isSelect: false,
    labelsIds: [],
    change: 'save',
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
  selectLabel(e) {
    var id = e.currentTarget.dataset.id
    if (this.data.labelArr[id].isSelect == true) {
      this.setData({
        ["labelArr[" + id + "].isSelect"]: false
      })
      for (var i = 0; i < this.data.labelsIds.length; i++) {
        if (this.data.labelArr[id].id === this.data.labelsIds[i]) {
          this.data.labelsIds.splice(i, 1)
        }
      }
    } else {
      if (this.data.labelsIds.length >= 5) {
        wx.showToast({
          title: '标签不能多于5个',
          icon: 'none',
          duration: 2000
        })
      } else {
        this.setData({
          ["labelArr[" + id + "].isSelect"]: true
        })
        this.data.labelsIds.push(this.data.labelArr[id].id)
      }
    }
  },
  //保存标签
  saveLabel() {
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
      if (app.globalData.jobHunterInfo !== null) {
        if (this.data.labelsIds.length > 0) {
          if (this.data.labelsIds.length > 5) {
            wx.showToast({
              title: '标签不能多于5个',
              icon: 'none',
              duration: 2000
            })
          } else {
            var newLabel = that.data.labelsIds.join(',')
            wx.request({
              url: app.globalData.url + '/jobhunterLabels/save',
              data: {
                userToken: app.globalData.userToken,
                jobhunterId: app.globalData.jobHunterInfo.id,
                labelsIds: newLabel
              },
              success: function(res) {
                wx.showToast({
                  title: '保存成功',
                  icon: 'none',
                  duration: 2000
                })
                wx.request({
                  url: app.globalData.url + '/jobhunterLabels/findLabelsByJobhunter',
                  data: {
                    userToken: app.globalData.userToken,
                    jobHunterId: app.globalData.jobHunterInfo.id
                  },
                  success: function(res) {
                    app.globalData.myLabel = res.data.data
                    setTimeout(function(){
                      wx.navigateBack({
                        delta: 1
                      })
                    },1000)
                  }
                })
              }
            })
          }
        } else {
          wx.showToast({
            title: '你未选择标签',
            icon: 'none',
            duration: 2000
          })
        }
      } else {
        wx.showToast({
          title: '请先将教育经历信息填写后再试',
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
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    wx.request({
      url: app.globalData.url + '/labels/findLabelsList',
      data: {
        userToken: app.globalData.userToken
      },
      success: function(res) {
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].isSelect = false
          res.data.data[i].labelId = i
        }
        var newArr = res.data.data
        if (app.globalData.myLabel !== null) {
          for (var i = 0; i < app.globalData.myLabel.length; i++) {
            for (var j = 0; j < newArr.length; j++) {
              if (newArr[j].id === app.globalData.myLabel[i].id) {
                newArr[j].isSelect = true
                that.data.labelsIds.push(newArr[j].id)
              }
            }
          }
        }
        that.setData({
          labelArr: newArr
        })
        wx.hideLoading()
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