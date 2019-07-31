var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    in_src:"https://www.chengshishe.com/club/static/upimg/banner_01.jpg",
    in_02_txt_width:"",
    address:"高港",
    curtab:"1",
    userNum:"",
    sjNum:"",
    cpNum:"",
    classifyBmhb_name:null,
    classifyBmhb_iconurl:null,
    classifyBmhb_id:0,
    classifyList:null,
    records:{}
  },

  click_in05:function(e){
    var $this = this;
    var _curtab = e.currentTarget.dataset.curtab;
    $this.setData({
      curtab:_curtab
    });
    //调取列表数据
    $this.reslist(1, 10, _curtab);
  },

  sj_click:function(e){
    var $this = this;
    var merchantId = e.currentTarget.dataset.merchantid;
    wx.navigateTo({
      url: '../seller/index?merchantId='+merchantId
    })
  },

  onLoad: function (options) {
    var $this = this;

    wx.setNavigationBarTitle({
      title: '城事社 • 商家'
    })

    $this.setData({
      title: '城事社 • 商家'
    });
    
    wx.createSelectorQuery().selectAll('.in_02 .wrap_c').boundingClientRect(function (rect) {
      var input_width = "width:" + (rect[0].width - 30) +"px;padding:0px 15px;";
      //console.log(input_width);
      $this.setData({
        in_02_txt_width: input_width
      });
    }).exec()
    
    //获取用户等数据
    wx.request({
      url: app.globalData.HostUrl +"/wechat/merchant/index",
      success:function(e){
          console.log("/wechat/merchant/index");
          console.log(e);
          $this.setData({
            userNum: app.unitConvert(e.data.data.cityStatistics.userCount),
            sjNum: app.unitConvert(e.data.data.cityStatistics.merchantCount),
            cpNum: app.unitConvert(e.data.data.cityStatistics.goodsCount),
            classifyBmhb_name: e.data.data.classifyBmhb.classifyName,
            classifyBmhb_iconurl: e.data.data.classifyBmhb.iconurl,
            classifyBmhb_id: e.data.data.classifyBmhb.classifyId,
            classifyList: e.data.data.classifyList,
            address: app.globalData.City
          });
      }
    })

    //调取默认列表数据
    $this.reslist(1,10,1);

  },

  reslist: function (nowpage, pagesize, sortBy){
    var $this = this;
    var _data = { "nowpage": nowpage, "pagesize": pagesize, "sortBy": sortBy };
    wx.request({
      url: app.globalData.HostUrl +"/wechat/merchant/list",
      data: _data,
      header:app.globalData.header,
      method: 'GET',
      success: function(res) {
        console.log("/wechat/merchant/list");
        console.log(res);
        if (res.data.records != undefined){
          $this.setData({
            records: res.data.records
          });
        }
        else{
          $this.setData({
            records:[{"id":"-1"}]
          });
        }
      },
      fail:function(res){
          console.log(res);
      }
    })

  },
  
  cellphone:function(e){
    var calltel =e.currentTarget.dataset.tel;
    wx.makePhoneCall({ 
      phoneNumber:calltel
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