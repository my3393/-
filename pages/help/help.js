// pages/help/help.js
var util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     id:'',
     ids:'',
     detail:'',
    players: [],
    choo: '10000',
    price: 0,
    name: '',
    chooid: '',
    time:'',
    is:'',
    userinfo:'',
    isart:true,
    isgift:true,
    recegift:''
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this;
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    console.log(time)
    // 再通过setData更改Page()里面的data，动态更新页面的数据
     console.log(options)
     that.setData({
       id:options.id,
       
       time: time
     })
     that.getdetail();
     that.getplayer();
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
  que:function(){
    var that = this;
    this.setData({
      isgift: !that.data.isgift,
    })
    that.getuser();
  },
  cance:function(){
    var that = this;
    wx.navigateTo({
      url:'../my-help/my-help'
    })
    that.setData({
      isart: !that.data.isart,
    })
    that.getuser();
  },
  deter: function () {
    var that = this;
    this.setData({
      isart: !that.data.isart,
    })
    that.getuser();
  },
  pay:function(){
    var that = this;
   
    if (that.data.chooid == '') {
      wx.showToast({
        title: '请先选择礼物',
        icon: 'none'
      })
    } else {
      wx.request({
        url: app.data.urlevent + "/appcomeptitionplayer/addrefuel.do",
        data: {
          token: wx.getStorageSync('token'),
          playerId: that.data.ids,
          giftId: that.data.chooid,
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        dataType: 'json',
        success: function (res) {
          console.log(res.data.data)
          if (res.data.status === 100) {
           
           // that.getuser();
            that.getplayer();
            that.getcanreceivegift();
            
             
             
          } else if (res.data.status === 103) {
            wx.showToast({
              title: '请重新登录',
              icon: 'none'
            })
            wx.navigateTo({
              url: '../login/login',
            })
          } else if (res.data.status === 106) {
            wx.showModal({
              title: '艺呗不足',
              content: '艺呗余额不足可前往我的-艺呗-充值',
              success(res) {
                if (res.confirm) {
                  //  wx.navigateTo({
                  //    url: '../recharge/recharge',
                  //  })

                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
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
  },
  //用户距离下一个礼品票数
  getcanreceivegift: function () {
    var that = this;
    wx.request({
      url: app.data.urlevent + "/appuser/canreceivegift.do",
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
            recegift: res.data.data,
          })
           if(res.data.data.status == 0){

              that.setData({
                isgift:!that.data.isgift,
            })
           }else if(res.data.data.status == 1){
                that.setData({
                  isart: !that.data.isart,
                })
           }
          
         

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
  choose: function (e) {
    console.log(e)
    this.setData({
      chooid: e.currentTarget.id,
      choo: e.currentTarget.dataset.index,
      price: e.currentTarget.dataset.price,
      name: e.currentTarget.dataset.name,
    })
  },
  getplayer: function (e) {
    var that = this;
    wx.request({
      url: app.data.urlevent + "/appcomeptitionplayer/detail.do",
      data: {
        token: wx.getStorageSync('token'),
        userId: that.data.id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status === 100) {
          var date = Date.parse(that.data.time)

          var seasonEndtDate = Date.parse(res.data.data.seasonEndDate.replace(/-/g, '/'))
          var seasonStartDate = Date.parse(res.data.data.seasonStartDate.replace(/-/g, '/'))
          var t3 = date - seasonStartDate;
          var t4 = date - seasonEndtDate;
          if (t3 < 0) {
            that.setData({
              is: 1
            })
          } else if (t3 > 0 && t4 < 0) {
            that.setData({
              is: 2
            })
          } else if (t4 > 0) {
            that.setData({
              is: 3
            })
          }

          that.setData({
            players: res.data.data,
            ids : res.data.data.id
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
  getdetail: function () {
    var that = this;
    wx.request({
      url: app.data.urlevent + "/appcomeptitionplayer/refuelgift.do",
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