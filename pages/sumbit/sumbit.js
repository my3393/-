// pages/sumbit/sumbit.js
const app = getApp();
var dev_id;
var images=[];
var simages=[];
var post2=''
var post3=''
var post4=''
var dev;
let url;
let id;
let province = [];
let citys = [];
let areas = [];
let towns = [];
let province_id = '';
let city_id = '';
let area_id = '';
let town_id = '';
let p_name;
let c_name;
let q_name;
let j_name
Page({

  /**
   * 页面的初始数据
   */
  data: {
   post:'../../images/add.png',
   post2: '../../images/add.png',
   post3: '../../images/add.png',
   post4: '../../images/add.png',
   imgs:[],
   showlabels:true,
 
  
   ishidd:false,
   ishidden:true,
   isshow:true,
   isone:false,
    isshu1:false,
    sex:[
      {name:'男',id:'1'},
      {name:'女',id:'2'}
    ],
    sexs:'',
    day:'',
    isardess: true,
    iscity: true,
    isprov: false,
    isjie:true,
    addres: '',
    x_name:'',
    x_phone:'',
    x_card:'',
    saiid:'',
    orginid:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.getseasondetail();
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
    images = [];
    simages = [];
    post2 = ''
    post3 = ''
    post4 = ''
    this.setData({
      imgs: []
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
  next(){
    let that = this;
    if(that.data.x_name == ''){
      wx.showToast({
        title: '请填写选手名字',
        icon:'none',
      })
    } else if (that.data.x_card == '') {
      wx.showToast({
        title: '请填写选手身份证号',
        icon: 'none',
      })
    } else if (that.data.sexs == '') {
      wx.showToast({
        title: '请选择选手性别',
        icon: 'none',
      })
    } else if (that.data.day == '') {
      wx.showToast({
        title: '请选择出生日期',
        icon: 'none',
      })
    } else if (that.data.addres == '') {
      wx.showToast({
        title: '请选择家庭住址',
        icon: 'none',
      })
    } else if (that.data.xiangx == '') {
      wx.showToast({
        title: '请填写详细地址',
        icon: 'none',
      })
    } else if (that.data.saiid == '') {
      wx.showToast({
        title: '请选择所属赛区',
        icon: 'none',
      })
    } else if (that.data.orginid == '') {
      wx.showToast({
        title: '请选择所属机构',
        icon: 'none',
      })
    }else{
      this.setData({
        isone: true,
        ishidden: false,
      })
    }
    
  },
  back() {
    this.setData({
      isone: false,
      ishidden: true,
    })
  },
  //选手姓名
  x_name(e){
    this.setData({
      x_name:e.detail.value
    })
  },
  j_name(e) {
    this.setData({
      j_name: e.detail.value
    })
  },
  //选手手机号
  x_phone(e) {
    this.setData({
      x_phone: e.detail.value
    })
  },
  j_phone(e) {
    this.setData({
      j_phone: e.detail.value
    })
  },
  //选手身份证号
  x_card(e) {
    this.setData({
      x_card: e.detail.value
    })
  },
  j_card(e) {
    this.setData({
      j_card: e.detail.value
    })
  },
  between(e){
    this.setData({
      between: e.detail.value
    })
  },
  //详细地址
  xiangx(e){
    this.setData({
      xiangx: e.detail.value
    })
  },
  //性别选择
  sexChange(e){
   
   let that = this;
   that.setData({
     sexs: that.data.sex[e.detail.value].name,
     sexid: that.data.sex[e.detail.value].id,
   })
  },
  //出生日期选择
  dayChange(e){
    console.log(e)
    this.setData({
      day:e.detail.value
    })
    console.log(this.data.day)
  },
  // 同意
  agree(){
     let that =this;
     that.setData({
       isshu1:!that.data.isshu1,
     })
  },
  noagree() {
    wx.navigateBack({
      data:'1'
    })

  },
  cut() {
    var that = this;
    this.selectComponent('#imgcut').cut().then(r => {
      // wx.previewImage({
      //   urls: [r],
      // })
      wx.showLoading({
        title: '上传中',
      })
      url = r
      that.setData({
        isshow: !that.data.isshow,
        ishidden: !that.data.ishidden
      })
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
          
          wx.showToast({
            title: '上传成功',
            icon: 'none'
          })
          if(id == 0){
            that.setData({
              post2:datas.data.url
            })
            post2 = datas.data.fileName;
          }else if(id == 1){
            that.setData({
              post3:datas.data.url
            })
            post3 = datas.data.fileName;
          }else if(id == 2){
            that.setData({
              post4:datas.data.url
            })
            post4 = datas.data.fileName;
          }else if(id == 3){
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
  chooseimg() {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        this.setData({
          src: res.tempFilePaths[0]
        })
      },
    })
  },
  //删除个人照照片
  detel:function(e){
     var that = this;
     console.log(e)
     console.log(that.data.imgs)
    
     
     simages.splice(e.currentTarget.dataset.index,1)
     images.splice(e.currentTarget.dataset.index,1)
     that.setData({
      imgs:images
    })
    if (simages.length < 5) {
      that.setData({
        showadd: false
      })
    }
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
       tar:999,
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
      ishidd: !that.data.ishidd,  
    })
  },
  //赛区选择
  saiChange(e){
    let that =this;
    let orgin = that.data.orgin;
    let orgins =[]
    that.setData({
      sainame: that.data.sai[e.detail.value].name,
      saiid: that.data.sai[e.detail.value].id,
      provinceId: that.data.sai[e.detail.value].provinceId,
      cityId: that.data.sai[e.detail.value].cityId,
    })
    for(var i in orgin){
      if (orgin[i].provinceId == that.data.sai[e.detail.value].provinceId && orgin[i].cityId == that.data.sai[e.detail.value].cityId){
          orgins.push(orgin[i])
      }
    }
    console.log(orgins)
    that.setData({
      orgins: orgins
    })
    // var data = orgin.filter(function (item) {
    //   return item.provinceId == that.data.sai[e.detail.value].provinceId;
    // })
  },
  //机构选择
  orginChange(e) {
    let that = this;
   if(that.data.saiid == ''){
     wx.showToast({
       title: '请先选择赛区',
       icon:'none',
       
     })
   }else{
     that.setData({
       orginame: that.data.orgin[e.detail.value].institutionName,
       orginid: that.data.orgin[e.detail.value].id,
     })
   }
  },
  //个人照片
  chooseImagess: function (e) {
   
    var that = this;
    id = e.currentTarget.id,
    that.setData({
      isshow: !that.data.isshow,
      ishidden:!that.data.ishidden
     })
    // wx.chooseImage({
    //   count: 5,
    //   sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
    //   sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
    //   success: res => {
    //     console.log(res.tempFilePaths);
    //     var tempFilePaths = res.tempFilePaths;
    //     for (var i in tempFilePaths) {
    //       images.push(tempFilePaths[i])
          
    //       wx.showLoading();
          
    //       wx.uploadFile({
    //         url: app.data.urlevent + '/appfile/xcxfileprogerssupload.do', // 仅为示例，非真实的接口地址
    //         filePath: tempFilePaths[i],
    //         name: 'file',
    //         header: {
    //           "Content-Type": "multipart/form-data",
    //           'accept': 'application/json',
    //         },
    //         formData: {
    //           'token': wx.getStorageSync('token')
    //         },
    //         dataType: 'json',
    //         success(res) {
    //           let datas = JSON.parse(res.data)
    //           console.log(datas)
    //           wx.hideLoading();
    //           wx.showToast({
    //             title: '上传成功',
    //             icon: 'none'
    //           })
              
    //           simages.push(datas.data.fileName)
    //           // do something
    //           console.log(simages)
    //           if (simages.length == 5) {
    //             that.setData({
    //               showadd: !that.data.showadd
    //             })
    //           }
    //         }
    //       })


    //     }
    //     that.setData({
    //       imgs: images,
    //       showimg: false
    //     })
    //     console.log(that.data.imgs)
    //   }
    // })


  },
  handleImagePreview(e) {
    var that = this;
    const idx = e.currentTarget.dataset.idx
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
    if (that.data.ok) {    //判断ok，初始化是true所以会执行，
      
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
     } else if(simages.length < 3) {
       wx.showToast({
         title: '请上传至少3张个人照',
         icon: 'none'
       })
     } else if (simages.length > 5) {
       wx.showToast({
         title: '请上传3~5张个人照',
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
       that.setData({       //进去之后设置为false这样后面再点击就没有用了
         ok: false,
       })
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
             that.setData({
               ok: true,
             })
             wx.showToast({
               title: '提交成功可去个人中心查看报名情况',
               icon: 'none'
             })
             setTimeout(function(){
               wx.navigateBack({
                 delta: 1
               })
             },2000)
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
 
  //选择地址
  diz: function () {
    this.getprov();
    this.setData({
      isardess: false,
      isprov: false,
      isqu: true,
      iscity: true
    })
  },
  //省
  getprov: function () {
    var that = this;
    wx.request({
      url: app.data.urlevent + "/apparea/nextlist.do",
      data: {
        grade: "1",
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
          for (var i in res.data.data) {
            province.push(res.data.data[i])
          }
          that.setData({
            province: province
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
  // 省跳市
  getprovs: function (e) {
    var that = this;
    console.log(e)
    citys = [];
    province_id = e.currentTarget.id;
    p_name = e.currentTarget.dataset.name

    // 获取所有市
    wx.request({
      url: app.data.urlevent + "/apparea/nextlist.do",
      data: {
        grade: '2',
        id: province_id,
        token: wx.getStorageSync('token'),
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status == 100) {
          for (var i in res.data.data) {
            citys.push(res.data.data[i])
          }
          that.setData({
            city: citys,
            isprov: true,
            iscity: false
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 500
          })
        }

      }
    })
  },
  // 市跳区
  getcity: function (e) {
    var that = this;
    areas = []
    city_id = e.currentTarget.id;;
    c_name = e.currentTarget.dataset.name

    // 获取所有区
    wx.request({
      url: app.data.urlevent + "/apparea/nextlist.do",
      data: {
        grade: '3',
        id: city_id,
        token: wx.getStorageSync('token'),
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status == 100) {
          for (var i in res.data.data) {
            areas.push(res.data.data[i])
          }
          that.setData({
            area: areas,
            iscity: true,
            isqu: false,

          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 500
          })
        }

      }
    })
  },
  // 区跳街道
  getarea: function (e) {
    var that = this;
    q_name = e.currentTarget.dataset.name
    area_id = e.currentTarget.id;;
    // 获取所有区
    wx.request({
      url: app.data.urlevent + "/apparea/nextlist.do",
      data: {
        grade: '4',
        id: area_id,
        token: wx.getStorageSync('token'),
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status == 100) {
          for (var i in res.data.data) {
            towns.push(res.data.data[i])
          }
          that.setData({
            town: towns,
            isjie:false,
            isqu: true,
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 500
          })
        }

      }
    })
  },
  //街道
  gettown:function(e){
    var that = this;
    towns = []
    town_id = e.currentTarget.id;
    j_name = e.currentTarget.dataset.name;
    that.setData({ //给变量赋值
      addres: p_name + '-' + c_name + '-' + q_name + '-' + j_name,
      isardess: true,
    })
  },
  getsaiqu(){
    let that =this;
    wx.request({
      url: app.data.urlevent + "/appcomeptitionplayer/allcompetitionarea.do",
      data: {
        seasonId:that.data.id,
        token: wx.getStorageSync('token'),
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status == 100) {
         
          that.setData({
            sai: res.data.data,
           
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 500
          })
        }

      }
    })
  },
  getorgin() {
    let that = this;
    wx.request({
      url: app.data.urlevent + "/appinstitution/list.do",
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
        if (res.data.status == 100) {

          that.setData({
            orgin: res.data.data,

          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 500
          })
        }

      }
    })
  },
  //当前赛事
  getseasondetail: function () {
    var that = this;
    wx.request({
      url: app.data.urlevent + "/appcompetition/currentseasondetail.do",
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
            id: res.data.data.id,
          })
          that.getsaiqu();
          that.getorgin();
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