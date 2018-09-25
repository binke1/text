//app.js
App({
  onLaunch: function() {
    var that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          that.globalData.code = res.code
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // that.globalData.encryptedData = res.encryptedData
              // that.globalData.iv = res.iv
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo
              // that.globalData.guanPeiShengUserInfo = res.userInfo
              wx.request({
                url: that.globalData.url + 　'/weixin/login',
                method: 'POST',
                header: {
                  "content-type": "application/x-www-form-urlencoded"
                },
                data: {
                  code: that.globalData.code,
                  name: res.userInfo.nickName,
                  sex: res.userInfo.gender
                },
                success(res) {
                  if (res.statusCode === 200) {
                    if (res.data.code === 0) {
                      that.globalData.userToken = res.data.data
                      wx.request({
                        url: that.globalData.url + '/user/findUserByToken',
                        data: {
                          userToken: that.globalData.userToken
                        },
                        success: function(res) {
                          if (res.statusCode === 200) {
                            if (res.data.code === 0) {
                              that.globalData.guanPeiShengUserInfo = res.data.data
                              if (res.data.data.birthday !== null) {
                                var nowDate = new Date()
                                var nowYear = nowDate.getFullYear()
                                var birthday = res.data.data.birthday.split('-')[0]
                                that.globalData.s = birthday.slice(2, 3)
                                var age = nowYear - birthday
                                that.globalData.guanPeiShengUserInfo.age = age
                              }
                            }
                          }
                        }
                      })
                      //查询求职者
                      wx.request({
                        url: that.globalData.url + '/jobHunter/findJobHunterByUser',
                        data: {
                          userToken: that.globalData.userToken
                        },
                        success: function(res) {
                          if (res.statusCode === 200) {
                            if (res.data.code === 0) {
                              if(res.data.data !== null){
                                that.globalData.jobHunterInfo = res.data.data
                                //查询用户标签
                                wx.request({
                                  url: that.globalData.url + '/jobhunterLabels/findLabelsByJobhunter',
                                  data: {
                                    userToken: that.globalData.userToken,
                                    jobHunterId: that.globalData.jobHunterInfo.id
                                  },
                                  success: function (res) {
                                    that.globalData.myLabel = res.data.data
                                  }
                                })
                              }
                            }
                          }
                        }
                      })
                      //查询求职者教育信息
                      wx.request({
                        url: that.globalData.url + '/jobHunterEducation/findJobHunterEducationByToken',
                        data: {
                          userToken: that.globalData.userToken
                        },
                        success: function(res) {
                          if (res.statusCode === 200) {
                            if (res.data.code === 0) {
                              if(res.data.data !== null){
                                that.globalData.eduInfo = res.data.data[0]
                                that.globalData.schoolName = res.data.data[0].school
                              }
                            }
                          }
                        }
                      })
                    }
                  }
                }
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: res => {
                  // that.globalData.encryptedData = res.encryptedData
                  // that.globalData.iv = res.iv
                  // 可以将 res 发送给后台解码出 unionId
                  that.globalData.userInfo = res.userInfo
                  wx.request({
                    url: that.globalData.url + '/weixin/login',
                    method: 'POST',
                    header: {
                      "content-type": "application/x-www-form-urlencoded"
                    },
                    data: {
                      code: that.globalData.code,
                      name: res.userInfo.nickName,
                      sex: res.userInfo.gender
                    },
                    success(res) {
                      if (res.statusCode === 200) {
                        if (res.data.code === 0) {
                          that.globalData.userToken = res.data.data
                          wx.request({
                            url: that.globalData.url + '/user/findUserByToken',
                            data: {
                              userToken: that.globalData.userToken
                            },
                            success: function(res) {
                              if (res.statusCode === 200) {
                                if (res.data.code === 0) {
                                  that.globalData.guanPeiShengUserInfo = res.data.data
                                  if (res.data.data.birthday !== null) {
                                    var nowDate = new Date()
                                    var nowYear = nowDate.getFullYear()
                                    var birthday = res.data.data.birthday.split('-')[0]
                                    that.globalData.s = birthday.slice(2, 3)
                                    var age = nowYear - birthday
                                    that.globalData.guanPeiShengUserInfo.age = age
                                  }
                                }
                              }
                            }
                          })
                          //查询求职者
                          wx.request({
                            url: that.globalData.url + '/jobHunter/findJobHunterByUser',
                            data: {
                              userToken: that.globalData.userToken
                            },
                            success: function(res) {
                              if (res.statusCode === 200) {
                                if (res.data.code === 0) {
                                  if(res.data.data !== null){
                                    that.globalData.jobHunterInfo = res.data.data
                                    //查询用户标签
                                    wx.request({
                                      url: that.globalData.url + '/jobhunterLabels/findLabelsByJobhunter',
                                      data: {
                                        userToken: that.globalData.userToken,
                                        jobHunterId: that.globalData.jobHunterInfo.id
                                      },
                                      success: function (res) {
                                        that.globalData.myLabel = res.data.data
                                      }
                                    })
                                  }
                                }
                              }
                            }
                          })
                          //查询求职者教育信息
                          wx.request({
                            url: that.globalData.url + '/jobHunterEducation/findJobHunterEducationByToken',
                            data: {
                              userToken: that.globalData.userToken
                            },
                            success: function(res) {
                              if (res.statusCode === 200) {
                                if (res.data.code === 0) {
                                  if(res.data.data !== null){
                                    that.globalData.eduInfo = res.data.data[0]
                                    that.globalData.schoolName = res.data.data[0].school
                                  }
                                }
                              }
                            }
                          })
                        }
                      }
                    }
                  })
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    guanPeiShengUserInfo: null,
    url: 'https://gpsapi.antup.me',
    // url:'http://192.168.6.199:8080',
    userToken: '',
    jobHunterInfo: null,
    eduExperience: null,
    myLabel: null,
    eduInfo: null,
    schoolName: null,
    editTime: 0,
    workExperience:0,
    positionName:0,
    position:'',
    company:'',
    s: null,
    positionInfo: null,
    code: null,
    loginJumpIndex: 0,
    allUserInfo:null,
    returnWork:0,
    companyWriteStatus:0,//工作经历公司名字写入状态，判断是增加还是编辑
    positionWriteStatus: 0,//工作经历职位名字写入状态，判断是增加还是编辑
    schoolWriteStatus:0,//教育经历学校名字写入状态，判断是增加还是编辑
  }
})