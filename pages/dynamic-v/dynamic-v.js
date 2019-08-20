// pages/dynamic/dynamic.js
const app = getApp();
var img;
var simages = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post: '../../images/add.png',
    post1: '../../images/add.png',
    showadd: false,
    evedet: '',
    showadd: false,
    showadds: false,
    tvideo: '',
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

    if (that.data.img == '') {
      wx.showToast({
        title: '请上传视频封面',
        icon: 'none'
      })
    } else if (that.data.tvideo == '') {
      wx.showToast({
        title: '请上传视频',
        icon: 'none'
      })
    } else {
      wx.request({
        url: app.data.urlevent + "/appuser/savedynamic.do",
        data: {
          token: wx.getStorageSync('token'),
          fileType: 2,
          content: that.data.evedet,
          filePath: that.data.tvideo,
          fileCover:img
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        dataType: 'json',
        success: function (res) {

          if (res.data.status === 100) {
            wx.showToast({
              title: '发布成功',
              icon: 'none'
            })
            setTimeout(function(){
              wx.redirectTo({
                url: '../mine/mine',
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
      count: 1,
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        console.log(res.tempFilePaths);
        var tempFilePaths = res.tempFilePaths;
       
         
          console.log(1)
          wx.showLoading();
          wx.uploadFile({
            url: app.data.urlevent + '/appfile/xcxfileprogerssupload.do', // 仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
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
              img = datas.data.fileName
              that.setData({
                post1:datas.data.url
              })
              console.log(datas.data.fileName)
            }
          })
       
        that.setData({
          showimg: false
        })
      }
    })
  },
  //视频
  chooseVideo: function (e) {
    var that = this;
    
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        wx.showLoading({
          title: '视频上传中...',
        })
        console.log(res)
        var tempFilePathss = res.tempFilePaths;
        
        if (res.duration < 40) {
          wx.uploadFile({
            url: app.data.urlevent + '/appfile/xcxfileprogerssupload.do', // 仅为示例，非真实的接口地址
            filePath: res.tempFilePath,
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
              console.log(res)
              let datas = JSON.parse(res.data)
              console.log(datas)

              wx.hideLoading();
              wx.showToast({
                title: '上传成功',
                icon: 'success'
              })
              that.setData({
                post:'../../images/plays.png',
                tvideo: datas.data.fileName
              })
            }
          })
        } else {
          wx.showToast({
            title: '请选择20s以内',
            icon: 'none'
          })
         
        }
      }
    })
  },
})