// pages/recharge/recharge.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag: [
      { id: 50, name: 5 },
      { id: 100, name: 10 },
      { id: 200, name: 20 },
      { id: 300, name: 30 },
      { id: 500, name: 50 },
      { id: 1000, name: 100 },
    ],
    tar:9999,
    price:'',
    detail:[],
    ids:'',
    userinfo:'',
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
        console.log(res.data)
        that.setData({
          userinfo: res.data
        })
      },
    })
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
  pay:function(){
    var that =this;
    if(that.data.ids == ''){
      wx.showToast({
        title: '请选择艺呗',
        icon:'none'
      })
    }else{
      if(that.data.userinfo.isIosPay == 1){
        wx.showToast({
          title: '由于相关规定，ios功能暂不可用',
          icon:'none'
        })
      }else{
        wx.request({
          url: app.data.urlevent + "/appbattelpay/xcxpay.do",
          data: {
            token: wx.getStorageSync('token'),
            id: that.data.ids
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          dataType: 'json',
          success: function (res) {
            if (res.data.status === 100) {
              wx.requestPayment({
                timeStamp: res.data.data.sign.timeStamp,
                nonceStr: res.data.data.sign.nonceStr,
                package: res.data.data.sign.package,
                signType: 'MD5',
                paySign: res.data.data.sign.paySign,
                success(res) {
                  wx.showToast({
                    title: '充值成功',
                    icon: 'none',
                    duration: 1000
                  })
                  that.getuser();
                },
                fail(res) {
                  wx.showToast({
                    title: '支付失败',
                    icon: 'none',
                    duration: 1000
                  })
                }
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
    }
  },
  //价格选择
  chact: function (e) {
    var that = this;
    that.setData({
      tar: e.currentTarget.dataset.index,
      ismon: true,
      ids: e.currentTarget.id
    })
  },
  getdetail: function () {
    var that = this;
    wx.request({
      url: app.data.urlevent + "/appuser/yibeiprice.do",
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
  //用户信息
  getuser: function () {
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
})