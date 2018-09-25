// pages/internship/internship.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    userCollStatus: './../../images/collection0.png',
    interval: 5000,
    duration: 500,
    circular: true,
    isShowDetail: 'hideDetailer',
    collNum: '',
    positionInfo: null,
    popUpDetailsObj: {},
    imgUrls: [],
    evalArr: [],
    isShowGuan: 'hideGuan',
    positionId: null,
    isSuccess: '',
    isApply: false,
    clickNum: 0,
    startTime: null,
    endTime: null,
    isColl: null
  },
  //用户提交职位申请
  submitApplication() {
    var that = this
    if (app.globalData.userInfo !== null) {
      if (that.data.isApply === false) {
        if (app.globalData.jobHunterInfo !== null) {
          wx.request({
            url: app.globalData.url + '/jobHunterPosition/save',
            data: {
              userToken: app.globalData.userToken,
              jobHunterId: app.globalData.jobHunterInfo.id,
              positionId: that.data.positionId
            },
            method: 'POST',
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            success: function(res) {
              if (res.statusCode === 200) {
                wx.showToast({
                  title: '申请成功',
                  icon: 'success',
                  duration: 2000
                })
                that.setData({
                  isSuccess: 'subSuccess',
                  isApply: true
                })
              }
            }
          })
        } else {
          if (app.globalData.userInfo !== null) {
            wx.showToast({
              title: '请将个人信息补充完整',
              icon: 'none',
              duration: 2000
            })
            setTimeout(function() {
              wx.navigateTo({
                url: './../editData/editData',
              })
            }, 1000)
          } else {
            wx.showToast({
              title: '请登录',
              icon: 'none',
              duration: 2000
            })
            setTimeout(function() {
              wx.navigateTo({
                url: './../login/login',
              })
            }, 2000)
          }
        }
      } else {
        wx.showToast({
          title: '你已经申请过该职位',
          icon: 'none',
          duration: 2000
        })
      }
    } else {
      wx.showToast({
        title: '你还未登录',
        icon: 'none',
        duration: 2000
      })
    }
  },
  userColl() {
    var that = this;
    if (that.data.isColl !== null) {
      if (this.data.clickNum === 0) {
        that.setData({
          clickNum: that.data.clickNum + 1
        })
        wx.request({
          url: app.globalData.url + '/userPositionLike/updateUserPositionLike',
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          method: 'PUT',
          data: {
            userToken: app.globalData.userToken,
            positionId: app.globalData.positionInfo.id,
            likeStatus: true
          },
          success: function(res) {
            if (res.statusCode === 200) {
              that.setData({
                userCollStatus: './../../images/collection1.png',
                collNum: that.data.collNum + 1
              })
            }
          }
        })
      } else if (this.data.clickNum === 1) {
        that.setData({
          clickNum: that.data.clickNum - 1
        })
        wx.request({
          url: app.globalData.url + '/userPositionLike/updateUserPositionLike',
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          method: 'PUT',
          data: {
            userToken: app.globalData.userToken,
            positionId: app.globalData.positionInfo.id,
            likeStatus: false
          },
          success: function(res) {
            if (res.statusCode === 200) {
              that.setData({
                userCollStatus: './../../images/collection0.png',
                collNum: that.data.collNum - 1
              })
            }
          }
        })
      }
    } else {
      wx.request({
        url: app.globalData.url + '/userPositionLike/save',
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: 'PUT',
        data: {
          userToken: app.globalData.userToken,
          positionId: app.globalData.positionInfo.id,
          likeStatus: true
        },
        success: function (res) {
          if (res.statusCode === 200) {
            that.setData({
              userCollStatus: './../../images/collection1.png',
              collNum: that.data.collNum + 1,
              clickNum: 1,
              isColl:'1'
            })
          }
        }
      })
    }
  },
  // 关闭模态框
  closeDetail() {
    this.setData({
      isShowDetail: 'hideDetailer'
    })
  },
  //弹出详细信息
  popUpDetails(e) {
    var stuId = e.currentTarget.dataset.id
    for (var i = 0; i < this.data.evalArr.length; i++) {
      if (stuId === parseInt(this.data.evalArr[i].id)) {
        var endArr = this.data.evalArr[i].endTime.split("-")
        var startArr = this.data.evalArr[i].startTime.split("-")
        this.setData({
          ['popUpDetailsObj']: this.data.evalArr[i],
          startTime: startArr[0] + "." + startArr[1],
          endTime: endArr[0] + "." + endArr[1]
        })
      }
    }
    this.setData({
      isShowDetail: 'stuDetails'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    this.setData({
      positionInfo: app.globalData.positionInfo,
      positionId: options.id
    })
    wx.request({
      url: app.globalData.url + '/positionPicture/findPositionPictureByPosition',
      data: {
        // userToken: app.globalData.userToken,
        positionId: options.id
      },
      success: function(res) {
        var tempArr = []
        for (var i = 0; i < res.data.data.length; i++) {
          tempArr.push(app.globalData.url + '/resources/findResourcesById?id=' + res.data.data[i].positionPicture)
        }
        that.setData({
          imgUrls: tempArr
        })
      }
    })
    wx.request({
      url: app.globalData.url + '/userPositionLike/findUserPositionLikeByPosition',
      data: {
        // userToken: app.globalData.userToken,
        positionId: options.id
      },
      success: function(res) {
        that.setData({
          collNum: res.data.data
        })
      }
    })
    wx.request({
      url: app.globalData.url + '/successiveGuanPeiSheng/findsuccessiveGuanPeiShengByPosition',
      data: {
        // userToken: app.globalData.userToken,
        id: options.id
      },
      success: function(res) {
        if (res.statusCode === 200) {
          if (res.data.data.length > 0) {
            that.setData({
              evalArr: res.data.data,
              isShowGuan: 'contain-h2'
            })
          }
        }
      }
    })
    wx.request({
      url: app.globalData.url + '/userPositionLike/findUserPositionLike',
      data: {
        userToken: app.globalData.userToken,
        positionId: options.id
      },
      success: function(res) {
        if (res.statusCode === 200) {
          if (res.data.data !== null) {
            if(res.data.data.likeStatus === true){
              that.setData({
                isColl:'1',
                clickNum: 1,
                userCollStatus: './../../images/collection1.png',
              })
            }else{
              that.setData({
                isColl: '1',
                clickNum: 0,
                userCollStatus: './../../images/collection0.png',
              })
            }
          } else {
            that.setData({
              isColl: null,
              clickNum: 0,
              userCollStatus: './../../images/collection0.png',
            })
          }
        }
      }
    })
    if (app.globalData.jobHunterInfo != null) {
      wx.request({
        url: app.globalData.url + '/jobHunterPosition/findPositionByJobHunter',
        data: {
          userToken: app.globalData.userToken,
          jobHunterId: app.globalData.jobHunterInfo.id
        },
        success: function(res) {
          if (res.data.data.length !== 0) {
            for (var i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].id === Number(options.id)) {
                that.setData({
                  isSuccess: 'subSuccess',
                  isApply: true
                })
              }
            }
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