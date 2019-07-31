// pages/myadvert_fb_xz/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    minheight: "",
    pc_style:-1,
    curr:-1
  },

  repage_click: function (e) {
    wx.navigateBack({
      delta: 1
    })
  },
  
  pcli_click:function(e){
      console.log(e);
      var _this =this;
      if (e.currentTarget.dataset.id!=_this.data.curr)
      {
        _this.setData({
              curr:e.currentTarget.dataset.id,
              pc_style:e.currentTarget.dataset.id
          });
      }
      else{
        _this.setData({
            curr: -1,
            pc_style: -1
          });
      }
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