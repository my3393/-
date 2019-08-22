// pages/video/video.js
const app = getApp();
var util = require('../../utils/util.js');

var dynamic = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
   dynamic:[],
   d_currentPage:1,
    isvideo:true,
  },
  //动态
  getdynamic: function (e) {
    var that = this;
    wx.request({
      url: "https://battel.api.xingtu-group.cn/battel-api-service/appcompetition/dynamiclist.do",
      data: {
        token: wx.getStorageSync('token'),
        currentPage: that.data.d_currentPage
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)

        if (res.data.status === 100) {
          for (var i in res.data.data.data) {
            dynamic.push(res.data.data.data[i])
          }

          that.setData({
            dynamic: dynamic,
            d_totalPage: res.data.data.totalPage,
            // dynamicphotos: res.data.data.data.photos
          })
          console.log(that.data.d_totalPage)
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
  //查看视频
  hidevideo: function (e) {
    var that = this;
    console.log(111)
    that.setData({
      isvideo: !that.data.isvideo
    })
  },
  seevideo: function (e) {
    console.log(e)
    console.log(222)
    var that = this;
    that.setData({
      isvideo: !that.data.isvideo,
      play: e.currentTarget.dataset.src
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getdynamic();
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

  }
})