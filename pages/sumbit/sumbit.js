// pages/sumbit/sumbit.js
const app = getApp();
var dev_id;
var images=[];
var simages=[];
var post2=''
var post3=''
var post4=''
var dev
Page({

  /**
   * 页面的初始数据
   */
  data: {
   post:'../../images/add.png',
   post2: '../../images/add.png',
   post3: '../../images/add.png',
   post4: '../../images/add.png',
   showlabels:true,
   scope:'',
   name:'',
   intor:'',
   nextList:[],
   pro_id:'',
    area:[],
    tar:999,
   dev_id:'',
   tab:999,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getnextlist();
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
  //赛区选择
  tag:function(e){
    this.setData({
      tar : e.currentTarget.dataset.index, 
      
    })
    dev = e.currentTarget.dataset.name
    dev_id = e.currentTarget.id;
  },
  prov:function(e){
     var that = this;
     console.log(e)
     that.setData({
       area:[],
       tab: e.currentTarget.dataset.index, 
     })

    wx.request({
      url: app.data.urlevent + "/appcompetition/search/area.do",
      data: {
        token: wx.getStorageSync('token'),
        provinceId: e.currentTarget.id
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
            area: res.data.data,
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
  //手机号
  scope: function (e) {  
    this.setData({
        scope: e.detail.value
    })
  },
  //姓名
   name: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  //姓名
  intor: function (e) {
    this.setData({
      intor: e.detail.value
    })
  },
  //选择地区
  choose: function () {
    var that = this;
    that.setData({
      showlabels: !that.data.showlabels,

    })
  },
  //个人照片
  chooseImagess: function (e) {
    var that = this;
    wx.chooseImage({
      count: 5,
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
              if (simages.length == 5) {
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
  //选手封面
  chooseImagess2(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        console.log(res.tempFilePaths[0]);
        var tempFilePaths = res.tempFilePaths;
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
            'token': wx.getStorageSync("token")
          },
          dataType: 'json',
          success(res) {

            let datas = JSON.parse(res.data)
            console.log(datas)
            post2 = datas.data.fileName;
            
            wx.hideLoading();
            // do something
            wx.showToast({
              title: '上传成功',
              icon: 'none'
            })
          }
        })
        that.setData({
          post2: res.tempFilePaths[0]
        })
      }
    })
  },
  //监护人身份证照
  chooseImagess3(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        console.log(res.tempFilePaths[0]);
        var tempFilePaths = res.tempFilePaths;
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
            'token': wx.getStorageSync("token")
          },
          dataType: 'json',
          success(res) {

            let datas = JSON.parse(res.data)
            console.log(datas)
            post3 = datas.data.fileName;

            wx.hideLoading();
            // do something
            wx.showToast({
              title: '上传成功',
              icon: 'none'
            })
          }
        })
        that.setData({
          post3: res.tempFilePaths[0]
        })
      }
    })
  },
  chooseImagess4(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        console.log(res.tempFilePaths[0]);
        var tempFilePaths = res.tempFilePaths;
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
            'token': wx.getStorageSync("token")
          },
          dataType: 'json',
          success(res) {

            let datas = JSON.parse(res.data)
            console.log(datas)
            post4 = datas.data.fileName;

            wx.hideLoading();
            // do something
            wx.showToast({
              title: '上传成功',
              icon: 'none'
            })
          }
        })
        that.setData({
          post4: res.tempFilePaths[0]
        })
      }
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
  submit:function(e){
     var that = this;
    var phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
     if(that.data.dev_id == ''){
        wx.showToast({
          title: '请选择赛区',
          icon:'none'
        })
     }else if(that.data.name == ''){
       wx.showToast({
         title: '请输入名字',
         icon: 'none'
       })
     } else if (that.data.scope == '') {
       wx.showToast({
         title: '请输入手机号',
         icon: 'none'
       })
    } else if (that.data.scope.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }else if (!phonetel.test(that.data.scope)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }else if (that.data.intor == '') {
       wx.showToast({
         title: '请填写个人简介',
         icon: 'none'
       })
     } else if (simages.length < 3) {
       wx.showToast({
         title: '请上传至少3张个人照',
         icon: 'none'
       })
     }else if (post2 == '') {
       wx.showToast({
         title: '请上传选手封面',
         icon: 'none'
       })
     } else if (post3 == '') {
       wx.showToast({
         title: '请上传监护人身份证照',
         icon: 'none'
       })
     }else if (post4 == '') {
       wx.showToast({
         title: '请上传保险凭证',
         icon: 'none'
       })
     }else{
       wx.request({
         url: app.data.urlevent + "/appcompetition/submit/registration.do",
         data: {
           token: wx.getStorageSync('token'),
            competitionAreaId: that.data.dev_id,
            playerName: that.data.name,
            playerCover: post2,
            playerPhoto: simages,
            playerIntroduce: that.data.intor,
            playerPhone: that.data.scope,
            identityCard: post3,
            certificateInsurance: post4,
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
               title: '提交成功可去个人中心查看报名情况',
               icon: 'none'
             })
             wx.navigateBack({
               delta: 1
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
  quxiao: function (e) {
    var that = this;
    
    that.setData({
      showlabels: !that.data.showlabels,
      tar:999,
    })
   
  },
  sure: function (e) {
    var that = this;
      that.setData({
        tar:999,
        dev:dev,
        dev_id:dev_id,
        showlabels: !that.data.showlabels,
      })
    
  },
  getnextlist: function () {
    var that = this;
    wx.request({
      url: app.data.urlevent + "/apparea/nextlist.do",
      data: {
        token: wx.getStorageSync('token'),
        grade:1
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
            nextList: res.data.data,
           
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