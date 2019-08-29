// pages/my-help/my-help.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     isgift:true,
     vote:'',
     detail:'',
     nogift:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getvote();
     this.getcanreceivegift();
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

  },
  //领取
  receive:function(){
    var that = this;
    that.getdetail();
  },
  cance:function(){
    var that = this;
    that.setData({
      isgift:!that.data.isgift
    })
  },
  que:function(){
    var that = this;
    
      wx.navigateTo({
        url:'../receive/receive'
      })
      that.setData({
        isgift:!that.data.isgift
      })
   
    
   
  },
  getdetail: function () {
    var that = this;
    wx.request({
      url: app.data.urlevent + "/appuser/currentreceivegift.do",
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
          that.setData({
            isgift:!that.data.isgift
          })

        } else if (res.data.status === 103) {
          wx.showToast({
            title: '请重新登录',
            icon: 'none'
          })
          wx.navigateTo({
            url: '../login/login',
          })
        }else if (res.data.status === 107) {
          // wx.showToast({
          //   title: '未达到领取资格，去为选手助力吧',
          //   icon: 'none'
          // })
          that.setData({
            nogift:!that.data.nogift
          })
         
        }else if (res.data.status === 108) {
          wx.showToast({
            title: '赛季结束才能领取哦',
            icon: 'none'
          })
         
        }  else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  gohelp:function(){
    var that = this;
    wx.navigateTo({
      url:'../home/home?idx=' + 1 + '&tar=' + 1,
    })
    that.setData({
      nogift:true,
    })
  },
  getvote: function () {
    var that = this;
    wx.request({
      url: app.data.urlevent + "/appuser/usertotalvote.do",
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
              vote: res.data.data,
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