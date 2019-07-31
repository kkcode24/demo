
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    in_src: "https://www.chengshishe.com/club/static/upimg/cs_01.jpg",
    in_02_txt_width: "",
    address: "高港",
    curtab: "1",
    userNum:"0",
    csNum:"0",
    zxNum:"0",
    records:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var $this = this;

    wx.setNavigationBarTitle({
      title: '城事社'
    })

    $this.setData({
      title: '城事社'
    });

    wx.createSelectorQuery().selectAll('.in_02 .wrap_c').boundingClientRect(function (rect) {
      var input_width = "width:" + (rect[0].width - 30) + "px;padding:0px 15px;";
      $this.setData({
        in_02_txt_width: input_width,
        address: app.globalData.City
      });
    }).exec()

    //获取用户等数据
    wx.request({
      url: app.globalData.HostUrl + "/wechat/cityinfo/index",
      success: function (e) {
        console.log("/wechat/cityinfo/index");
        console.log(e);
        $this.setData({
          userNum: app.unitConvert(e.data.data.cityStatistics.userCount),
          csNum: app.unitConvert(e.data.data.cityStatistics.infoCount),
          zxNum: app.unitConvert(e.data.data.cityStatistics.onlineCount),
          address: app.globalData.City
        });
      }
    })
    
    //获取列表
    $this.reslist(1,10,1);



  },

  click_in05: function (e) {
    var $this = this;
    var _curtab = e.currentTarget.dataset.curtab;
    $this.setData({
      curtab: _curtab
    });
    //调取列表数据
    $this.reslist(1, 10, _curtab);
  },
  
  reslist: function (nowpage, pagesize, sortBy) {
    var $this = this;
    var _data = { "nowpage": nowpage, "pagesize": pagesize, "sortBy": sortBy };
    wx.request({
      url: app.globalData.HostUrl + "/wechat/cityinfo/list",
      data: _data,
      header: app.globalData.header,
      method: 'GET',
      success: function (res) {
        console.log("/wechat/cityinfo/list");
        console.log(res);
        $this.setData({
          records: res.data.records
        });

      }
    })

  },

  cellphone: function (e) {
    var calltel = e.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: calltel
    });
  },

  link_fb:function(e){
    app.isphone('../city_even_fb/index');
  },

  cityeven_click:function(e){
    var $this = this;
    var infoId = e.currentTarget.dataset.infoid;
    wx.navigateTo({
      url: '../city_even_xq/index?infoId=' + infoId
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