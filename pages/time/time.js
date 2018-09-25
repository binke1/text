// pages/time/time.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordArray: ['中专', '大专', '本科', '硕士', '博士'],
    multiArray: [
      [],
      []
    ],
    textColoe: false,
    proColor: 'fontC',
    multiIndex: [114, 118],
    textNum: 0,
    specialty: '',
    index2: 0,
    index: 0,
    date: '2016-09-01',
    textContent: '',
    experience: '',
    eduInfo: {},
    changeNum: 0,
    change: 'save',
    saveClickNum: 0,
    page: null,
    isEdu:false,
    eduId:null,
    schoolName:'',
    del:'save',
    isShowDel: false,
    eduArrLength:0,
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
  deleteEduInfo() {
    wx.showModal({
      title: '删除',
      content: '你确定删除该项教育经历吗?',
      confirmColor: '#00c882',
      success: res => {
        if (res.confirm === true) {
          wx.request({
            url: app.globalData.url + '/jobHunterEducation/delete?userToken=' + app.globalData.userToken + '&id=' + this.data.eduId,
            // data:{
            //   userToken:app.globalData.userToken,
            //   id: this.data.workId
            // },
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            method: 'DELETE',
            success: res => {
              if (res.statusCode === 200 && res.data.code === 0) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                })
                if (this.data.eduArrLength > 1){
                  setTimeout(function () {
                    wx.navigateBack({
                      delta: 1
                    })
                  }, 1000)
                } else if (this.data.eduArrLength === 1){
                  this.data.eduArrLength = 0
                  setTimeout(function () {
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
  clickSchool() {
    app.globalData.editTime = 0
    wx.navigateTo({
      url: './../school/school?schoolName='+this.data.schoolName,
    })
  },
  changeNum(e) {
    this.setData({
      experience: e.detail.value,
      textNum: e.detail.value.length,
      'eduInfo.experience': e.detail.value
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  school(e) {
    this.setData({
      index: e.detail.value
    })
  },
  professional(e) {
    this.setData({
      'eduInfo.specialty': e.detail.value
    })
  },
  myRecorde(e) {
    this.setData({
      index2: e.detail.value
    })
  },
  periodTime(e) {
    this.setData({
      changeNum: 1,
      multiIndex: e.detail.value,
      'eduInfo.startTime': this.data.multiArray[0][e.detail.value[0]],
      'eduInfo.endTime': this.data.multiArray[1][e.detail.value[1]],
    })
  },
  firstChange(e) {
    var newArr = []
    var firstSelect = this.data.multiArray[0][e.detail.value]
    if (e.detail.column === 0) {
      for (var i = firstSelect + 1; i <= firstSelect + 5; i++) {
        newArr.push(i)
      }
      this.setData({
        'multiArray[1]': newArr
      })
    }
  },
  changColor() {
    this.setData({
      proColor: 'fontC'
    })
  },
  clearClass() {
    this.setData({
      proColor: ''
    })
  },
  //保存教育信息
  saveEdu() {
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
      if (app.globalData.schoolName != null && this.data.eduInfo.specialty != undefined && this.data.eduInfo.experience != undefined) {
        if (app.globalData.schoolName.length > 0 && this.data.eduInfo.specialty.length > 0 && this.data.eduInfo.experience.length > 0) {
          if (that.data.isEdu === false) {
            // if(app.globalData.jobHunterInfo !== null){
            wx.request({
              url: app.globalData.url + '/jobHunterEducation/save',
              method: 'POST',
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              data: {
                userToken: app.globalData.userToken,
                school: app.globalData.schoolName,
                specialty: that.data.eduInfo.specialty,
                educationBackground: that.data.recordArray[that.data.index2],
                startTime: that.data.multiArray[0][that.data.multiIndex[0]] + 1,
                endTime: that.data.multiArray[1][that.data.multiIndex[1]] + 1,
                experience: that.data.eduInfo.experience
              },
              success: function(res) {
                if (res.statusCode === 200) {
                  if (res.data.code === 0) {
                    app.globalData.jobHunterInfo = res.data.data.jobHunter
                    wx.request({
                      url: app.globalData.url + '/jobHunterEducation/findJobHunterEducationByToken',
                      data: {
                        userToken: app.globalData.userToken
                      },
                      success: function(res) {
                        if (res.data.data !== null) {
                          app.globalData.eduInfo = res.data.data[0]
                          app.globalData.schoolName = res.data.data[0].school
                          wx.showToast({
                            title: '保存成功',
                            icon: 'success',
                            duration: 2000
                          })
                          if(that.data.eduArrLength === 0){
                            setTimeout(function () {
                              wx.navigateTo({
                                url: './../previewEdu/previewEdu',
                              })
                            }, 1000)
                          }else{
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
                }
              }
            })
          } else {
            var end;
            if (this.data.changeNum === 0) {
              end = app.globalData.eduInfo.endTime
            } else {
              end = that.data.multiArray[1][that.data.multiIndex[1]]
            }
            wx.request({
              url: app.globalData.url + 　'/jobHunterEducation/update',
              method: 'PUT',
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              data: {
                userToken: app.globalData.userToken,
                school: that.data.schoolName,
                specialty: that.data.eduInfo.specialty,
                educationBackground: that.data.recordArray[that.data.index2],
                startTime: that.data.multiArray[0][that.data.multiIndex[0]] + 1,
                endTime: Number(end) + 1,
                experience: that.data.eduInfo.experience,
                id: that.data.eduId
              },
              success: function(res) {
                if (res.statusCode === 200) {
                  if (res.data.code === 0) {
                    wx.showToast({
                      title: '修改成功',
                      icon: 'success',
                      duration: 2000
                    })
                    app.globalData.eduInfo.school = app.globalData.schoolName
                    app.globalData.eduInfo.experience = that.data.eduInfo.experience
                    app.globalData.eduInfo.educationBackground = that.data.recordArray[that.data.index2]
                    app.globalData.eduInfo.startTime = that.data.multiArray[0][that.data.multiIndex[0]]
                    app.globalData.eduInfo.endTime = end
                    app.globalData.eduInfo.specialty = that.data.eduInfo.specialty
                    that.setData({
                      eduInfo: app.globalData.eduInfo
                    })
                    setTimeout(function() {
                      wx.navigateBack({
                        delta: 1
                      })
                    }, 1000)
                  } else if (res.data.code === 2) {
                    wx.showToast({
                      title: res.data.msg,
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
            title: '请将信息补充完整',
            icon: 'none',
            duration: 2000
          })
        }
      } else {
        wx.showToast({
          title: '请将信息补充完整',
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
    var that = this
    var userDate = new Date();
    that.data.eduId = options.id;
    var nowDate = userDate.getFullYear();
    for (var i = 1900; i <= nowDate; i++) {
      this.data.multiArray[0].push(i)
      // if (i <= 1994) {
      this.data.multiArray[1].push(i)
      // }
    }
    this.setData({
      'multiArray[0]': this.data.multiArray[0],
      'multiArray[1]': this.data.multiArray[1],
      nowDate: nowDate,
      page: options
    })
    wx.request({
      url: app.globalData.url + '/jobHunterEducation/findJobHunterEducationByToken',
      data: {
        userToken: app.globalData.userToken
      },
      success: function(res) {
        if (res.statusCode === 200 && res.data.code === 0) {
          if (res.data.data !== null && res.data.data.length>0) {
            that.data.eduArrLength = res.data.data.length
            for (let m = 0; m < res.data.data.length; m++) {
              if (res.data.data[m].id == options.id) {
                that.setData({
                  isEdu:true,
                  isShowDel:true,
                  eduInfo: res.data.data[m],
                  specialty: res.data.data[m].specialty,
                  textNum: res.data.data[m].experience.length,
                  schoolName: res.data.data[m].school
                })
                for (var j = 0; j < that.data.multiArray[0].length; j++) {
                  if (that.data.multiArray[0][j] === Number(res.data.data[m].startTime)) {
                    that.setData({
                      'multiIndex[0]': j
                    })
                  }
                }
                for (var k = 0; k < that.data.multiArray[1].length; k++) {
                  if (that.data.multiArray[1][k] === Number(res.data.data[m].endTime)) {
                    that.setData({
                      'multiIndex[1]': k
                    })
                  }
                }
                for (var i = 0; i < that.data.recordArray.length; i++) {
                  if (res.data.data[m].educationBackground === that.data.recordArray[i]) {
                    that.setData({
                      index2: i
                    })
                  }
                }
              }
            }
          } else {
            that.setData({
              index2: 2,
              ['eduInfo.startTime']: 2014,
              ['eduInfo.endTime']: 2018
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
    if (this.data.eduId !== undefined || app.globalData.schoolWriteStatus === 1) {
      app.globalData.schoolWriteStatus = 0
      this.setData({
        schoolName: app.globalData.schoolName
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    if (app.globalData.editTime === 1 && this.data.eduArrLength >= 1) {
      wx.navigateBack({
        delta: 1
      })
      app.globalData.editTime === 0
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