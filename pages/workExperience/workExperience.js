// pages/workExperience/workExperience.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    change: 'save',
    del: 'save',
    isWrite: 0,
    saveClickNum: 0,
    date1: null,
    datew: null,
    isWork: false,
    companyName: '',
    positionName: '',
    startDate: '',
    endDate: '',
    workContent: '',
    addArr: [],
    workId: null,
    isShowDel: false,
    workArrLength: 0
    // addArrClass:'addWork',
  },
  // addWork(){
  //   this.data.addArr.push(obj)
  //   this.setData({
  //     addArr:this.data.addArr
  //   })
  //   if(this.data.addArr.length >= 2){
  //     this.setData({
  //       addArrClass: 'hideAddWork'
  //     })
  //   }
  // },
  clickCompany() {
    app.globalData.workExperience = 0
    app.globalData.company = 1
    wx.navigateTo({
      url: './../companyName/companyName?companyName=' + this.data.companyName,
    })
  },
  clickPosition() {
    app.globalData.position = 2
    app.globalData.positionName = 0
    if (this.data.positionName !== '') {
      wx.navigateTo({
        url: './../positionName/positionName?positionName=' + this.data.positionName,
      })
    } else {
      wx.navigateTo({
        url: './../positionName/positionName',
      })
    }
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
  changButton1() {
    this.setData({
      del: 'savePress'
    })
  },
  reductionButton1() {
    this.setData({
      del: 'save'
    })
  },
  //用户删除工作经历事件
  deleteWorkExperience() {
    var that = this
    wx.showModal({
      title: '删除',
      content: '你确定删除该项工作经历吗?',
      confirmColor: '#00c882',
      success: res => {
        if (res.confirm === true) {
          wx.request({
            url: app.globalData.url + '/userWork/delete?userToken=' + app.globalData.userToken + '&id=' + this.data.workId,
            // data:{
            //   userToken:app.globalData.userToken,
            //   id: this.data.workId
            // },
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            method: 'DELETE',
            success: res1 => {
              if (res1.statusCode === 200 && res1.data.code === 0) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                })
                app.globalData.returnWork = 0
                if (this.data.workArrLength > 1) {
                  setTimeout(function() {
                    wx.navigateBack({
                      delta: 1
                    })
                  }, 1000)
                } else if (that.data.workArrLength === 1) {
                  that.data.workArrLength = 0
                  setTimeout(function() {
                    wx.navigateTo({
                      url: './../editData/editData',
                    })
                  }, 1000)
                }
              }
            }
          })
        }
      }
    })
  },
  bindDateChange1: function(e) {
    var selectDate1 = e.detail.value.split('-')[0] + '.' + Number(e.detail.value.split('-')[1])
    this.setData({
      startDate: selectDate1
    })
  },
  bindDateChange2: function(e) {
    var selectDate2 = e.detail.value.split('-')[0] + '.' + Number(e.detail.value.split('-')[1])
    this.setData({
      endDate: selectDate2
    })
  },
  saveWorkExperience() {
    if (this.data.companyName.length > 0 && this.data.positionName.length > 0 && this.data.startDate.length > 0 && this.data.endDate.length > 0 && this.data.workContent.length > 0) {
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
        if (that.data.isWork === true) {
          wx.request({
            url: app.globalData.url + '/userWork/update',
            data: {
              userToken: app.globalData.userToken,
              id: that.data.workId,
              startTime: that.data.startDate.split('.')[0] + '-' + (Number(that.data.startDate.split('.')[1]) + 1),
              endTime: that.data.endDate.split('.')[0] + '-' + (Number(that.data.endDate.split('.')[1]) + 1),
              workExperience: that.data.workContent,
              companyName: that.data.companyName,
              position: that.data.positionName
            },
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            method: 'POST',
            success: function(res) {
              if (res.statusCode === 200 && res.data.code === 0) {
                wx.showToast({
                  title: '修改成功',
                  icon: 'success',
                  duration: 2000
                })
                app.globalData.returnWork = 0
                setTimeout(function() {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 1000)
              } else if (res.data.code === 2) {
                wx.showToast({
                  title: '修改失败',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
        } else {
          wx.request({
            url: app.globalData.url + '/userWork/save',
            data: {
              userToken: app.globalData.userToken,
              startTime: that.data.startDate.split('.')[0] + '-' + (Number(that.data.startDate.split('.')[1]) + 1),
              endTime: that.data.endDate.split('.')[0] + '-' + (Number(that.data.endDate.split('.')[1]) + 1),
              workExperience: that.data.workContent,
              companyName: that.data.companyName,
              position: that.data.positionName
            },
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            method: 'POST',
            success: function(res) {
              if (res.statusCode === 200 && res.data.code === 0) {
                wx.showToast({
                  title: '保存成功',
                  icon: 'success',
                  duration: 2000
                })
                app.globalData.returnWork = 0
                if (that.data.workArrLength === 0) {
                  setTimeout(function() {
                    wx.navigateTo({
                      url: './../previewWork/previewWork',
                    })
                  }, 1000)
                } else {
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
    } else {
      wx.showToast({
        title: '请将信息补充完整',
        icon: 'none',
        duration: 2000
      })
    }
  },
  contentChange(e) {
    var len = e.detail.value.length
    if (len > 300) {
      e.detail.value = e.detail.value.slice(0, 300)
      this.setData({
        workContent: e.detail.value,
        num: e.detail.value.length
      })
    } else {
      this.setData({
        num: e.detail.value.length,
        workContent: e.detail.value
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.workId = options.id
    if (options.id !== undefined) {
      var that = this
      wx.request({
        url: app.globalData.url + '/userWork/findUserWorkByToken',
        data: {
          userToken: app.globalData.userToken
        },
        success: function(res) {
          if (res.statusCode === 200 && res.data.code === 0) {
            if (res.data.data !== null && res.data.data.length > 0) {
              that.data.workArrLength = res.data.data.length
              for (let i = 0; i < res.data.data.length; i++) {
                if (res.data.data[i].id == options.id) {
                  that.data.addArr.push(res.data.data[i])
                  var startTimeArr = res.data.data[i].startTime.split('.')
                  var endTimeArr = res.data.data[i].endTime.split('.')
                  var startTime = startTimeArr[0] + '.' + (Number(startTimeArr[1]))
                  var endTime = endTimeArr[0] + '.' + (Number(endTimeArr[1]))
                  that.setData({
                    isWork: true,
                    isShowDel: true,
                    companyName: res.data.data[i].companyName,
                    positionName: res.data.data[i].position,
                    startDate: startTime,
                    endDate: endTime,
                    workContent: res.data.data[i].workExperience,
                    date1: startTimeArr[i] + '-' + (Number(startTimeArr[1])),
                    date2: endTimeArr[i] + '-' + (Number(endTimeArr[1])),
                    num: res.data.data[i].workExperience.length
                  })
                }
              }
            }
          } else if (res.data.code === 1) {
            var nowDate = new Date()
            that.setData({
              date1: nowDate.getFullYear() + '.' + (nowDate.getMonth() + 1),
              date2: nowDate.getFullYear() + '.' + (nowDate.getMonth() + 1),
            })
          }
        }
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
    var backpage = getCurrentPages().reverse()
    var path;
    for (let i = 0; i < backpage.length;i++){
      if (backpage[i].route == 'pages/editData/editData'){
        path = i
      }
    }
    if (app.globalData.returnWork === 0) {
      wx.navigateBack({
        delta: path
      })
    }
    setTimeout(function(){

      app.globalData.returnWork = 0
    },200)
    if (this.data.workId !== undefined || app.globalData.companyWriteStatus === 1) {
      app.globalData.companyWriteStatus = 0
      if (app.globalData.company.length > 0) {
        this.setData({
          companyName: app.globalData.company
        })
      }
    }
    if (this.data.workId !== undefined || app.globalData.positionWriteStatus === 1) {
      app.globalData.positionWriteStatus = 0
      if (app.globalData.position.length > 0) {
        this.setData({
          positionName: app.globalData.position
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    if (app.globalData.workExperience === 1 && this.data.workArrLength >= 1 && app.globalData.positionName === 1) {
      wx.navigateBack({
        delta: 1
      })
      app.globalData.workExperience = 0
      app.globalData.positionName = 0
    }
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