// pages/home/home.js

const app = getApp();
var util = require('../../utils/util.js');
var allseason=[];
var player = [];
var splayer = [];
var ranklist = [];
var dynamic  = [];
var isshow;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag: [
      { id: 1, name: '赛事介绍' },
      { id: 2, name: '参赛选手' },
      { id: 3, name: '排行榜' },
      { id: 4, name: '赛事动态' },
     
    ],
    idx:'',
    tar:'',
    tab:'',
    ranklist: [],
    top_1: '',
    top_2: '',
    top_3: '',
    detail:[],
    banner:[],
    allseason:[],
    mo_id:'',
    player:[],
    x_currentPage:1,
    p_currentPage:1,
    d_currentPage:1,
    d_totalPage:'',
    p_totalPage:'',
    x_totalPage:'',
    isSearch: false,
    isvideo: true,
    isSai:true,
    isfuhuo:true,
    isfu:true,
    dynamic :[],
    play:'',
    id:'',
    tas: 999,
    userinfo:'',
    time:'',
    isAnnouncement:'',
    isCurrent:'',
    valu:'',
    anfu:true,
    showModal:false,
    play:'',
    isvote:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.getdetail();
    
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    console.log(time)
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    that.setData({     
      time: time
    })
    if(options.tar){
      that.setData({     
        tar: options.tar,
        idx:options.idx,
        tab:1
      }) 
    }
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
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        console.log(res.data)
        that.setData({
          userinfo: res.data
        })
      },
    })
    

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
    allseason = [];
    player = [];
    splayer = [];
    ranklist = [];
    dynamic = [];
    this.setData({
      detail: [],
      banner: [],
      allseason: [],
      player: [],
      ranklist: []
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
       allseason = [];
       player = [];
       splayer = [];
       ranklist = [];
       dynamic = [];
      that.setData({
        valu: '',
        ranklist:[],
        top_1: '',
        top_2: '',
        top_3: '',
        detail: [],
        banner: [],
        allseason: [],
        mo_id: '',
        player: [],
        x_currentPage: 1,
        p_currentPage: 1,
        d_currentPage: 1,
        d_totalPage: '',
        p_totalPage: '',
        x_totalPage: '',
        isSearch: false,
        isvideo: true,
        isSai: true,
        isfuhuo: true,
        isfu: true,
        dynamic: [],
        play: '',
        id: '',
        tas: '',
        time: '',
        isAnnouncement: '',
        isCurrent: ''

      })

      setTimeout(function () {
        console.log(ranklist)
        console.log(that.data.ranklist)
        that.getdetail();
        that.getdynamic();
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
    var that = this;

    //动态
     if(that.data.tab == 3){
       if (that.data.d_currentPage == that.data.d_totalPage) {
         wx.showToast({
           title: '已经到底了哦',
           icon: 'none'
         })
       } else {

         that.setData({
           d_currentPage: that.data.d_currentPage + 1,
         })
         that.getdynamic();

       }
     }
    //选手
    if(that.data.tab == 1){
      if (that.data.x_currentPage == that.data.x_totalPage) {
        wx.showToast({
          title: '已经到底了哦',
          icon: 'none'
        })
      } else {
        console.log(that.data.x_currentPage == that.data.x_totalPage)
        console.log()
        that.setData({
          x_currentPage: that.data.x_currentPage + 1,
        })
        that.getplayer();

      }
    }
    //排行榜
    if(that.data.tab == 2){
      if (that.data.p_currentPage == that.data.p_totalPage) {
        wx.showToast({
          title: '已经到底了哦',
          icon: 'none'
        })
      } else {
        that.setData({
          p_currentPage: that.data.p_currentPage + 1,
        })
        that.getranklist();

      }
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
  play:function(e){
    var that = this;
    wx.request({
      url: app.data.urlevent + "/appcomeptitionplayer/detail.do",
      data: {
        token: wx.getStorageSync('token'),
        userId: e.currentTarget.id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status === 100) {
          var date = Date.parse(that.data.time)

          var seasonEndtDate = Date.parse(res.data.data.seasonEndDate.replace(/-/g, '/'))
          var seasonStartDate = Date.parse(res.data.data.seasonStartDate.replace(/-/g, '/'))
          var t3 = date - seasonStartDate;
          var t4 = date - seasonEndtDate;
          if (t3 < 0) {
            that.setData({
              is: 1
            })
          } else if (t3 > 0 && t4 < 0) {
            that.setData({
              is: 2
            })
          } else if (t4 > 0) {
            that.setData({
              is: 3
            })
          }
          wx.navigateTo({
            url: '../player/player?id=' + e.currentTarget.id,
          })
        } else if (res.data.status === 103) {
          wx.showToast({
            title: '请重新登录',
            icon: 'none'
          })
          wx.navigateTo({
            url: '../login/login',
          })
        }
        else if (res.data.status === 104) {
          wx.showToast({
            title: res.data.msg,
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
  clone:function(){
    var that = this;
    that.setData({
      isAnnouncement: 2
    })
  },
  //动态去选手详情
  todetail:function(e){
    if(e.currentTarget.dataset.type == 1){
      wx.navigateTo({
        url: '../player/player?id=' + e.currentTarget.id,
      })
    }
    
  },
  //去往复活赛
  resurr:function(){
    var that = this;
    wx.navigateTo({
      url: '../resurrection/resurrection?id=' + that.data.mo_id + '&competitionName=' + that.data.competitionName + '&qualifiedNumber=' + that.data.qualifiedNumber,
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
   //前往复活赛
   gofu:function(e){
     var that = this;
     that.setData({
       anfu:!that.data.anfu,
       tab:2,
       idx:2
     })
     wx.setStorage({
       key: 'anfu',
       data: '1',
     })
     that.tag(e);
   },
  resurrection: function (e) {
    var that = this;
    wx.showModal({
     
      content: '确定开启复活',
      confirmColor: '#F861AA',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: app.data.urlevent + "/appcomeptitionplayer/joinresurgence.do",
            data: {
              token: wx.getStorageSync('token'),
              userId: e.currentTarget.id
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
                  title: '复活成功',
                  icon: 'none'
                })
                that.getranklist();
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

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  //去报名
  submit: function (e) {
    var that = this;
    if(that.data.detail.status == 0){
      wx.showToast({
        title: '报名还未开启',
        icon:'none'
      })
    } else if (that.data.detail.status == 1){
      if(that.data.userinfo.isJoin == 1){
        wx.showToast({
          title: '你已报名',
          icon:'none'
        })
      }else{
        wx.request({
          url: app.data.urlevent + "/appcompetition/isaudit.do",
          data: {
            token: wx.getStorageSync('token'),
            userId: e.currentTarget.id
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          dataType: 'json',
          success: function (res) {
            console.log(res.data.data)
            if (res.data.status === 100) {
              wx.navigateTo({
                url: '../sumbit/sumbit',
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
       
    }else{
      wx.showToast({
        title: '你来晚了，报名已截止',
        icon: 'none'
      })
    }
    console.log(that.data.userinfo)
  },
  //去选手页
  player:function(e){
    wx.navigateTo({
      url: '../player/player?id=' + e.currentTarget.id + '&ids=' +  e.currentTarget.dataset.id,
    })
  },
  //我的
  mine:function(){
    wx.redirectTo({
      url: '../mine/mine',
    })
  },
  
  //商品切换
  tag: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.num);
    player=[];
    ranklist=[];
    dynamic=[];
    that.setData({
      idx: e.currentTarget.dataset.num,
      tar: e.currentTarget.dataset.num,
      tab: e.currentTarget.dataset.num,
      player:[],
      ranklist:[],
      dynamic:[],
    })
    that.getplayer();
    that.getranklist();
    that.getdynamic();
  },
  //搜索
  searchinp: function (e) {
    var that = this;
    console.log(e);
    splayer=[]
    that.setData({
      isSearch: true,
      splayer:[],
      valu:e.detail.value
    })
    wx.request({
      url: app.data.urlevent + "/appcomeptitionplayer/playerlist.do",
      data: {
        competitionAreaId: that.data.mo_id,
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
          for(var i in res.data.data.data){
            splayer.push(res.data.data.data[i])
          }
          that.setData({
            splayer: splayer,
            //s_totalPage: res.data.data.totalPage
          })

        }else if (res.data.status === 103){
          wx.showToast({
            title: '请重新登录',
            icon: 'none'
          })
           wx.navigateTo({
             url: '../login/login',
           })
        }else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  //投票
  vote: function (e) {
    var that = this;
     if(isshow == 3){
       wx.showToast({
         title:'当前赛程已结束哦',
         icon:'none'
       })
     }else{
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
            that.setData({
              isvote:!that.data.isvote
            })
            ranklist=[];
            player=[];
            that.setData({
              p_currentPage:1,
              x_currentPage:1,
              ranklist:[],
              player:[],
            })
            that.getranklist();
            that.getplayer();
          } else if (res.data.status === 103) {
            wx.showToast({
              title: '请重新登录',
              icon: 'none'
            })
            wx.navigateTo({
              url: '../login/login',
            })
          } else if (res.data.status === 105) {
            wx.showToast({
              title: '投票达上限，请明天再来吧',
              icon: 'none'
            })
  
          }else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          }
        }
      })
     }
  },
  que:function(){
    var that = this;
    that.setData({
      isvote:!that.data.isvote
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
  //赛区选择
  narea: function (e) {
    console.log(e)
    var that = this;
    var id = e.currentTarget.id
    var index = e.currentTarget.dataset.index;
    var competitionName = e.currentTarget.dataset.name;
    var qualifiedNumber = e.currentTarget.dataset.num;
    player = [];
    ranklist= []
    that.setData({
      competitionAreaId: e.currentTarget.id,
      competitionName: competitionName,
      qualifiedNumber: qualifiedNumber,
      isSai: !this.data.isSai,
      tas: index,
      isSearch: false,
      players: [],
      mo_id:id,
      ranklist: [],
      top_1: '',
      top_2: '',
      top_3: '',
    })
    that.getplayer();
    that.getranklist();

  },
  //查看图片
  imgsrc: function (e) {
    var that = this;

    console.log(e)
    var num = e.currentTarget.dataset.num;
    var selectindex = e.currentTarget.dataset.src;//获取data-src
    var imgList = this.data.dynamic[num].filePathOss;//获取data-list
    //图片预览
    wx.previewImage({
      current: selectindex, // 当前显示图片的http链接   
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  //查看视频
  showModalFun: function (e) {
    this.setData({
      showModal: !this.data.showModal,
      play:e.currentTarget.dataset.src
    })
  },
  getdetail:function(){
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
         
          that.getdev();
          that.getmode();
          that.getcanreceivegift();
          that.setData({
            detail: res.data.data,
            banner: res.data.data.competitionPhotoOss,
            id:res.data.data.id,
            isAnnouncement: res.data.data.isAnnouncement
          })
          that.getseasondetail();
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
  //当前赛事
  getseasondetail: function () {
    var that = this;
    wx.request({
      url: app.data.urlevent + "/appcompetition/currentseasondetail.do",
      data: {
        token: wx.getStorageSync('token'),
        seasonId: that.data.seasonId
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
          var date = Date.parse(new Date())
          console.log(res.data.data.EndDate)
          var endDatas = res.data.data.EndDate
          var a = ' 00:00:00';
          var b = ' 23:59:59';
          var startDatas = res.data.data.StartDate;
          var start = Date.parse(startDatas + a);
          var end = Date.parse(endDatas + b)
          
          var t2 = date - end;
          var t1 = date - start;
          if (t1 < 0) {
            isshow = 1
          } else if (t1 > 0 && t2 < 0) {
            isshow = 2
          } else if (t2 > 0) {
            isshow = 3

          }
          
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
  //所有赛季
  getdev: function () {
    var that = this;
    wx.request({
      url: app.data.urlevent + "/appcompetition/allseason.do",
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
          var a = 0;
          for(var i in res.data.data){
            res.data.data[i].start = res.data.data[i].startDate.substring(5)
            res.data.data[i].end = res.data.data[i].endDate.substring(5)
            
            if (a == 0 && res.data.data[i].isCurrent == 0) {
              res.data.data[i].isshow = 1
            } else if (a == 1 && res.data.data[i].isCurrent == 0) {
              res.data.data[i].isshow = 3
            } else if(res.data.data[i].isCurrent == 1) {
              a = 1;
              res.data.data[i].isshow = 2
            }
            allseason.push(res.data.data[i])
            if (res.data.data[i].isCurrent == 1) {
              console.log('feko')
              that.setData({
                isCurrent: res.data.data[i].name
              })
            }
            if(wx.getStorageSync('anfu')){
              that.setData({
                
                anfu: true,
              })
            }else  if (res.data.data[i].isCurrent == 1 && res.data.data[i].type == 2){
              that.setData({
                anfu:false,
              })
            }
            if(res.data.data[i].isCurrent == 1 && res.data.data[i].type == 2){
              that.setData({
                isfuhuo: false,
                
              })
            }
          }
          
         
          that.setData({
            allseason: allseason,
           
          })
     
        } else if (res.data.status === 103) {
          wx.showToast({
            title: '请重新登录',
            icon: 'none'
          })
          wx.navigateTo({
            url: '../login/login',
          })
        }else {
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
      url: app.data.urlevent + "/appcomeptitionplayer/default/comeptitionarea.do",
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
            qualifiedNumber: res.data.data.qualifiedNumber,
            mo_id: res.data.data.id,
            seasonId: res.data.data.seasonId
          })
          that.getplayer();
          that.getranklist();
        }  else if (res.data.status === 103) {
          wx.showToast({
            title: '请重新登录',
            icon: 'none'
          })
          wx.navigateTo({
            url: '../login/login',
          })
        }else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  //参赛选手
  getplayer: function () {
    var that = this;
    wx.request({
      url: app.data.urlevent + "/appcomeptitionplayer/playerlist.do",
      data: {
        token: wx.getStorageSync('token'),
        competitionAreaId:that.data.mo_id,
        currentPage: that.data.x_currentPage,
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
            player.push(res.data.data.data[i])
          }
          that.setData({
            player: player,
            x_totalPage: res.data.data.totalPage
          })

        } else if (res.data.status === 103) {
          wx.showToast({
            title: '请重新登录',
            icon: 'none'
          })
          wx.navigateTo({
            url: '../login/login',
          })
        }else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  //排行榜
  getranklist: function (e) {
    var that = this;
    wx.request({
      url: app.data.urlevent + "/appcomeptitionplayer/ranklist.do",
      data: {
        
        token: wx.getStorageSync('token'),
        currentPage: that.data.p_currentPage,
        competitionAreaId: that.data.mo_id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status === 100) {

           if(that.data.p_currentPage == 1){
             var j = 0;
             
             that.setData({
               top_1: res.data.data.data.splice(0, 1)[0],
               top_2: res.data.data.data.splice(0, 1)[0],
               top_3: res.data.data.data.splice(0, 1)[0],        
             })
             if(that.data.top_2){
                if (that.data.top_2.status == 2 && that.data.top_2.isJoinResurgence == 0){ 
                    top_2.fuh = 2
                }
                
             }
             if(that.data.top_3){
              if (that.data.top_3.status == 2 && that.data.top_3.isJoinResurgence == 0){
                  top_3.fuh = 2
              }
           }
             
           }
          for(var i in res.data.data.data){
            if (res.data.data.data[i].status == 2 && res.data.data.data[i].isJoinResurgence == 0){
               console.log(111)
              res.data.data.data[i].fuh = 2
            }
            ranklist.push(res.data.data.data[i])
          }
          console.log(ranklist)
          that.setData({
            ranklist:ranklist,
            p_totalPage: res.data.data.totalPage  
          })
          console.log(that.data.top_1)
        } else if (res.data.status === 103) {
          wx.showToast({
            title: '请重新登录',
            icon: 'none'
          })
          wx.navigateTo({
            url: '../login/login',
          })
        }else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  //动态
  getdynamic: function (e) {
    var that = this;
    wx.request({
      url: app.data.urlevent + "/appcompetition/dynamiclist.do",
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
        }else {
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
        }
        else if (res.data.status === 103) {
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