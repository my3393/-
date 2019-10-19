// pages/feedback/feedback.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    evedet:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  //建议
  evedetail: function (e) {
    this.setData({
      evedet: e.detail.value
    })
  },
  sumbit(){
    var that = this;
   if(that.data.evedet == ''){
     wx.showToast({
       title: '请填写建议',
       icon:'none'
     })
   }else{
     wx.request({
       url: app.data.urlevent + "appuser/subfeedback.do",
       data: {
         token: wx.getStorageSync('token'),
         content: that.data.evedet
       },
       method: 'POST',
       header: {
         'content-type': 'application/x-www-form-urlencoded'
       },
       dataType: 'json',
       success: function (res) {
         console.log(res.data.data)
         if (res.data.status === 100) {
           
           wx.showToast({
             title: '提交成功',
             icon: 'none',
             duration:1000
           }) 
           setTimeout(function () {
             wx.navigateTo({
               url: '../home/home',
             })
           }, 1000)
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
  }
})