// pages/player/player.js
var util = require('../../utils/util.js');
const app = getApp();
var votelist=[];
var isshow;
let share='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    ids:'',
    detail:[],
    before:'',
    isyds:true,
    currentPage:1,
    totalPage:'',
    votelist:[],
    playid:'',
    status:'',
    userinfo:'',
    ok:true,
    share:1,
    sort:'',
    isvote:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this;
     console.log(options)
     
     var time = util.formatTime(new Date());
    console.log(time)
    // 再通过setData更改Page()里面的data，动态更新页面的数据
     that.setData({
       id:options.id,
       ids:options.ids,
       time: time
     })
     if(options.share){
       share= options.share
     }
    if (wx.getStorageSync('token')) {
      that.getdet();
      console.log('token存在')
    } else {
      that.gettoken();
      console.log('token不存在')
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
     votelist=[];
     this.setData({
       votelist:[]
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
      votelist = [];
      that.setData({
        
        detail: [],
        before: '',
        isyds: true,
        currentPage: 1,
        totalPage: '',
        votelist: [],
        playid: '',
        status: '',
        share:1,
      })

      setTimeout(function () {
        if (wx.getStorageSync('token')) {
          that.getdet();
          that.getdetail();
          console.log('token存在')
        } else {
          that.gettoken();
          console.log('token不存在')
        }
       
        
        
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
    if (that.data.currentPage == that.data.totalPage) {
      wx.showToast({
        title: '已经到底了哦',
        icon: 'none'
      })
    } else {
      that.setData({
        currentPage: that.data.currentPage + 1,
      })
      that.getvote();

    }
  },

  /**
   * 用户点击右上角分享
   */
  
  onShareAppMessage: function () {
     var that = this;
    // return {
    //   title: '大家好，我是'  + that.data.detail.name + '我正在参加' + that.data.areaName + ',快来投我一票吧',
    //   path: '/pages/player/player?id=' + that.data.id  + '&share=' + 1,
      
    //      }  
    return {
      title: '大家好，我正在参加《明日告白》影视线上选拔，快来投我一票~',
      path: '/pages/player/player?id=' + that.data.id + '&share=' + that.data.share
    }
  },
  //投票
  vote: function (e) {
    var that = this;
   
    if(isshow == 3){
       wx.showToast({
         title: '当前赛程已结束哦',
         icon:'none'
       })
    }else{
      wx.request({
        url: app.data.urlevent + "/appcomeptitionplayer/uservote.do",
        data: {
          playerId: that.data.playid,
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
            
            that.getdetail();
          } else if (res.data.status === 105) {
            wx.showToast({
              title: '投票达上限，请明天再来吧',
              icon: 'none'
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
  que:function(){
    var that = this;
    that.setData({
      isvote:!that.data.isvote
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
            sort:res.data.data.sort   
          })
          that.getdetail();
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
  yule: function (e) {
    //娱乐世界
    wx.navigateToMiniProgram({
      appId: 'wxf556b39ee9c934b4',
      path: 'pages/funcicle/funcicle',
      extraData: {

      },
      envVersion: 'release',
      success(res) {
        // 打开成功
      }
    })

  },
  //去首页
  hots:function(){
    wx.navigateTo({
      url: '../home/home',
    })
  },
  //绑定
  getbang(){
    let that = this;
    console.log(share)
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        if (share != '') {
          if (res.data.idolId == null || res.data.idolId == '') {
            wx.request({
              url: app.data.urlevent + "/appcomeptitionplayer/focusplayer.do",
              data: {
                token: wx.getStorageSync('token'),
                userId: that.data.id
              },
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              dataType: 'json',
              success: function (res) {
                console.log(res.data.data)
                if (res.data.status === 100) {

                  that.getuser();
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

        that.setData({
          userinfo: res.data
        })
      },
    })
  },
  gettoken: function () {
    var that = this;
    wx.request({
      url: app.data.urlevent + "/applogin/default/token.do",
      data: {

      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status === 100) {

          wx.setStorage({
            key: 'token',
            data: res.data.data.token,
          })
          wx.setStorage({
            key: 'userinfo',
            data: res.data.data.user,
          })
          setTimeout(function () {
            that.getdet();
          }, 300)
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
  //去报名
  submit: function (e) {
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
          wx.showToast({
            title: '你已报名',
            icon: 'none'
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
          wx.navigateTo({
            url: '../sumbit/sumbit',
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
  //助力
  help: function () {
    var that = this;
    console.log(that.data.id)
    wx.navigateTo({
      url: '../help/help?id=' + that.data.id + '&ids=' + that.data.playid,
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
    //         url: '../help/help?id=' + that.data.id + '&ids=' + that.data.ids,
    //       })

    //     }
    //   }
    // })

  },
  //投票列表
  getvote: function (e) {
    var that = this;
    wx.request({
      url: app.data.urlevent + "/appcomeptitionplayer/votelist.do",
      data: {
        playerId: that.data.playid,
        token: wx.getStorageSync('token'),
        currentPage: that.data.currentPage
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
           
            var spt = res.data.data.data[i].createDate.split(' ');
            res.data.data.data[i].data = spt[1]
            votelist.push(res.data.data.data[i])

          }
          
          that.setData({
            votelist: votelist,
            totalPage:res.data.data.totalPage,
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
  //复活他
  resurrection: function () {
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
              userId: that.data.id
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
                that.getdetail();

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
  getdetail: function () {
    var that = this;
    wx.request({
      url: app.data.urlevent + "/appcomeptitionplayer/detail.do",
      data: {
        token: wx.getStorageSync('token'),
        userId:that.data.id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status === 100) {
          wx.setNavigationBarTitle({
            title: res.data.data.name,
          })
          if (res.data.data.currentRank == 1){
            that.setData({
              before:0
            })
          }else{
           
              that.setData({
                before: res.data.data.beforeTotalVotes - res.data.data.totalVotes,

              })
          }
          console.log(that.data.sort)
          if (res.data.data.status == 2 && res.data.data.isJoinResurgence == 0 &&  res.data.data.sort == that.data.sort) {
            res.data.data.fuh = 2
          }
          
          var date = Date.parse(new Date())
          console.log(res.data.data.seasonEndDate)
          var endDatas = res.data.data.seasonEndDate
          var a = ' 00:00:00';
          var b = ' 23:59:59';
          var startDatas = res.data.data.seasonStartDate;
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
          votelist = [];
          
          that.setData({
            detail: res.data.data,
            playid:res.data.data.id, 
            votelist:[]
          })

          that.getvote();
        }else if (res.data.status === 103) {
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
  focus:function(){
    var that = this;
    wx.showModal({
      title: '确定关注？',
      content: '关注后，在首页即可看到他的赛况哦~',
      confirmColor:'#F861AA',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: app.data.urlevent + "/appcomeptitionplayer/focusplayer.do",
            data: {
              token: wx.getStorageSync('token'),
              userId: that.data.id
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
                  title: '关注成功',
                  icon: 'none'
                })
                that.getuser();
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
  //帮他拉票
  know: function (e) {
    var that = this;
    that.setData({
      isyds: !that.data.isyds
    })
  },
  getdet: function () {
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
          that.getseasondetail();
           that.getbang();
          that.setData({
            status: res.data.data.status,
            
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
  //用户信息
  getuser: function () {
    var that = this;
    wx.request({
      url: app.data.urlevent + "/appuser/userinfo.do",
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
            userinfo: res.data.data.user,

          })
          console.log(that.data.userinfo)
          wx.setStorage({
            key: 'token',
            data: res.data.data.token,
          })
          wx.setStorage({
            key: 'userinfo',
            data: res.data.data.user,
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