var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    minheight: "",
    infoId:0,
    classifyId:-1,
    merchantAvatar:"",
    merchantName:"",
    context:"",
    infoAddress:"",
    merchantStarFlag:"1",
    tjxx_list:"",
    leavemsg:"",
    leavemsg_num:0,
    input_value:""
  },

  repage_click: function (e) {
    wx.navigateBack({
      delta: 1
    })
  },

  inputs: function (e) {
    var $this = this;
    var value = e.detail.value;
    var len = parseInt(value.length);
    $this.setData({
      input_value: value
    });
  },

  addLeaveMsg: function (e) {
    var $this = this;
    if ($this.data.input_value != "") {
      wx.request({
        url: app.globalData.HostUrl + "/wechat/leavemsg/classify/addLeaveMsg",
        header: app.globalData.HostUrl,
        data: {
          "infoId": $this.data.infoId,
          "context": $this.data.input_value
        },
        success: function (res) {
          console.log("/wechat/leavemsg/classify/addLeaveMsg");
          console.log(res);
          wx.showModal({
            title: '提示',
            content: '留言成功',
            showCancel: false,
            success: function (res) {
              $this.onLoad({ infoId: $this.data.infoId, classifyId: $this.data.classifyId });
            }
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var $this = this;
    wx.getSystemInfo({
      success: function (e) {
        $this.setData({
          minheight: "min-height:" + e.screenHeight + "px",
          infoId: options.infoId,
          classifyId: options.classifyId
        });
      }
    });
    //获取分类信息详情
    wx.request({
      url: app.globalData.HostUrl + "/wechat/classify/info/detail",
      header:app.globalData.header,
      data:{
        "infoId":$this.data.infoId
      },
      success:function(res){
        console.log("/wechat/classify/info/detail");
        console.log(res);
        $this.setData({
          merchantAvatar: res.data.data.merchantAvatar,
          merchantName: res.data.data.merchantName,
          createTime: res.data.data.createTime,
          browseCount: res.data.data.browseCount,
          classifySecondName: res.data.data.classifySecondName,
          context: res.data.data.context,
          infoAddress: res.data.data.infoAddress,
          merchantStarFlag: res.data.data.merchantStarFlag
        });

      }
    })

    //分类信息详情推荐列表
    wx.request({
      url: app.globalData.HostUrl +"/wechat/classify/info/detailSuggest",
      header:app.globalData.header,
      data:{
        "nowpage":1,
        "pagesize":10,
        "sortBy":1,
        "classifyId": $this.data.classifyId,
        "key":"",
        "filterType":1,
        "filterRule":"24h"
      },
      success:function(res){
        console.log("/wechat/classify/info/detailSuggest");
        console.log(res);
        $this.setData({
          tjxx_list:res.data.data
        });
      }
    })

    //留言列表
    wx.request({
      url: app.globalData.HostUrl +"/wechat/leavemsg/classify/list",
      header:app.globalData.header,
      data:{
        "infoId":$this.data.infoId
      },
      success:function(res){
        console.log("/wechat/leavemsg/classify/list");
        console.log(res);
        $this.setData({
          leavemsg_num: res.data.records.length,
          leavemsg:res.data.records
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