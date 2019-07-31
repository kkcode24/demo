var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ptype:1
  },

  repage_click: function (e) {
    wx.redirectTo({
      url: '../userzy/index',
    })
  },

  kjhb_click:function(e){
    var $this = this;
    if ($this.data.ptype==1)
    {
        wx.navigateTo({
          url: '../myseller_kj_hb_fb/index',
        })
    }
    else{
        wx.navigateTo({
          url: '../myseller_kj_psq_fb/index',
        })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var $this = this;
      if (options.page!=undefined)
      {
          $this.setData({
            ptype:options.page
          });
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