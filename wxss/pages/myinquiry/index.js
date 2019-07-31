// pages/myinquiry/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    minheight: "",
    wqts_style:"display:none",
    wqts_c_style:""
  },
    
  wqts_msg_click:function(){
      this.setData({
        wqts_style:"display:none"
      });
  },

  wqts_msg_load:function(){
    this.setData({
      wqts_style: "display:block"
    });
    var _this = this;
    var query = wx.createSelectorQuery();
    query.select('.wqts_msg .wqts_msg_c').boundingClientRect()
    query.exec(function (res) {
      _this.setData({
        wqts_c_style: "margin-top:-" + res[0].height / 2 + "px"
      });
    });

  },

  repage_click: function (e) {
    wx.navigateTo({
      url: '../userzy/index',
    })
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

    this.wqts_msg_load();

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