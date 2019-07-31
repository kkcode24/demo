var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    merchantId:"-1",
    merchantAvatar:"",
    merchantName:"",
    merchantAddress:"",
    starUserCount:"",
    userStars:"",
    merchantServes:"",
    cplist:"",//产品列表
    trackId:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var $this = this;
      $this.setData({
        merchantId: options.merchantId
      });

      //获取用户信息
      wx.request({
        url: app.globalData.HostUrl +"/wechat/merchant/detail",
        data: { merchantId: options.merchantId},
        header:app.globalData.header,
        success:function(res){
          console.log("/wechat/merchant/detail");
          console.log(res);
          var _userStars = "";
          if (res.data.data.userStars ==null)
          {
            _userStars =-1;
          }
          else{
            _userStars = res.data.data.userStars;
            var _tempUS=new Array();
            if (_userStars.length>5)
            {
              for (var i = 0; i < 5; i++) {
                _tempUS.push({ "key": i, "src": _userStars[i] });
              }
            }
            else{
              for (var i = 0; i < _userStars.length; i++) {
                _tempUS.push({ "key": i, "src": _userStars[i] });
              }
            }
            
            _userStars = _tempUS;
          }

          var _merchantServes="";
          if (res.data.data.merchantServes == null) {
            _merchantServes = -1;
          }
          else {
            _merchantServes = res.data.data.merchantServes;
            var _temp_mer = new Array();
            for (var i = 0; i < _merchantServes.length; i++) {
              _temp_mer.push({ "key": i, "name": _merchantServes[i] });
            }
            _merchantServes = _temp_mer;
          }

          $this.setData({
            merchantAvatar: res.data.data.merchantAvatar,
            merchantName: res.data.data.merchantName,
            merchantAddress: res.data.data.merchantAddress,
            starUserCount: res.data.data.starUserCount,
            userStars:_userStars,
            merchantProfile: res.data.data.merchantProfile,
            openHours: res.data.data.openHours,
            merchantServes: _merchantServes
          });
        }
      })

      //产品列表
      wx.request({
        url: app.globalData.HostUrl +"/wechat/merchant/goods/list",
        data: { merchantId:$this.data.merchantId},
        header:app.globalData.header,
        success:function(res){
          console.log("/wechat/merchant/goods/list");
          console.log(res);
          var _cplist = "";
          if(res.data.data.length ==0)
          {
              _cplist=-1;
          }
          else{
            _cplist = res.data.data;
          }
          $this.setData({
            cplist:_cplist
          });
        }
      })

  },

  //点击关注
  gz_click:function(){
      var $this = this;
      if($this.data.trackId==-1){
        wx.request({
          url: app.globalData.HostUrl + "/wechat/track/merchant/doStar",
          data: { merchantId: $this.data.merchantId },
          method: "post",
          header: app.globalData.header,
          success: function (res) {
            console.log("/wechat/track/merchant/doStar");
            console.log(res);
            $this.setData({
              trackId: res.data.data.trackId
            });
          }
        })
      }
      
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  repage_click:function(e){
      wx.navigateBack({
        delta:1
      })
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