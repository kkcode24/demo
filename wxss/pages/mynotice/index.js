// pages/mynotice/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      style:"display:none",
      gg_title:"",
      gg_info:"",
      isopen:0,
      ggxq_style:""
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

  },

  wdgg_click:function(e){
      console.log(e);
      var _title = e.currentTarget.dataset.title;
      var _info = e.currentTarget.dataset.info;
      this.setData({
          isopen:1,
          gg_title:_title,
          gg_info:_info,
          style:"display:block"
      });

      var _this = this;
      var query = wx.createSelectorQuery();
      query.select('.ggxq_c').boundingClientRect()
      query.exec(function (res) {
          _this.setData({
              ggxq_style:"margin-top:-"+res[0].height/2+"px"
          });
      });

  },

  ggxq_close:function(e){
      if(this.data.isopen==0)
      {
          this.setData({
              isopen:1,
              style:"display:block;"
          });


      }
      else{
          this.setData({
              isopen:0,
              style: "display:none;"
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