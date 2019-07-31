var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId:"-1",
    goodsCover:"",
    goodsName:"",
    goodsPrice:"",
    goodsProfile:"",
    merchantId:"",
    records:"",
    records_num:0,
    input_value:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var $this = this;
    $this.setData({
      goodsId: options.goodsId,
      merchantId: options.merchantId
    });

    //获取产品信息
    wx.request({
      url: app.globalData.HostUrl +"/wechat/merchant/goods/detail",
      header:app.globalData.HostUrl,
      data: { goodsId:options.goodsId},
      success:function(res){
        console.log("/wechat/merchant/goods/detail");
        console.log(res);
        var res_data = res.data.data;
        $this.setData({
          goodsCover: res_data.goodsCover,
          goodsName: res_data.goodsName,
          goodsPrice: res_data.goodsPrice,
          goodsProfile: res_data.goodsProfile
        });
      }
    })

    //获取留言列表
    wx.request({
      url: app.globalData.HostUrl +"/wechat/leavemsg/merchant/list",
      header:app.globalData.header,
      data:{
        "merchantId": $this.data.merchantId
      },
      success:function(res){
        console.log("/wechat/leavemsg/merchant/list");
        console.log(res);
        $this.setData({
          records: res.data.records,
          records_num:res.data.records.length
        });
      }
    })
  },

  inputs: function (e) {
    var $this = this;
    var value = e.detail.value;
    $this.setData({
      input_value: value
    });
  },

  fblx_click:function(){
    var $this = this;
    if($this.data.input_value !="")
    {
        wx.request({
          url: app.globalData.HostUrl +"/wechat/leavemsg/merchant/addLeaveMsg",
          header:app.globalData.header,
          data:{
            "context":$this.data.input_value,
            "merchantId":$this.data.merchantId
          },
          success:function(res){
            console.log("/wechat/leavemsg/merchant/addLeaveMsg");
            console.log(res);
            wx.showModal({
              title: '提示',
              content: '留言成功',
              showCancel:false,
              success:function(res){
                $this.onLoad({ goodsId:$this.data.goodsId, merchantId: $this.data.merchantId });
              }
            })
          }
        })
    }
  },

  repage_click: function (e) {
    wx.navigateBack({
      delta: 1
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