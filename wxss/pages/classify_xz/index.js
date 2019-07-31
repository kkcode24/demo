var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    minheight:"",
    classify_xz:"搬家",
    classify_yj:"",
    classify_yj_sub:"",
    data_curr:0,
    wxh_name:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var $this = this;
    wx.getSystemInfo({
      success: function (e) {
        $this.setData({
          minheight: "min-height:" + e.screenHeight + "px"
        });
      }
    });

    //获取分类列表接口
    wx.request({
      url: app.globalData.HostUrl + "/wechat/classify/loadChildClassify",
      header:app.globalData.header,
      data:{
        classifyId:0,
        classifyType:1
      },
      success:function(res){
        console.log("/wechat/classify/loadChildClassify");
        console.log(res);
        var _classify_yj=new Array();
        for (var i = 0; i < res.data.length;i++)
        {
          _classify_yj.push({ "key": i, "classifyName": res.data[i].classifyName, "classifyNo": res.data[i].classifyNo, "classifyType": res.data[i].classifyType, "deleteFlag": res.data[i].deleteFlag, "iconurl": res.data[i].iconurl, "id": res.data[i].id, "orderBy": res.data[i].orderBy, "orderSon": res.data[i].orderSon, "parentId": res.data[i].parentId, "showFlag": res.data[i].showFlag});
        }
        $this.setData({
          classify_yj: _classify_yj
        });

        //默认子分类
        $this.getclassify(res.data[0].id,res.data[0].classifyType);

      }
    })

    //获取微信号
    wx.request({
      url: app.globalData.HostUrl +"/wechat/classify/getWechat",
      header:app.globalData.header,
      success:function(res){
        console.log("/wechat/classify/getWechat");
        console.log(res);
        $this.setData({
          wxh_name: res.data.wechat
        });
      }
    })

  },

  //获取子分类列表接口
  getclassify: function (classifyId, classifyType){
    var $this = this;
    wx.request({
      url: app.globalData.HostUrl + "/wechat/classify/loadChildClassify",
      header: app.globalData.header,
      data: {
        classifyId: classifyId,
        classifyType: classifyType
      },
      success: function (res) {
        console.log("/wechat/classify/loadChildClassify  子分类");
        console.log(res);
        var _classify_yj = new Array();
        for (var i = 0; i < res.data.length; i++) {
          _classify_yj.push({ "key": i, "classifyName": res.data[i].classifyName, "classifyNo": res.data[i].classifyNo, "classifyType": res.data[i].classifyType, "deleteFlag": res.data[i].deleteFlag, "iconurl": res.data[i].iconurl, "id": res.data[i].id, "orderBy": res.data[i].orderBy, "orderSon": res.data[i].orderSon, "parentId": res.data[i].parentId, "showFlag": res.data[i].showFlag });
        }
        $this.setData({
          classify_yj_sub: _classify_yj
        });
      }
    })
  },

  classify_click:function(e){
    var $this = this;
    var classifyId = e.currentTarget.dataset.id;
    var classifyType = e.currentTarget.dataset.classifytype;
    var key = e.currentTarget.dataset.key;
    $this.setData({
      data_curr:key
    });
    console.log(classifyId + "===" + classifyType);
    $this.getclassify(classifyId, classifyType);
  },

  classify_xz_re:function(e){
    var $this = this;
    wx.redirectTo({
      url: '../classify_fb/index?id=' + e.currentTarget.dataset.id + '&name=' + e.currentTarget.dataset.value,
    })
  },




  copyz_click:function(e){
    var $this = this;
    var _val = e.currentTarget.dataset.val;
    console.log(e);
    wx.setClipboardData({
      data: _val,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data            
          }
        })
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