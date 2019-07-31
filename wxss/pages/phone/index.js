
var app = getApp();

Page({

  data: {
    canIUse: wx.canIUse('button.open-type.getPhoneNumber'),
    url:""
  },

  repage_click:function(){
    wx.navigateBack({
      delta:1
    })
  },

  getPhoneNumber:function(e){
    var $this =this;
    console.log(e.detail.errMsg);
    if (e.detail.errMsg == "getPhoneNumber:ok"){
      app.getphone(e,$this.data.url);
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var $this = this;
    $this.setData({
      url: options.re_url
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