// pages/signin/index.js

const MONTHS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'June.', 'July.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    str: MONTHS[new Date().getMonth()],
    days_style: []
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
    const days_count = new Date(this.data.year, this.data.month, 0).getDate();
    let days_style = new Array;
    for (let i = 1; i <= days_count; i++) {
      if (i == 12) {
        days_style.push({
          month: 'current', day: i, color: '#fff', background: '#ffc342'
        });
      } else if (i == 16) {
        days_style.push({
          month: 'current', day: i, color: '#fff', background: '#1a9af7'
        });
      } else if (i == 21) {
        days_style.push({
          month: 'current', day: i, color: '#fff', background: '#dadada'
        });
      } else {
        days_style.push({
          month: 'current', day: i, color: '#7b8a97'
        });
      }
    }
    this.setData({
      days_style
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