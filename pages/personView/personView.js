// pages/personView/personView.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 500,
    circular: true,
    isShowMentor:false,
    isshowEdu:false,
    isshowAdvantage:false,
    experience:null,
    mentorRecommend:null,
    advantage:null,
    isShowShuffling:false,
    userInfo:'',
    school:'',
    specialty:'',
    educationBackground:'',
    imgUrls: [],
    labelArr:[],
    age:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.url + '/jobHunterEducation/findJobHunterEducationByToken',
      data:{
        userToken:app.globalData.userToken
      },
      success:function(res){
        if(res.statusCode === 200){
          if(res.data.data !== null){
            if (res.data.data.jobHunter.user.birthday !== null){
              var nowDate = new Date()
              var age = nowDate.getFullYear() - res.data.data.jobHunter.user.birthday.split('-')[0]
              that.setData({
                age: age
              })
            }
            that.setData({
              experience: res.data.data.experience,
              school:res.data.data.school,
              specialty: res.data.data.specialty,
              educationBackground: res.data.data.educationBackground,
              isshowEdu:true
            })
          }else{
            that.setData({
              isshowEdu:false,
            })
          }
        }
      }
    })
    wx.request({
      url: app.globalData.url + '/userTeachersRecommend/findUserTeachersRecommendByToken',
      data:{
        userToken:app.globalData.userToken
      },
      success:function(res){
        if(res.statusCode === 200) {
          if(res.data.code === 0){
            that.setData({
              mentorRecommend: res.data.data.teachersRecommend,
              isShowMentor: true
            })
          }else{
            that.setData({
              isShowMentor: false
            }) 
          }
        }
      }
    })
    wx.request({
      url: app.globalData.url +　'/jobHunter/findJobHunterById',
      data:{
        userToken:app.globalData.userToken,
        id: app.globalData.jobHunterInfo.id
      },
      success:function(res){
        if(res.statusCode === 200){
          that.setData({
            userInfo:res.data.data.user
          })
          if(that.data.userInfo.name.length > 6){
            that.data.userInfo.name.slice(0,6)
            that.setData({
              'userInfo.name': that.data.userInfo.name.slice(0, 6) + '...'
            })
          }
          if(res.data.data.advantage!==null){
            that.setData({
              advantage: res.data.data.advantage,
              isshowAdvantage: true
            })
          }else{
            that.setData({
              isshowAdvantage: false
            })
          }
        }
      }
    })
    wx.request({
      url: app.globalData.url + '/photo/findPhotoListByUser',
      data:{
        userToken:app.globalData.userToken
      },
      success:function(res){
        if(res.statusCode === 200){
          if(res.data.code === 0){
            for (var i = 0; i < res.data.data.length; i++) {
              that.data.imgUrls.push(app.globalData.url + '/resources/findResourcesById?id=' + res.data.data[i].resources)
            }
            that.setData({
              imgUrls: that.data.imgUrls,
              isShowShuffling: true
            })
          }
        }
      }
    })
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
    if (app.globalData.myLabel.length > 0){
      this.setData({
        labelArr: app.globalData.myLabel
      })
    }
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