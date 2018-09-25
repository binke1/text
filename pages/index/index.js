//index.js
//获取应用实例
const app = getApp()
Page({
  //页面数据
  data: {
    myStart: 0,
    myEnd: 0,
    startY:0,
    equipment:'796rpx',
    endY:0,
    // showCode:null,
    // isShowCode:'hideCode',
    array: [{
        className: 'first',
        panelId: 0,
        content: 'userText',
        anima: ''
      },
      {
        className: 'two',
        panelId: 1, 
        content: 'userText',
        anima: ''
      },
      {
        className: 'three',
        panelId: 2,
        content: 'userText',
        anima: ''
      }
    ],
    dataArr: [],
    dataArrNum: 0,
    dataArrNum1: 1,
    dataArrNum2: 2
  },
  //跳转实习岗位
  jumpInternship(e) {
    var that = this
    for(var i=0;i<this.data.dataArr.length;i++){
      if (this.data.dataArr[i].id === e.target.dataset.id){
        app.globalData.positionInfo = this.data.dataArr[i]
        wx.navigateTo({
          url: './../internship/internship?id=' + this.data.dataArr[i].id,
        })
      }
    }
  },
  //触摸开始
  userStart(e) {
    this.setData({
      myStart: e.touches[0].pageX,
      startY: e.touches[0].pageY
    })
  },
  //触摸结束
  userEnd(e) {
    this.setData({
      myEnd: e.changedTouches[0].pageX,
      endY: e.changedTouches[0].pageY
    })
    if (this.data.myEnd - this.data.myStart > 0 && this.data.startY - this.data.endY < 40 && this.data.startY - this.data.endY >- 40) {
      this.scrollRight(e.currentTarget.id)
    } else if (this.data.myEnd - this.data.myStart < 0 && this.data.startY - this.data.endY < 40 && this.data.startY - this.data.endY > - 40) {
      this.scrollLeft(e.currentTarget.id)
    }
  },
  //向右滑动事件
  scrollRight(id) {
    var id = Number(id)
    var that = this;
    this.setData({
      dataArrNum: this.data.dataArrNum - 1,
      dataArrNum1: this.data.dataArrNum,
      dataArrNum2: this.data.dataArrNum + 1
    })
    if (this.data.dataArrNum === -1) {
      this.setData({
        dataArrNum: this.data.dataArr.length - 1,
        dataArrNum1: 0,
        dataArrNum2: 1
      })
    }
    if (this.data.dataArrNum === this.data.dataArr.length - 2) {
      this.setData({
        dataArrNum1: this.data.dataArr.length - 1,
        dataArrNum2: this.data.dataArr.length - 1
      })
    }
    if (id === 0) {
      that.setData({
        'array[0].className': 'two',
        'array[1].className': 'three',
        'array[2].anima': 'ani1',
        'array[1].content': 'hideContent',
        'array[1].name': that.data.dataArr[that.data.dataArrNum2].name,
        'array[1].id': that.data.dataArr[that.data.dataArrNum2].id,
        'array[1].briefIntroduction': that.data.dataArr[that.data.dataArrNum2].briefIntroduction,
        'array[2].name': that.data.dataArr[that.data.dataArrNum].name,
        'array[2].id': that.data.dataArr[that.data.dataArrNum].id,
        'array[2].briefIntroduction': that.data.dataArr[that.data.dataArrNum].briefIntroduction,
        'array[0].name': that.data.dataArr[that.data.dataArrNum1].name,
        'array[0].id': that.data.dataArr[that.data.dataArrNum1].id,
        'array[0].briefIntroduction': that.data.dataArr[that.data.dataArrNum1].briefIntroduction
      })
      setTimeout(function() {
        that.setData({
          'array[2].className': 'first1',
          'array[2].content': 'userText',
          'array[0].content': 'hideContent',
          'array[2].anima': '',
        })
      }, 300)
    } else if (id === 1) {
      that.setData({
        'array[1].className': 'two',
        'array[2].className': 'three',
        'array[0].anima': 'ani1',
        'array[2].content': 'hideContent',
        'array[1].name': that.data.dataArr[that.data.dataArrNum1].name,
        'array[1].id': that.data.dataArr[that.data.dataArrNum1].id,
        'array[1].briefIntroduction': that.data.dataArr[that.data.dataArrNum1].briefIntroduction,
        'array[2].name': that.data.dataArr[that.data.dataArrNum2].name,
        'array[2].id': that.data.dataArr[that.data.dataArrNum2].id,
        'array[2].briefIntroduction': that.data.dataArr[that.data.dataArrNum2].briefIntroduction,
        'array[0].name': that.data.dataArr[that.data.dataArrNum].name,
        'array[0].id': that.data.dataArr[that.data.dataArrNum].id,
        'array[0].briefIntroduction': that.data.dataArr[that.data.dataArrNum].briefIntroduction
      })
      setTimeout(function() {
        that.setData({
          'array[0].className': 'first1',
          'array[0].content': 'userText',
          'array[1].content': 'hideContent',
          'array[0].anima': ''
        })
      }, 300)
    } else if (id === 2) {
      that.setData({
        'array[2].className': 'two',
        'array[0].className': 'three',
        'array[1].anima': 'ani1',
        'array[0].content': 'hideContent',
        'array[1].name': that.data.dataArr[that.data.dataArrNum].name,
        'array[1].id': that.data.dataArr[that.data.dataArrNum].id,
        'array[1].briefIntroduction': that.data.dataArr[that.data.dataArrNum].briefIntroduction,
        'array[2].name': that.data.dataArr[that.data.dataArrNum1].name,
        'array[2].id': that.data.dataArr[that.data.dataArrNum1].id,
        'array[2].briefIntroduction': that.data.dataArr[that.data.dataArrNum1].briefIntroduction,
        'array[0].name': that.data.dataArr[that.data.dataArrNum2].name,
        'array[0].briefIntroduction': that.data.dataArr[that.data.dataArrNum2].briefIntroduction,
        'array[0].id': that.data.dataArr[that.data.dataArrNum2].id
      })
      setTimeout(function() {
        that.setData({
          'array[1].className': 'first1',
          'array[1].content': 'userText',
          'array[2].content': 'hideContent',
          'array[1].anima': ''
        })
      }, 300)
    }
  },
  //向左滑动事件
  scrollLeft(id) {
    var id = Number(id)
    var that = this;
    this.setData({
      dataArrNum: this.data.dataArrNum + 1,
      dataArrNum1: this.data.dataArrNum + 2,
      dataArrNum2: this.data.dataArrNum + 3
    })
    if (this.data.dataArrNum === this.data.dataArr.length) {
      this.setData({
        dataArrNum: 0,
        dataArrNum1: 1,
        dataArrNum2: 2
      })
    }
    if (this.data.dataArrNum1 === this.data.dataArr.length) {
      this.setData({
        dataArrNum1: 0,
        dataArrNum2: 1
      })
    }
    if (this.data.dataArrNum2 === this.data.dataArr.length) {
      this.setData({
        dataArrNum2: 0
      })
    }
    if (id === 0) {
      that.setData({
        'array[1].className': 'first',
        'array[2].className': 'two',
        'array[0].anima': 'ani1',
        'array[1].content': 'userText',
        'array[2].content': 'hideContent',
        'array[1].id': that.data.dataArr[that.data.dataArrNum].id,
        'array[1].name': that.data.dataArr[that.data.dataArrNum].name,
        'array[1].briefIntroduction': that.data.dataArr[that.data.dataArrNum].briefIntroduction,
        'array[2].id': that.data.dataArr[that.data.dataArrNum1].id,
        'array[2].name': that.data.dataArr[that.data.dataArrNum1].name,
        'array[2].briefIntroduction': that.data.dataArr[that.data.dataArrNum1].briefIntroduction,
        'array[0].name': that.data.dataArr[that.data.dataArrNum2].name,
        'array[0].id': that.data.dataArr[that.data.dataArrNum2].id,
        'array[0].briefIntroduction': that.data.dataArr[that.data.dataArrNum2].briefIntroduction
      })
      setTimeout(function() {
        that.setData({
          'array[0].className': 'three1',
          'array[0].content': 'hideContent',
          'array[0].anima': ''
        })
      }, 300)
    } else if (id === 1) {
      that.setData({
        'array[2].className': 'first',
        'array[0].className': 'two',
        'array[1].anima': 'ani1',
        'array[0].content': 'hideContent',
        'array[2].content': 'userText',
        'array[2].id': that.data.dataArr[that.data.dataArrNum].id,
        'array[2].name': that.data.dataArr[that.data.dataArrNum].name,
        'array[2].briefIntroduction': that.data.dataArr[that.data.dataArrNum].briefIntroduction,
        'array[0].id': that.data.dataArr[that.data.dataArrNum1].id,
        'array[0].name': that.data.dataArr[that.data.dataArrNum1].name,
        'array[0].briefIntroduction': that.data.dataArr[that.data.dataArrNum1].briefIntroduction,
        'array[1].id': that.data.dataArr[that.data.dataArrNum2].id,
        'array[1].name': that.data.dataArr[that.data.dataArrNum2].name,
        'array[1].briefIntroduction': that.data.dataArr[that.data.dataArrNum2].briefIntroduction
      })
      setTimeout(function() {
        that.setData({
          'array[1].className': 'three1',
          'array[1].content': 'hideContent',
          'array[1].anima': ''
        })
      }, 300)
    } else if (id === 2) {
      that.setData({
        'array[0].className': 'first',
        'array[1].className': 'two',
        'array[2].anima': 'ani1',
        'array[0].content': 'userText',
        'array[1].content': 'hideContent',
        'array[0].name': that.data.dataArr[that.data.dataArrNum].name,
        'array[0].id': that.data.dataArr[that.data.dataArrNum].id,
        'array[0].briefIntroduction': that.data.dataArr[that.data.dataArrNum].briefIntroduction,
        'array[1].id': that.data.dataArr[that.data.dataArrNum1].id,
        'array[1].name': that.data.dataArr[that.data.dataArrNum1].name,
        'array[1].briefIntroduction': that.data.dataArr[that.data.dataArrNum1].briefIntroduction,
        'array[2].id': that.data.dataArr[that.data.dataArrNum2].id,
        'array[2].name': that.data.dataArr[that.data.dataArrNum2].name,
        'array[2].briefIntroduction': that.data.dataArr[that.data.dataArrNum2].briefIntroduction,
      })
      setTimeout(function() {
        that.setData({
          'array[2].className': 'three1',
          'array[2].content': 'hideContent',
          'array[2].anima': ''
        })
      }, 300)
    }
  },
  //转发
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      return {
        title: '管培生',
        path: '/pages/index/index'
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.userInfoReadyCallback = res => {
      app.globalData.userInfo = res.userInfo
    }
    var that = this
    wx.request({
      url: app.globalData.url + '/position/findPositionList',
      success: function (res) {
        if(res.statusCode === 200){
          if(res.data.code === 0){
            that.setData({
              dataArr: res.data.data
            })
            for (var i = 0; i < 3; i++) {
              that.data.array[i].id = res.data.data[i].id
              that.data.array[i].name = res.data.data[i].name
              that.data.array[i].briefIntroduction = res.data.data[i].briefIntroduction
              that.data.array[i].information = res.data.data[i].information
            }
            that.setData({
              array: that.data.array
            })
          }
        }
      }
    })
    this.setData({
      equipment: wx.getSystemInfoSync().windowHeight * (750 / wx.getSystemInfoSync().windowWidth) * 0.85 +'rpx'
    })
  },
  onShow: function () {
    app.globalData.loginJumpIndex = 0
  },
  onReady: function() {
   
  }
})