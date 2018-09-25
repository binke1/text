// pages/editData/editData.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowImg: 'hideImg',
    isShowImg1: 'hideImg',
    isShowImg2: 'hideImg',
    isShowImg3: 'hideImg',
    isShowImg4: 'hideImg',
    isShowImg5: 'hideImg',
    isShowIcon: 'showIcon',
    isShowIcon1: 'showIcon',
    isShowIcon2: 'showIcon',
    isShowIcon3: 'showIcon',
    isShowIcon4: 'showIcon',
    isShowIcon5: 'showIcon',
    constellation: null,
    age: null,
    imgArr: [],
    photoIdArr: [],
    nickName:null,
    national:null,
    birthday:null,
    politicalLandscape:null,
    englishLevel:null,
    getPath:'./../workExperience/workExperience',
    eduPath:'./../time/time'
  },
  clickTime(){
    app.globalData.editTime = 1
  },
  commonUpload(tempFile) {
    var that = this
    wx.uploadFile({
      url: app.globalData.url + '/photo/save',
      filePath: tempFile,
      name: 'photoFile',
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: {
        userToken: app.globalData.userToken
      },
      success: function(res) {
        that.data.imgArr.push(tempFile)
        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  commonUpdata(tempFile, id) {
    wx.uploadFile({
      url: app.globalData.url + '/photo/update',
      filePath: tempFile,
      name: 'photoFile',
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: {
        userToken: app.globalData.userToken,
        id: id
      },
      success: function(res) {
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  //大图片上传
  uploadImg() {
    var that = this
    wx.chooseImage({
      count: 1,
      success: function(res) {
        that.setData({
          img: res.tempFilePaths,
          isShowImg: 'showImg',
          isShowIcon: 'hideIcon'
        })
        var tempFile = res.tempFilePaths[0]
        if (that.data.imgArr.length >= 1) {
          that.commonUpdata(tempFile, that.data.photoIdArr[0])
        } else {
          that.commonUpload(tempFile)
        }
      },
    })
  },
  //右上第一个小图片上传
  uploadImg1() {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      success: function(res) {
        that.setData({
          img1: res.tempFilePaths,
          isShowImg1: 'showImg',
          isShowIcon1: 'hideIcon'
        })
        var tempFile = res.tempFilePaths[0]
        if (that.data.imgArr.length >= 2) {
          that.commonUpdata(tempFile, that.data.photoIdArr[1])
        } else {
          that.commonUpload(tempFile)
        }
      },
    })
  },
  //右上第二个小图片上传
  uploadImg2() {
    var that = this
    wx.chooseImage({
      count: 1,
      success: function(res) {
        that.setData({
          img2: res.tempFilePaths,
          isShowImg2: 'showImg',
          isShowIcon2: 'hideIcon'
        })
        var tempFile = res.tempFilePaths[0]
        if (that.data.imgArr.length >= 3) {
          that.commonUpdata(tempFile, that.data.photoIdArr[2])
        } else {
          that.commonUpload(tempFile)
        }
      },
    })
  },
  //底部左一小图片上传
  uploadImg3() {
    var that = this
    wx.chooseImage({
      count: 1,
      success: function(res) {
        that.setData({
          img3: res.tempFilePaths,
          isShowImg3: 'showImg',
          isShowIcon3: 'hideIcon'
        })
        var tempFile = res.tempFilePaths[0]
        if (that.data.imgArr.length >= 4) {
          that.commonUpdata(tempFile, that.data.photoIdArr[3])
        } else {
          that.commonUpload(tempFile)
        }
      },
    })
  },
  //底部左二小图片上传
  uploadImg4() {
    var that = this
    wx.chooseImage({
      count: 1,
      success: function(res) {
        that.setData({
          img4: res.tempFilePaths,
          isShowImg4: 'showImg',
          isShowIcon4: 'hideIcon'
        })
        var tempFile = res.tempFilePaths[0]
        if (that.data.imgArr.length >= 5) {
          that.commonUpdata(tempFile, that.data.photoIdArr[4])
        } else {
          that.commonUpload(tempFile)
        }
      },
    })
  },
  //底部左三小图片上传
  uploadImg5() {
    var that = this
    wx.chooseImage({
      count: 1,
      success: function(res) {
        that.setData({
          img5: res.tempFilePaths,
          isShowImg5: 'showImg',
          isShowIcon5: 'hideIcon'
        })
        var tempFile = res.tempFilePaths[0]
        if (that.data.imgArr.length >= 6) {
          that.commonUpdata(tempFile, that.data.photoIdArr[5])
        } else {
          that.commonUpload(tempFile)
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.request({
      url: app.globalData.url + '/photo/findPhotoListByUser',
      data: {
        userToken: app.globalData.userToken
      },
      success: function(res) {
        if (res.data.data !== null) {
          for (var i = 0; i < res.data.data.length; i++) {
            that.data.imgArr.push(app.globalData.url + '/resources/findResourcesById?id=' + res.data.data[i].resources)
            that.data.photoIdArr.push(res.data.data[i].id)
          }
          if(that.data.imgArr.length === 1){
            that.setData({
              img: that.data.imgArr[0],
              isShowImg:'showImg',
              isShowIcon:'hideIcon',
              imgArr: that.data.imgArr
            })
          } else if (that.data.imgArr.length === 2){
            that.setData({
              img: that.data.imgArr[0],
              img1: that.data.imgArr[1],
              isShowImg: 'showImg',
              isShowImg1: 'showImg',
              isShowIcon: 'hideIcon',
              isShowIcon1: 'hideIcon',
              imgArr: that.data.imgArr
            })
          } else if (that.data.imgArr.length === 3){
            that.setData({
              img: that.data.imgArr[0],
              img1: that.data.imgArr[1],
              img2: that.data.imgArr[2],
              isShowImg: 'showImg',
              isShowImg1: 'showImg',
              isShowImg2: 'showImg',
              isShowIcon: 'hideIcon',
              isShowIcon1: 'hideIcon',
              isShowIcon2: 'hideIcon',
              imgArr: that.data.imgArr
            })
          } else if (that.data.imgArr.length === 4){
            that.setData({
              img: that.data.imgArr[0],
              img1: that.data.imgArr[1],
              img2: that.data.imgArr[2],
              img3: that.data.imgArr[3],
              isShowImg: 'showImg',
              isShowImg1: 'showImg',
              isShowImg2: 'showImg',
              isShowImg3: 'showImg',
              isShowIcon: 'hideIcon',
              isShowIcon1: 'hideIcon',
              isShowIcon2: 'hideIcon',
              isShowIcon3: 'hideIcon',
              imgArr: that.data.imgArr
            })
          } else if (that.data.imgArr.length === 5){
            that.setData({
              img: that.data.imgArr[0],
              img1: that.data.imgArr[1],
              img2: that.data.imgArr[2],
              img3: that.data.imgArr[3],
              img4: that.data.imgArr[4],
              isShowImg: 'showImg',
              isShowImg1: 'showImg',
              isShowImg2: 'showImg',
              isShowImg3: 'showImg',
              isShowImg4: 'showImg',
              isShowIcon: 'hideIcon',
              isShowIcon1: 'hideIcon',
              isShowIcon2: 'hideIcon',
              isShowIcon3: 'hideIcon',
              isShowIcon4: 'hideIcon',
              imgArr: that.data.imgArr
            })
          } else if (that.data.imgArr.length === 6){
            that.setData({
              img: that.data.imgArr[0],
              img1: that.data.imgArr[1],
              img2: that.data.imgArr[2],
              img3: that.data.imgArr[3],
              img4: that.data.imgArr[4],
              img5: that.data.imgArr[5],
              isShowImg: 'showImg',
              isShowImg1: 'showImg',
              isShowImg2: 'showImg',
              isShowImg3: 'showImg',
              isShowImg4: 'showImg',
              isShowImg5: 'showImg',
              isShowIcon: 'hideIcon',
              isShowIcon1: 'hideIcon',
              isShowIcon2: 'hideIcon',
              isShowIcon3: 'hideIcon',
              isShowIcon4: 'hideIcon',
              isShowIcon5: 'hideIcon',
              imgArr: that.data.imgArr
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
    if (app.globalData.guanPeiShengUserInfo !== null){
      this.setData({
        constellation: app.globalData.guanPeiShengUserInfo.constellation
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    app.globalData.returnWork = 1
    var that = this
    wx.request({
      url: app.globalData.url + '/userWork/findUserWorkByToken',
      data: {
        userToken: app.globalData.userToken
      },
      success: res => {
        if (res.statusCode === 200 && res.data.code === 0) {
          if (res.data.data.length > 0) {
            this.setData({
              getPath: './../previewWork/previewWork'
            })
          }
        }
      }
    })
    wx.request({
      url: app.globalData.url + '/jobHunterEducation/findJobHunterEducationByToken',
      data: {
        userToken: app.globalData.userToken
      },
      success: res => {
        if (res.statusCode === 200 && res.data.code === 0) {
          if (res.data.data.length > 0) {
            this.setData({
              eduPath: './../previewEdu/previewEdu'
            })
          }
        }
      }
    })
    wx.request({
      url: app.globalData.url + '/userDetailedInformation/findUserDetailedInformationByToken',
      data:{
        userToken:app.globalData.userToken
      },
      success:function(res){
        if(res.statusCode === 200 && res.data.code === 0){
          app.globalData.allUserInfo = res.data.data
          if(res.data.data !== null){
            that.setData({
              national: res.data.data.nationality,
              birthday: res.data.data.user.birthday,
              politicalLandscape: res.data.data.politicalStatus,
              englishLevel: res.data.data.englishGrade
            })
          }
        }
      }
    })
    if (app.globalData.guanPeiShengUserInfo !== null) {
      this.setData({
        constellation: app.globalData.guanPeiShengUserInfo.constellation,
        nickName: app.globalData.guanPeiShengUserInfo.name
      })
      if (app.globalData.guanPeiShengUserInfo.age !== undefined) {
        this.setData({
          age: app.globalData.guanPeiShengUserInfo.age
        })
      }
    }else{
      this.setData({
        nickName: app.globalData.userInfo.nickName
      })
    }
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