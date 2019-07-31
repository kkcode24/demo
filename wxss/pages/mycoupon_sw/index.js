// pages/mycoupon_sw/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    minheight: "",
    li_currid: -1,
    licp_id: -1
  },

  repage_click: function (e) {
    wx.redirectTo({
      url: '../userzy/index',
    })
  },
  
  licp_click: function (e) {
    if (this.data.licp_id != e.currentTarget.dataset.id) {
      this.setData({
        li_currid: e.currentTarget.dataset.id,
        licp_id: e.currentTarget.dataset.id
      });
    } else {
      this.setData({
        li_currid: -1,
        licp_id: -1
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