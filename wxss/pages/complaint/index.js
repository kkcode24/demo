// pages/Complaint/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    acitve:-1
  },

  repage_click: function (e) {
    wx.navigateTo({
      url: '../userzy/index',
    })
  },

  kjhb_click:function(e){
    wx.navigateTo({
      url: '../complaint_fb/index',
    })
  },

  tsjy_click:function(e){
    if (e.currentTarget.dataset.id!=this.data.acitve)
    {
        this.setData({
          acitve:e.currentTarget.dataset.id 
        });
    }
    else{
        this.setData({
          acitve:-1
        });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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