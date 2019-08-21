// pages/dynamic/dynamic.js
const app = getApp();
var images = [];
var simages = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post:'../../images/add.png',
    showadd:false,
    evedet:'',
    ok:true,
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
    return {
      title: '《明日告白》影视剧组线上海选赛火热进行中，快进来看看吧~',
      path: '/pages/home/home'
    }
  },
  submit: function () {
    var that = this;
    if (that.data.ok) {    //判断ok，初始化是true所以会执行，
      that.setData({       //进去之后设置为false这样后面再点击就没有用了
        ok: false,
      })
   
    if (simages.length > 5) {
      wx.showToast({
        title: '请上传不超过5张照片',
        icon: 'none'
      })
    } else{
      wx.request({
        url: app.data.urlevent + "/appuser/savedynamic.do",
        data: {
          token: wx.getStorageSync('token'),
          fileType: 1,
          content: that.data.evedet,
          filePath: simages,
         
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        dataType: 'json',
        success: function (res) {
        
          if (res.data.status === 100) {
            that.setData({       
              ok: true,
            })
            wx.showToast({
              title: '发布成功',
              icon: 'none'
            })
             wx.redirectTo({
               url: '../mine/mine',
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
    } 
  },
  //介绍
  evedetail: function (e) {
    this.setData({
      evedet: e.detail.value
    })
  },
  //个人照片
  chooseImagess: function (e) {
    var that = this;
    wx.chooseImage({
      count: 6,
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        console.log(res.tempFilePaths);
        var tempFilePaths = res.tempFilePaths;
        for (var i in tempFilePaths) {
          images.push(tempFilePaths[i])
          console.log(1)
          wx.showLoading();
          wx.uploadFile({
            url: app.data.urlevent + '/appfile/xcxfileprogerssupload.do', // 仅为示例，非真实的接口地址
            filePath: tempFilePaths[i],
            name: 'file',
            header: {
              "Content-Type": "multipart/form-data",
              'accept': 'application/json',
            },
            formData: {
              'token': wx.getStorageSync('token')
            },
            dataType: 'json',
            success(res) {
              let datas = JSON.parse(res.data)
              console.log(datas)
              wx.hideLoading();
              wx.showToast({
                title: '上传成功',
                icon: 'none'
              })
              simages.push(datas.data.fileName)
              // do something
              console.log(simages)
              if (simages.length == 6) {
                that.setData({
                  showadd: !that.data.showadd
                })
              }
            }
          })


        }
        that.setData({
          imgs: images,
          showimg: false
        })
      }
    })
  },
})