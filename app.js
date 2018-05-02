
// 获取leancloud对象并初始化
const AV = require('./utils/av-weapp-min.js');
const APP_ID ="or8f3HDsqH2jRaEt77jxFV1e-gzGzoHsz";
const APP_KEY ="4GGfYgkML0QGI66kqYl0oq4d";
AV.init({
  appId:APP_ID,
  appKey:APP_KEY
});

//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 获取用户数据，发送到leancloud后台，若该用户不存在，则存储该用户数据
              console.log(res.userInfo);
              let UserInfo = AV.Object.extend('UserInfo');
              console.log(AV);
              let userInfo=new UserInfo();
              console.log(userInfo);
              userInfo.set("avatarUrl",res.userInfo.avatarUrl);
              userInfo.set("nickName",res.userInfo.nickName);
              userInfo.set("gender",res.userInfo.gender);
              userInfo.set("language",res.userInfo.language);
              userInfo.set("city",res.userInfo.city);
              userInfo.set("province",res.userInfo.province);
              userInfo.save().then(function(user){
                console.log("save successful!");
                console.log("object ID is： "+user.id);
              },function(error){
                console.log("save failed!");
                console.log(error);
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})