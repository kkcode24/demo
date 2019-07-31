// pages/userzy/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    minheight: "",
    jbfwkf_style:"display:none",
    jbfwkf_c_style:"",

    jbfwjszc_style:"display:none",
    jbfwjszc_c_style:""
  },
  
  jbfwkf_close_click:function(e){
      this.setData({
        jbfwkf_style:"display:none"
      });
  },

  sjkh_click:function(e){
      var _this =this;
      _this.setData({
        jbfwkf_style: "display:block"
      });
      var query = wx.createSelectorQuery();
      query.select('.jbfwkf_msg .jbfwkf_msg_c').boundingClientRect()
      query.exec(function (res) {
        _this.setData({
          jbfwkf_c_style: "margin-top:-" + res[0].height / 2 + "px"
        });
      });
  },

  jbfwjszc_close_click: function (e) {
    this.setData({
      jbfwjszc_style: "display:none"
    });
  },

  jbfwjszc_click: function (e) {
    var _this = this;
    _this.setData({
      jbfwjszc_style: "display:block"
    });
    var query = wx.createSelectorQuery();
    query.select('.jbfwjszc_msg .jbfwjszc_msg_c').boundingClientRect()
    query.exec(function (res) {
      _this.setData({
        jbfwjszc_c_style: "margin-top:-" + res[0].height / 2 + "px"
      });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var _this = this;
      wx.getSystemInfo({
        success: function (e) {
          _this.setData({
            minheight: "min-height:" + e.screenHeight + "px"
          });
        }
      });
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

  }
})