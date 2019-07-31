// pages/exchange/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    minheight:"",

    showdisplay4: "display:none",
    jzfh_01_active4: "",

    showdisplay3: "display:none",
    jzfh_01_active3: "",

    showdisplay2: "display:none",
    jzfh_01_active2: "",

    showdisplay1: "display:none",
    jzfh_01_active1: ""
  },

  repage_click: function (e) {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var $this = this;
    wx.getSystemInfo({
      success: function (e) {
        $this.setData({
          minheight: "min-height:" + e.screenHeight + "px",
          infoId: options.infoId,
          classifyId: options.classifyId
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