// pages/my-fan/my-fan.js
const app = getApp();
var detail=[];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:[],
    currentPage:'',
    totalPage:'',
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getdetail();
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
    detail = []
    this.setData({
      detail: []
    })
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
    if (that.data.currentPage == that.data.totalPage) {
      wx.showToast({
        title: '已经到底了哦',
        icon: 'none'
      })
    } else {

      that.setData({
        currentPage: that.data.currentPage + 1,
      })
      that.getdetail();

    }
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
  getdetail: function () {
    var that = this;
    wx.request({
      url: app.data.urlevent + "/appuser/fanslist.do",
      data: {
        token: wx.getStorageSync('token'),
        currentPage:that.data.currentPage, 
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status === 100) {
          for(var i in res.data.data.data){
            detail.push(res.data.data.data[i])
          }
          that.setData({
            detail: detail,
            totalPage: res.data.data.totalPage
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