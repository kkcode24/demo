var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    in_src: "https://www.chengshishe.com/club/static/upimg/fl_04.jpg",
    in_02_txt_width: "",
    address: "高港",
    curtab: "1",
    userNum:"",
    xxNum:"",
    zxNum:"",
    classifyBmhb_iconurl:"",
    classifyBmhb_classifyName:"",
    classifyBmhb_id:0,
    classifyList:"",
    records:"",
    classifyId:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var $this = this;

    wx.setNavigationBarTitle({
      title: '城事社 • 分类'
    })

    $this.setData({
      title: '城事社 • 分类'
    });

    wx.createSelectorQuery().selectAll('.in_02 .wrap_c').boundingClientRect(function (rect) {
      var input_width = "width:" + (rect[0].width - 30) + "px;padding:0px 15px;";
      //console.log(input_width);
      $this.setData({
        in_02_txt_width: input_width,
        address: app.globalData.City
      });
    }).exec()

    //获取用户等数据
    wx.request({
      url: app.globalData.HostUrl + "/wechat/classify/index",
      success: function (e) {
        console.log("/wechat/classify/index");
        console.log(e);
        $this.setData({
          userNum: app.unitConvert(e.data.data.cityStatistics.userCount),
          xxNum: app.unitConvert(e.data.data.cityStatistics.infoCount),
          zxNum: app.unitConvert(e.data.data.cityStatistics.onlineCount),
          classifyBmhb_iconurl: e.data.data.classifyBmhb.iconurl,
          classifyBmhb_classifyName: e.data.data.classifyBmhb.classifyName,
          classifyBmhb_id: e.data.data.classifyBmhb.classifyId,
          classifyList: e.data.data.classifyList
        });
        
      }
    })

    //获取列表
    $this.reslist(1, 10, 1, $this.data.classifyId, "", 1,"24h");

    
  },

  click_in05:function(e){
    var $this = this;
    var tabid = e.currentTarget.dataset.curtab;
    $this.setData({
      curtab:tabid
    });
    $this.reslist(1, 10, tabid, $this.data.classifyId, "", 1, "24h");
  },

  linkxq_click:function(e){
    var $this = this;
    var _infoId = e.currentTarget.dataset.infoid;
    var _classifyId = e.currentTarget.dataset.classifyid;
    wx.navigateTo({
      url: '../housekeeping_xq/index?infoId=' + _infoId + '&classifyId=' + _classifyId,
    })
  },


  reslist: function (nowpage, pagesize, sortBy, classifyId, key, filterType, filterRule) {
    var $this = this;
    var _data = { "nowpage": nowpage, "pagesize": pagesize, "sortBy": sortBy, "classifyId": classifyId, "key": key, "filterType": filterType, "filterRule": filterRule };
    wx.request({
      url: app.globalData.HostUrl + "/wechat/classify/info/list",
      data: _data,
      header: app.globalData.header,
      method: 'GET',
      success: function (res) {
        console.log("/wechat/classify/info/list");
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

  link_fb: function (e) {
    app.isphone('../classify_fb/index');
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