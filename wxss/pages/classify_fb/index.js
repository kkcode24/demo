var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fbxx_data: 1,
    phone: "",
    address: "",
    upimg_list: "",
    picNum: 0,
    input_num: 0,
    input_value: "",
    classify_xz:"请选择分类",
    classify_id:-1
  },

  relink_click: function () {
    wx.redirectTo({
      url: '../classify/index',
    })
  },

  classify_xz_click:function(e){
    wx.navigateTo({
      url: '../classify_xz/index'
    })
  },

  fbxx_click: function (e) {
    if (this.data.fbxx_data == 1) {
      this.setData({
        fbxx_data: 0
      });
    }
    else {
      this.setData({
        fbxx_data: 1
      });
    }
  },

  inputs: function (e) {
    var $this = this;
    var value = e.detail.value;
    var len = parseInt(value.length);
    $this.setData({
      input_num: len,
      input_value: value
    });
  },

  chooseImage: function (e) {
    var $this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log("chooseImage");
        console.log(e.currentTarget.dataset.id);
        var temlist = new Array();
        for (var i = 0; i < $this.data.upimg_list.length; i++) {
          if (e.currentTarget.dataset.id == $this.data.upimg_list[i].id) {
            temlist.push({ "id": $this.data.upimg_list[i].id, "src": res.tempFilePaths });
          }
          else {
            temlist.push({ "id": $this.data.upimg_list[i].id, "src": $this.data.upimg_list[i].src });
          }
        }
        $this.setData({
          picNum: $this.data.upimg_list.length
        });
        if ($this.data.upimg_list.length < 9) {
          temlist.push({ "id": $this.data.upimg_list.length, "src": "https://www.chengshishe.com/club/static/upimg/fbcs_01.jpg" });
        }

        console.log(temlist);
        $this.setData({
          upimg_list: temlist
        });

      },
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var $this = this;
    var _id = options.id;
    var _name=options.name;  
    console.log("fb_aaaa");
    console.log(_id+"==="+_name);
    if (_id != "undefined" && _name !="undefined")
    {
        if(_id!=-1&&_name !=-1)
        {
          $this.setData({
            classify_id:_id,
            classify_xz:_name
          });
        }
    }

    var temlist = new Array();
    temlist.push({ "id": 0, "src": "https://www.chengshishe.com/club/static/upimg/fbcs_01.jpg" });
    $this.setData({
      phone: app.globalData.phone,
      address: app.globalData.formatted_address,
      upimg_list: temlist
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