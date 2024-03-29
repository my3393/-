let avater = '';
let iv='';
let encryptedData = '';
const app = getApp();
Page({
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onLoad() {
       
      // 查看是否授权
      wx.getSetting({
        success(res) {
          console.log(res)
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称

            wx.login({
              success: function (res) {
                wx.getUserInfo({
                  success: function (res) {
                    console.log(res)
                    iv = res.iv
                    encryptedData = res.encryptedData
                    avater = JSON.parse(res.rawData)
                    wx.setStorage({
                      key: 'avater',
                      data: avater,
                    })

                  }
                })
                wx.setStorage({
                  key: 'code',
                  data: res.code,
                })
                if (res.code) {
                  console.log(1)
                  console.log(res.code)
                  setTimeout(function () {
                    wx.request({
                      url: app.data.urlevent + "/applogin/xcx/login.do",
                      data: {
                        code: res.code,
                        nickName: avater.nickName,
                        avatarUrl: avater.avatarUrl,
                        encryptedData: encryptedData,
                        iv: iv
                      },
                      method: 'POST',
                      header: {
                        'content-type': 'application/x-www-form-urlencoded'
                      },
                      dataType: 'json',
                      success: function (res) {
                        console.log(res.data.data);
                        wx.setStorage({
                          key: 'token',
                          data: res.data.data.token,
                        })
                        wx.setStorage({
                          key: 'userinfo',
                          data: res.data.data.user,
                        })
                        // if (res.data.data.user.phone == null ||                                                                            res.data.data.user.phone == '') {
                        //     wx.redirectTo({
                        //         url: '../bindphone/bindphone',
                        //     })
                        // } else {
                          
                        // }
                        
                      }
                    })
                  }, 500)


                }
              }
            });
          }
        }
      })
    },
    bindGetUserInfo(e) {
        var that = this;
        console.log(e.detail.userInfo)
        wx.showLoading({
          title: '加载中',
        })
        wx.getSetting({
            success(res) {
                console.log(res)
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称

                    wx.login({
                        success: function(res) {
                            wx.getUserInfo({
                                success: function(res) {
                                    console.log(res)
                                    iv = res.iv
                                    encryptedData = res.encryptedData
                                    avater = JSON.parse(res.rawData)
                                    wx.setStorage({
                                        key: 'avater',
                                        data: avater,
                                    })
                                   
                                }
                            })
                            wx.setStorage({
                                key: 'code',
                                data: res.code,
                            })
                            if (res.code) {
                              console.log(res.iv)
                                console.log(res.code)
                                setTimeout(function () {
                                    wx.request({
                                      url: app.data.urlevent + "/applogin/xcx/login.do",
                                        data: {
                                            code: res.code,
                                            nickName: avater.nickName,
                                            headimgurl: avater.avatarUrl,
                                            encryptedData:encryptedData,
                                            iv: iv
                                        },
                                        method: 'POST',
                                        header: {
                                            'content-type': 'application/x-www-form-urlencoded'
                                        },
                                        dataType: 'json',
                                        success: function (res) {
                                            console.log(res.data.data);
                                          
                                            if(res.data.status == 100){
                                              wx.hideLoading()
                                                wx.setStorage({
                                                    key: 'token',
                                                    data: res.data.data.token,
                                                })
                                              console.log(res.data.data.user);
                                                wx.setStorage({
                                                    key: 'userinfo',
                                                    data: res.data.data.user,
                                                })
                                                wx.redirectTo({
                                                    url: '../home/home'
                                                  })
                                                // if (res.data.data.user.phone == null || res.data.data.user.phone == '') {
                                                //     wx.redirectTo({
                                                //         url: '../bindphone/bindphone',
                                                //     })
                                                // } else {
                                                //   console.log(11)
                                                //   wx.switchTab({
                                                //     url: '../home/home'
                                                //   })
                                                // }
                                              
                                            }else{
                                                wx.showToast({
                                                    title: res.data.msg,
                                                    
                                                })
                                              console.log(11)
                                            }
                                        }
                                    })
                                }, 500)
                            }
                        }
                    });
                }else{
                  that.gettoken();
                   
                  console.log('取消')
                  wx.hideLoading()
                 

                }
            },
            // fail(res){
            //   console.log('取消')
            //   wx.hideLoading()
            //   wx.navigateBack({
            //     delta: 1
            //   })
            // }
        })
    },
    back:function(){
      this.gettoken();
      wx.redirectTo({
        url: '../home/home',
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
          wx.redirectTo({
            url: '../home/home',
          })
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
})