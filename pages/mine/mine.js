// pages/mine/mine.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:'',
    isart:true,
    isf:true,
    detail:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      that.getdetail();
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
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
       
        that.setData({
          userinfo: res.data
        })
      },
    })
    this.getuser();
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
    return {
      title: '《明日告白》影视剧组线上海选赛火热进行中，快进来看看吧~',
      path: '/pages/home/home'
    }
  },
  play: function (e) {
    var that = this;
    wx.request({
      url: app.data.urlevent + "/appcomeptitionplayer/detail.do",
      data: {
        token: wx.getStorageSync('token'),
        userId: e.currentTarget.id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status === 100) {
           setTimeout(function(){
             wx.navigateTo({
               url: '../player/player?id=' + e.currentTarget.id,
             })
           },200)
        } else if (res.data.status === 103) {
          wx.showToast({
            title: '请重新登录',
            icon: 'none'
          })
          wx.navigateTo({
            url: '../login/login',
          })
        }
        else if (res.data.status === 104) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })

  },
  //用户信息
  getuser:function(){
    var that = this;
    wx.request({
      url: app.data.urlevent + "/appuser/userinfo.do",
      data: {
        token: wx.getStorageSync('token'),
        
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status === 100) {
          if (res.data.data.user.isReleaseDynamic == 0){          
            that.setData({
              isf:true,
              zhif:true,
            })
          }else if (res.data.data.user.isJoin == 1){
            that.setData({
              isf: false,
            })
          }
          that.setData({
            userinfo: res.data.data.user,
            
          })
          console.log(that.data.userinfo)
          wx.setStorage({
            key: 'token',
            data: res.data.data.token,
          })
          wx.setStorage({
            key: 'userinfo',
            data: res.data.data.user,
          })

        } else if (res.data.status === 103) {
          wx.showToast({
            title: '请重新登录',
            icon: 'none'
          })
          wx.navigateTo({
            url: '../login/login',
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  //查看报名状态
  mysub: function (e) {
    wx.navigateTo({
      url: '../my-submit/my-submit',
    })
  },
  //去报名
  submit: function (e) {
    var that = this;
    console.log(e)
    if(that.data.detail.status == 0){
      wx.showToast({
        title: '报名还未开启',
        icon:'none'
      })
    } else if (that.data.detail.status == 1){
      if(that.data.userinfo.isJoin == 1){
        wx.showToast({
          title: '你已报名',
          icon:'none'
        })
      }else{
        wx.request({
          url: app.data.urlevent + "/appcompetition/isaudit.do",
          data: {
            token: wx.getStorageSync('token'),
            userId: e.currentTarget.id
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          dataType: 'json',
          success: function (res) {
            console.log(res.data.data)
            if (res.data.status === 100) {
              wx.navigateTo({
                url: '../sumbit/sumbit',
              })
              
            } else if (res.data.status === 103) {
              wx.showToast({
                title: '请重新登录',
                icon: 'none'
              })
              wx.navigateTo({
                url: '../login/login',
              })
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none'
              })
            }
          }
        })
      }
       
    }else{
      wx.showToast({
        title: '你来晚了，报名已截止',
        icon: 'none'
      })
    }
  },
  //我的礼品
  gift:function () {
      wx.navigateTo({
        url:'../my-help/my-help'
      })
  },
  //发动态
  dynamic: function () {
    var that = this;
    this.setData({
      isart:!that.data.isart,
    })
  },
  qux:function(){
    var that = this;
    this.setData({
      isart: !that.data.isart,
    })
  },
  cance:function(e){
    wx.navigateTo({
      url: '../dynamic-v/dynamic-v',
    })
    var that = this;
    this.setData({
      isart: !that.data.isart,
    })
  },
  deter: function (e) {
    wx.navigateTo({
      url: '../dynamic/dynamic',
    })
    var that = this;
    this.setData({
      isart: !that.data.isart,
    })
  },
  yule: function (e) {
    //娱乐世界
    wx.navigateToMiniProgram({
      appId: 'wxf556b39ee9c934b4',
      path: 'pages/funcicle/funcicle',
      extraData: {

      },
      envVersion: 'release',
      success(res) {
        // 打开成功
      }
    })

  },
  //查看粉丝
  fan: function () {
    wx.navigateTo({
      url: '../my-fan/my-fan',
    })
  },
  home:function(){
    wx.redirectTo({
      url: '../home/home',
    })
  },
  //艺呗
  recharge:function(){
    wx.navigateTo({
      url: '../recharge/recharge',
    })
  },
  getdetail:function(){
    var that = this;
    wx.request({
      url: app.data.urlevent + "/appcompetition/detail.do",
      data: {
        token: wx.getStorageSync('token'),
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status === 100) {
          
          that.setData({
            detail: res.data.data,
          })
        } else if (res.data.status === 103) {
          wx.showToast({
            title: '请重新登录',
            icon: 'none'
          })
          wx.navigateTo({
            url: '../login/login',
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
})