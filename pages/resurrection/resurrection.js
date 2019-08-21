// pages/resurrection/resurrection.js
const app = getApp();
var player = [];
var splayer = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
   isgz:true,
   isSearch: false,
   isSai:true,
   player:[],
   splayer:[],
   id:'',
   currentPage:1,
   narea:[],
   qualifiedNumber:'',
   competitionName:'',
   banner:[],
   detail:[],
   seasonId:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       var that = this;
       console.log(options)
       that.setData({
         id:options.id,
       })
       that.getplayer();
       that.getmode();
       that.getdetail();
       that.getseasondetail();
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
    player = []
    splayer = []
    this.setData({
      player: [],
      splayer: []
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.showToast({
      title: '刷新中',
      icon: "none"
    })
    var that = this;

    //模拟加载
    setTimeout(function () {
       player = [];
       splayer = [];
      that.setData({

        isgz: true,
        isSearch: false,
        isSai: true,
        player: [],
        splayer: [],
        currentPage: 1,
        narea: [],
        qualifiedNumber: '',
        competitionName: '',
        banner: [],
        detail: [],
        seasonId: '',
        valu:'',
      })

      setTimeout(function () {
        that.getplayer();
        that.getmode();
        that.getdetail();
      }, 500)
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新

    }, 1000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //选手
    var that = this;
    if (that.data.currentPage == that.data.totalPage) {
      wx.showToast({
        title: '已经到底了哦',
        icon: 'none'
      })
    } else {
      that.setData({
        currentPage: that.data.currentPage + 1,
      })
      that.getplayer();

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
  //去选手页
  player: function (e) {
    wx.navigateTo({
      url: '../player/player?id=' + e.currentTarget.id + '&ids=' + e.currentTarget.dataset.id,
    })
  },
  help: function (e) {
    var that = this;
    console.log(e)
    wx.navigateTo({
      url: '../help/help?id=' + e.currentTarget.id + '&ids=' + e.currentTarget.dataset.id,
    })
    // wx.getSystemInfo({
    //   success: function (res) {
    //     that.setData({
    //       systemInfo: res,
    //     })
    //     if (res.platform == "ios") {
    //       that.setData({
    //         ishelp: !that.data.ishelp
    //       })
    //       console.log('IOS')
    //     } else {
    //       wx.navigateTo({
    //         url: '../help/help?id=' + e.currentTarget.id + '&ids=' +  e.currentTarget.dataset.id,
    //       })

    //     }
    //   }
    // })

  },
  //投票
  vote: function (e) {
    var that = this;
    wx.request({
      url: app.data.urlevent + "/appcomeptitionplayer/uservote.do",
      data: {
        playerId: e.currentTarget.id,
        token: wx.getStorageSync('token')
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
            title: '感谢你宝贵的一票',
            icon: 'none'
          })
        
          player = [];
          that.setData({
            currentPage: 1,
           
           
            player: [],
          })
          
          that.getplayer();
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  resurr:function(){
    this.setData({
      isgz:!this.data.isgz
    })
  },
  //赛区切换
  bind: function () {
    var that = this;
    this.setData({
      isSai: !this.data.isSai,
      valu:'',
    })
    that.getNarea();
  },
  //搜索
  searchinp: function (e) {
    var that = this;
    console.log(e);
    splayer = []
    that.setData({
      isSearch: true,
      splayer: [],
      valu: e.detail.value
    })
    wx.request({
      url: app.data.urlevent + "/appcomeptitionplayer/resurgencelist.do",
      data: {
        competitionAreaId: that.data.id,
        token: wx.getStorageSync('token'),
        keyword: e.detail.value,
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
            splayer.push(res.data.data.data[i])
          }
          that.setData({
            splayer: splayer,
            //s_totalPage: res.data.data.totalPage
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
  //赛区选择
  narea: function (e) {
    console.log(e)
    var that = this;
    var id = e.currentTarget.id
    var index = e.currentTarget.dataset.index;
    var competitionName = e.currentTarget.dataset.name;
    var qualifiedNumber = e.currentTarget.dataset.num;
    player = [];
   
    that.setData({
      competitionAreaId: e.currentTarget.id,
      competitionName: competitionName,
      qualifiedNumber: qualifiedNumber,
      isSai: !this.data.isSai,
      tas: index,
      isSearch: false,
      players: [],
      id: id,   
    })
    that.getplayer();
    

  },
  //参赛选手
  getplayer: function () {
    var that = this;
    wx.request({
      url: app.data.urlevent + "/appcomeptitionplayer/resurgencelist.do",
      data: {
        token: wx.getStorageSync('token'),
        competitionAreaId: that.data.id,
        currentPage: that.data.currentPage,
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
            player.push(res.data.data.data[i])
          }
          that.setData({
            player: player,
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
  //赛区
  getNarea: function () {
    var that = this;
    console.log(that.data.seasonId)
    wx.request({
      url: app.data.urlevent + "/appcomeptitionplayer/allcompetitionarea.do",
      data: {
        seasonId: that.data.seasonId,
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
            narea: res.data.data
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
  //默认赛区
  getmode: function () {
    var that = this;
    wx.request({
      url: app.data.urlevent + "/appcomeptitionplayer/default/resurgencearea.do",
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
            mode: res.data.data,
            competitionName: res.data.data.name,
            qualifiedNumber: res.data.data.resurgenceQualifiedNumber,
            id: res.data.data.id,
            seasonId: res.data.data.seasonId,
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
      url: app.data.urlevent + "/appcompetition/detail.do",
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
            banner: res.data.data.competitionPhotoOss,          
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
  getseasondetail: function () {
    var that = this;
    wx.request({
      url: app.data.urlevent + "/appcompetition/currentseasondetail.do",
      data: {
        token: wx.getStorageSync('token'),
        seasonId: that.data.id
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
            season: res.data.data,
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