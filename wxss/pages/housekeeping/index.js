// pages/housekeeping/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    minheight:"",

    showdisplay3:"display:none",    
    jzfh_01_active3:"",

    showdisplay2: "display:none",
    jzfh_01_active2: "",

    showdisplay1: "display:none",
    jzfh_01_active1: ""

  },

  repage_click: function (e) {
    wx.navigateBack({
      delta: 1
    })
  },
  
  jzfh_01_click3:function(){
    if (this.data.jzfh_01_active3!="active3_on")
    {
      var _this = this;
      _this.setData({
        minheight: "min-height:auto"
      });

      var query = wx.createSelectorQuery();
      query.select('.container').boundingClientRect()
      query.exec(function (res) { 
          _this.setData({
            minheight: "min-height:" + res[0].height+"px"
          });
      })


        this.setData({
          jzfh_01_active3:"active3_on",
          showdisplay3:"display:block",

          jzfh_01_active2: "active2_off",
          showdisplay2: "display:none",

          jzfh_01_active1: "active1_off",
          showdisplay1: "display:none"
        });
    }
    else{
      this.setData({
        jzfh_01_active3: "active3_off",
        showdisplay3: "display:none"
      });
    }
  },

  jzfwsz_click3:function(){
    if (this.data.showdisplay3!="display:block")
    {
        this.setData({
          jzfh_01_active3: "active3_on",
          showdisplay3:"display:block"
        });
    }
    else
    {
      this.setData({
        jzfh_01_active3: "active3_off",
        showdisplay3: "display:none"
      });
    }
  },

  /**/
  jzfh_01_click2: function () {
    if (this.data.jzfh_01_active2 != "active2_on") {

      var _this = this;
      _this.setData({
        minheight: "min-height:auto"
      });

      var query = wx.createSelectorQuery();
      query.select('.container').boundingClientRect()
      query.exec(function (res) {
        _this.setData({
          minheight: "min-height:" + res[0].height + "px"
        });
      })

      this.setData({
        jzfh_01_active2: "active2_on",
        showdisplay2: "display:block",

        jzfh_01_active1: "active1_off",
        showdisplay1: "display:none",

        jzfh_01_active3: "active3_off",
        showdisplay3: "display:none"
      });
    }
    else {
      this.setData({
        jzfh_01_active2: "active2_off",
        showdisplay2: "display:none"
      });
    }
  },

  jzfwsz_click2: function () {
    if (this.data.showdisplay2 != "display:block") {
      this.setData({
        jzfh_01_active2: "active2_on",
        showdisplay2: "display:block"
      });
    }
    else {
      this.setData({
        jzfh_01_active2: "active2_off",
        showdisplay2: "display:none"
      });
    }
  },

  /**/
  jzfh_01_click1: function () {
    if (this.data.jzfh_01_active1 != "active1_on") {
      var _this = this;
      _this.setData({
        minheight: "min-height:auto"
      });

      var query = wx.createSelectorQuery();
      query.select('.container').boundingClientRect()
      query.exec(function (res) {
        _this.setData({
          minheight: "min-height:" + res[0].height + "px"
        });
      })
      
      this.setData({
        jzfh_01_active1: "active1_on",
        showdisplay1: "display:block",

        jzfh_01_active2: "active2_off",
        showdisplay2: "display:none",

        jzfh_01_active3: "active3_off",
        showdisplay3: "display:none"
      });
    }
    else {
      this.setData({
        jzfh_01_active1: "active1_off",
        showdisplay1: "display:none"
      });
    }
  },

  jzfwsz_click1: function () {
    if (this.data.showdisplay1 != "display:block") {
      this.setData({
        jzfh_01_active1: "active1_on",
        showdisplay1: "display:block",
      });
    }
    else {
      this.setData({
        jzfh_01_active1: "active1_off",
        showdisplay1: "display:none"
      });
    }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.getSystemInfo({
      success: function (e) {
        _this.setData({
          minheight: "min-height:" + e.screenHeight + "px"
        });
      }
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