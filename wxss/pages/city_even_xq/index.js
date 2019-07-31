var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoId:"",
    input_value:"",
    userAvatar:"",
    userNickName:"",
    createTime:"",
    browseCount:"",
    context:"",
    infoAddress:"",
    infoImgs: [],
    records:"",
    records_num:0
  },

  userinfo_click:function(e){
      wx.navigateTo({
        url: '../userinfo/index',
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var $this = this;
      $this.setData({
        infoId: options.infoId
      });

      //获取城市信息
      wx.request({
        url: app.globalData.HostUrl +"/wechat/cityinfo/detail",
        header: app.globalData.header,
        data:{
          "infoId": $this.data.infoId
        },
        method: 'GET',
        success:function(res){
          console.log("/wechat/cityinfo/detail");
          console.log(res);
          $this.setData({
            userAvatar: res.data.data.userAvatar,
            userNickName: res.data.data.userNickName,
            createTime: res.data.data.createTime,
            context: res.data.data.context,
            infoAddress: res.data.data.infoAddress,
            browseCount: res.data.data.browseCount,
            infoImgs: res.data.data.infoImgs
          });
        }
      })

      //获取留言列表信息
      wx.request({
        url: app.globalData.HostUrl + "/wechat/leavemsg/info/list",
        header: app.globalData.header,
        data:{
          infoId:$this.data.infoId
        },
        method:"GET",
        success:function(res){
          console.log("/wechat/leavemsg/info/list");
          console.log(res);
          $this.setData({
            records: res.data.records,
            records_num:res.data.total,
          });
        }
      })

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

  addLeaveMsg:function(e){
    var $this = this;    
    if($this.data.input_value!="")
    {
      wx.request({
        url: app.globalData.HostUrl +"/wechat/leavemsg/info/addLeaveMsg",
        header: app.globalData.header,
        data:{
          "infoId":$this.data.infoId,
          "context":$this.data.input_value
        },
        success:function(res){
          console.log("/wechat/leavemsg/info/addLeaveMsg");
          console.log(res);
          if (res.statusCode == 200) {

            var data = res.data;
            wx.showModal({
              title: '提示',
              content: data.msg,
              showCancel: false,
              success: function (res) {
                $this.setData({
                  input_value: ''
                });
                $this.onLoad({ infoId: $this.data.infoId });
              }
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '操作异常',
              showCancel: false,
              success: function (res) {
              }
            })
          }
         
        }
      })
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