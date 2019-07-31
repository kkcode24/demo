var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fbxx_data: 1,
    phone:"",
    address:"",
    upimg_list:"",
    picNum:0,
    input_num:0,
    input_value:""
  },

  fbxx_click:function(e){ 
    if (this.data.fbxx_data==1)
      {     
        this.setData({
          fbxx_data:0
        });
      }
      else{          
      this.setData({
        fbxx_data: 1
      });
      }
  },

  chooseImage:function(e){
      var $this=this;

      if ($this.data.upimg_list.length >= 9) {

        wx.showModal({
          title: '错误提示',
          content: '上传图片超过最大数量',
          showCancel: false,
          success: function (res) { }
        })

      }
      
    app.upload_file_single(1, function(file, res){

      var temlist = new Array();
      for (var i = 0; i < $this.data.upimg_list.length; i++) {
        if (e.currentTarget.dataset.id == $this.data.upimg_list[i].id) {
          temlist.push({ "id": $this.data.upimg_list[i].id, "src": res.fullpath, "filename": res.filename });
        }
        else {
          temlist.push({ "id": $this.data.upimg_list[i].id, "src": $this.data.upimg_list[i].src, "filename": $this.data.upimg_list[i].filename });
        }
        
      }

      $this.setData({
        'picNum': $this.data.upimg_list.length,
      });

      if ($this.data.upimg_list.length < 9) {
        temlist.push({ "id": $this.data.upimg_list.length, "src": "https://www.chengshishe.com/club/static/upimg/fbcs_01.jpg" });
      }

      $this.setData({
        'upimg_list': temlist
      });
    });

  },

  inputs:function(e){
    var $this=this;
    var value = e.detail.value;
    var len = parseInt(value.length);
    $this.setData({
      input_num:len,
      input_value:value
    });
  },

  city_even_fb_click:function(e){
    var $this = this;
    if ($this.data.input_value!="")
    { 
      var uplist = new Array();
      for (var i = 0; i < $this.data.upimg_list.length - 1; i++) {
        if ($this.data.upimg_list.length != 9) {
          uplist.push($this.data.upimg_list[i].filename);
        }
      }
      var data = {
         "context": $this.data.input_value, 
         "displayMobile": $this.data.fbxx_data == 0 ? 1 : 2, 
         "address": $this.data.address,
         "infoPics": uplist.join(",") 
         };
      wx.request({
        url: app.globalData.HostUrl +"/wechat/cityinfo/add",
        method: "POST",
        data:data,
        header:app.globalData.header,
        success:function(res){
          console.log("/wechat/cityinfo/add");
          console.log(res);
          if (res.data.msg =="发布成功")
          {
            wx.showModal({
              title: '提示',
              content: '发布成功',
              showCancel:false,
              success:function(res){
                wx.redirectTo({
                  url: '../city_even/index',
                })
              }
            })
          }else{
            wx.showModal({
              title: '提示',
              content: '发布失败',
              showCancel: false,
              success: function (res) {
                wx.redirectTo({
                  url: '../city_even/index',
                })
              }
            })
          }
        }
      })
    }
  },

  relink_click:function(){
    wx.redirectTo({
      url: '../city_even/index',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var $this = this;
      console.log("cityeven_fb");

      var temlist=new Array();
      temlist.push({ "id":0, "src": "https://www.chengshishe.com/club/static/upimg/fbcs_01.jpg" });
      $this.setData({
        phone:app.globalData.phone,
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