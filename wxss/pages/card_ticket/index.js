var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    li_currid:-1,
    licp_id:-1,
    records:"",
    cardton:1
  },

  repage_click: function (e) {
    wx.navigateBack({
      delta: 1
    })
  },

  card_lq_click:function(){
    wx.navigateTo({
      url: '../card_ticket_xq/index',
    })
  },
  
  licp_click:function(e){
    if (this.data.licp_id != e.currentTarget.dataset.id)
    {
      this.setData({
        li_currid: e.currentTarget.dataset.id,
        licp_id: e.currentTarget.dataset.id
      });
    }else{
      this.setData({
        li_currid:-1,
        licp_id: -1
      });
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var $this = this;
      $this.relist(1);
  },

  cardt_02_click:function(e){
      var $this =this;
      var curid=e.currentTarget.dataset.id;
      $this.setData({
        cardton:curid
      });
    $this.relist(curid);
  },

  relist: function (_couponType){
    var $this = this;
    wx.request({
      url: app.globalData.HostUrl +"/wechat/coupon/list",
      header:app.globalData.header,
      data:{
        "couponType": _couponType
      },
      success:function(res){
        console.log("/wechat/coupon/list");
        console.log(res);
        $this.setData({
          records: res.data.records
        });
      }
    })
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