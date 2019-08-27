//index.js
//获取应用实例
const app = getApp()
let images=[];
let simages=[];
let url
Page({
  data: {
    src: '',
    isshow:true,
    iss:false,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    post:'../../images/add.png',
  },
  cut() {
    var that = this;
    this.selectComponent('#imgcut').cut().then(r => {
      // wx.previewImage({
      //   urls: [r],
      // })
      url = r
      wx.uploadFile({
        url: app.data.urlevent + '/appfile/xcxfileprogerssupload.do', // 仅为示例，非真实的接口地址
        filePath:url ,
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
          that.setData({
    
            isshow: !that.data.isshow,
            iss:!that.data.iss
          })
          wx.showToast({
            title: '上传成功',
            icon: 'none'
          })
          images.push(datas.data.url)
          simages.push(datas.data.fileName)
          // do something
          console.log(simages)
          if (simages.length == 5) {
            that.setData({
              showadd: !that.data.showadd
            })
          }
            that.setData({
              imgs: images,
              showimg: false
            })
        }
      })
      
    }).catch(e => {
      wx.showModal({
        title: '',
        content: e.errMsg,
        showCancel: false
      })
    })
  },
  handleImagePreview(e) {
    var that = this;
    const idx = e.target.dataset.idx
    const images = that.data.imgs
    console.log(simages[idx])
    wx.previewImage({
      current: images[idx],  //当前预览的图片
      urls: images,  //所有要预览的图片
    })
  },
  choose() {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        this.setData({
          src: res.tempFilePaths[0]
        })
      },
    })
  },

   //个人照片
   chooseImagess: function (e) {
   
    var that = this;      
          // wx.uploadFile({
          //   url: app.data.urlevent + '/appfile/xcxfileprogerssupload.do', // 仅为示例，非真实的接口地址
          //   filePath:url ,
          //   name: 'file',
          //   header: {
          //     "Content-Type": "multipart/form-data",
          //     'accept': 'application/json',
          //   },
          //   formData: {
          //     'token': wx.getStorageSync('token')
          //   },
          //   dataType: 'json',
          //   success(res) {
          //     let datas = JSON.parse(res.data)
          //     console.log(datas)
          //     that.setData({
        
          //       isshow: !that.data.isshow,
          //       iss:!that.data.iss
          //     })
          //     wx.showToast({
          //       title: '上传成功',
          //       icon: 'none'
          //     })
              
          //     simages.push(datas.data.fileName)
          //     // do something
          //     console.log(simages)
          //     if (simages.length == 5) {
          //       that.setData({
          //         showadd: !that.data.showadd
          //       })
          //     }
          //   }
          // })
        // that.setData({
        //   imgs: images,
        //   showimg: false
        // })
     that.setData({
      isshow: !that.data.isshow,
      iss:!that.data.iss
     })


  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
