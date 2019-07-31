var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Animation1:"",
    Animation2:"",

    Animation3: "",
    Animation4: "",
    
    Animation5: "",
    Animation6: "",

    Animation7: "",
    Animation8: "",

    Animation9: "",
    Animation10: "",

    Animation11: "",
    Animation12: "",

    Animation13: "",
    Animation14: "",

    Animation15: "",
    Animation16: "",

    Animation17: "",
    Animation18: ""
  },

  kj_click:function(e){
    wx.navigateTo({
      url: '../card_ticket/index',
    })
  },

  redpk_click1:function(e){
    let options = {
      duration: 100,
      timingFunction: 'ease-in'
    }
    var an_01 = wx.createAnimation(options);
    an_01.opacity(0).step();
    var an_02 = wx.createAnimation(options);
    an_02.opacity(1).step();
    this.setData({
      Animation1: an_01.export(),
      Animation2: an_02.export()
    })
    
    var _type = e.currentTarget.dataset.type;
    setTimeout(function(){
        if (_type == 1)//1普通2拼手气
        {
          wx.navigateTo({
            url: '../red_packet_pt/index'
          })
        }
        else{
          wx.navigateTo({
            url: '../red_packet_sq/index'
          })
        }
    },500);

  },

  redpk_click2: function (e) {
    let options = {
      duration: 100,
      timingFunction: 'ease-in'
    }
    var an_01 = wx.createAnimation(options);
    an_01.opacity(0).step();
    var an_02 = wx.createAnimation(options);
    an_02.opacity(1).step();
    this.setData({
      Animation3: an_01.export(),
      Animation4: an_02.export()
    })

    var _type = e.currentTarget.dataset.type;
    setTimeout(function () {
      if (_type == 1)//1普通2拼手气
      {
        wx.navigateTo({
          url: '../red_packet_pt/index'
        })
      }
      else {
        wx.navigateTo({
          url: '../red_packet_sq/index'
        })
      }
    }, 500);

  },

  redpk_click3: function (e) {
    let options = {
      duration: 100,
      timingFunction: 'ease-in'
    }
    var an_01 = wx.createAnimation(options);
    an_01.opacity(0).step();
    var an_02 = wx.createAnimation(options);
    an_02.opacity(1).step();
    this.setData({
      Animation5: an_01.export(),
      Animation6: an_02.export()
    })

    var _type = e.currentTarget.dataset.type;
    setTimeout(function () {
      if (_type == 1)//1普通2拼手气
      {
        wx.navigateTo({
          url: '../red_packet_pt/index'
        })
      }
      else {
        wx.navigateTo({
          url: '../red_packet_sq/index'
        })
      }
    }, 500);

  },

  redpk_click4: function (e) {
    let options = {
      duration: 100,
      timingFunction: 'ease-in'
    }
    var an_01 = wx.createAnimation(options);
    an_01.opacity(0).step();
    var an_02 = wx.createAnimation(options);
    an_02.opacity(1).step();
    this.setData({
      Animation7: an_01.export(),
      Animation8: an_02.export()
    })

    var _type = e.currentTarget.dataset.type;
    setTimeout(function () {
      if (_type == 1)//1普通2拼手气
      {
        wx.navigateTo({
          url: '../red_packet_pt/index'
        })
      }
      else {
        wx.navigateTo({
          url: '../red_packet_sq/index'
        })
      }
    }, 500);

  },

  redpk_click5: function (e) {
    let options = {
      duration: 100,
      timingFunction: 'ease-in'
    }
    var an_01 = wx.createAnimation(options);
    an_01.opacity(0).step();
    var an_02 = wx.createAnimation(options);
    an_02.opacity(1).step();
    this.setData({
      Animation9: an_01.export(),
      Animation10: an_02.export()
    })

    var _type = e.currentTarget.dataset.type;
    setTimeout(function () {
      if (_type == 1)//1普通2拼手气
      {
        wx.navigateTo({
          url: '../red_packet_pt/index'
        })
      }
      else {
        wx.navigateTo({
          url: '../red_packet_sq/index'
        })
      }
    }, 500);
  },
  
  redpk_click6: function (e) {
    let options = {
      duration: 100,
      timingFunction: 'ease-in'
    }
    var an_01 = wx.createAnimation(options);
    an_01.opacity(0).step();
    var an_02 = wx.createAnimation(options);
    an_02.opacity(1).step();
    this.setData({
      Animation11: an_01.export(),
      Animation12: an_02.export()
    })

    var _type = e.currentTarget.dataset.type;
    setTimeout(function () {
      if (_type == 1)//1普通2拼手气
      {
        wx.navigateTo({
          url: '../red_packet_pt/index'
        })
      }
      else {
        wx.navigateTo({
          url: '../red_packet_sq/index'
        })
      }
    }, 500);
  },

  redpk_click7: function (e) {
    let options = {
      duration: 100,
      timingFunction: 'ease-in'
    }
    var an_01 = wx.createAnimation(options);
    an_01.opacity(0).step();
    var an_02 = wx.createAnimation(options);
    an_02.opacity(1).step();
    this.setData({
      Animation13: an_01.export(),
      Animation14: an_02.export()
    })

    var _type = e.currentTarget.dataset.type;
    setTimeout(function () {
      if (_type == 1)//1普通2拼手气
      {
        wx.navigateTo({
          url: '../red_packet_pt/index'
        })
      }
      else {
        wx.navigateTo({
          url: '../red_packet_sq/index'
        })
      }
    }, 500);

  },

  redpk_click8: function (e) {
    let options = {
      duration: 100,
      timingFunction: 'ease-in'
    }
    var an_01 = wx.createAnimation(options);
    an_01.opacity(0).step();
    var an_02 = wx.createAnimation(options);
    an_02.opacity(1).step();
    this.setData({
      Animation15: an_01.export(),
      Animation16: an_02.export()
    })

    var _type = e.currentTarget.dataset.type;
    setTimeout(function () {
      if (_type == 1)//1普通2拼手气
      {
        wx.navigateTo({
          url: '../red_packet_pt/index'
        })
      }
      else {
        wx.navigateTo({
          url: '../red_packet_sq/index'
        })
      }
    }, 500);

  },

  redpk_click9: function (e) {
    let options = {
      duration: 100,
      timingFunction: 'ease-in'
    }
    var an_01 = wx.createAnimation(options);
    an_01.opacity(0).step();
    var an_02 = wx.createAnimation(options);
    an_02.opacity(1).step();
    this.setData({
      Animation17: an_01.export(),
      Animation18: an_02.export()
    })

    var _type = e.currentTarget.dataset.type;
    setTimeout(function () {
      if (_type == 1)//1普通2拼手气
      {
        wx.navigateTo({
          url: '../red_packet_pt/index'
        })
      }
      else {
        wx.navigateTo({
          url: '../red_packet_sq/index'
        })
      }
    }, 500);

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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