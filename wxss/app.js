//app.js
App({
  globalData: {
    appid: "wxc621301cc274072e",
    secret: "01e0e3777a512ece8d1a382c52aae2cc",
    HostUrl: "http://47.104.205.171:8081",
    picUrl: "http://47.104.205.171:8081/",
    wxcode: "",
    UserId: "-1",
    MerchantId: "-1",
    Lat: "",
    Lon: "",
    Province: "",
    Country: "",
    City: "",
    ProvinceCode: "",
    CountryCode: "",
    CityCode: "",
    phone: "-1",
    formatted_address: "",
    header: {}
  },

  onLaunch: function () {
    var $this = this;

    wx.getStorage({
      key: 'key_userInfo',
      success: function (res) {
        //console.log(res.data);
        $this.globalData.UserId = res.data.UserId;
        $this.globalData.MerchantId = res.data.MerchantId;
        $this.globalData.Lat = res.data.Lat;
        $this.globalData.Lon = res.data.Lon;
        $this.globalData.Province = res.data.Province;
        $this.globalData.Country = res.data.Country;
        $this.globalData.City = res.data.City;
        $this.globalData.ProvinceCode = res.data.ProvinceCode;
        $this.globalData.CountryCode = res.data.CountryCode;
        $this.globalData.CityCode = res.data.CityCode;
        $this.globalData.formatted_address = res.data.formatted_address;

        $this.globalData.header = {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          'CityClub-UserId': $this.globalData.UserId,
          'CityClub-MerchantId': $this.globalData.MerchantId,
          'CityClub-Lat': $this.globalData.Lat,
          'CityClub-Lon': $this.globalData.Lon,
          'CityClub-Province': escape($this.globalData.Province),
          'CityClub-Country': escape($this.globalData.Country),
          'CityClub-City': escape($this.globalData.City),
          'CityClub-ProvinceCode': $this.globalData.ProvinceCode,
          'CityClub-CountryCode': $this.globalData.CountryCode,
          'CityClub-CityCode': $this.globalData.CityCode
        }
      },
      fail: function (e) {
        //是否授权
        wx.getSetting({
          success(res) {
            if (!res.authSetting["scope.userInfo"]) {
              wx.reLaunch({
                url: '/pages/login/index', hello
              })
            }
          }
        })
      }
    })

    wx.getStorage({
      key: 'key_phone',
      success: function (res) {
        $this.globalData.phone = res.data.phone
      },
      fail: function (e) {
        $this.globalData.phone = "-1";
      }
    })

  },

  //登陆
  com_login: function (num, e) {
    var $this = this;
    wx.showLoading({
      title: '登陆中...',
    });
    if (num == 1) {
      //获取code
      wx.login({
        success: function (e) {
          $this.globalData.wxcode = e.code;
          wx.getUserInfo({
            success: function (e_ui) {
              wx.request({
                url: $this.globalData.HostUrl + '/wechat/login',
                header: {
                  'content-type': 'application/json'
                },
                method: "post",
                data: {
                  "rawData": e_ui.rawData,
                  "userInfo": e_ui.userInfo,
                  "encryptedData": e_ui.encryptedData,
                  "iv": e_ui.iv,
                  "signature": e_ui.signature,
                  "code": e.code,
                  "nickName": e_ui.userInfo.nickName,
                  "avatarUrl": e_ui.userInfo.avatarUrl,
                  "gender": e_ui.userInfo.gender
                },
                success: function (e_login) {
                  console.log("/wechat/login");
                  console.log(e_login);
                  if (e_login.data.errno == 1) {
                    wx.showLoading({
                      title: '登陆失败',
                    });
                    setTimeout(function () {
                      wx.reLaunch({
                        url: '../login/index',
                      })
                    }, 1000);
                  } else {
                    wx.showLoading({
                      title: '登陆成功',
                    });
                    $this.globalData.UserId = e_login.data.data.userId;
                    //地理位置
                    wx.getLocation({
                      type: "wgs84",
                      success: function (res) {
                        var longitude = res.longitude;
                        var latitude = res.latitude;
                        $this.loadCity(longitude, latitude);
                      }
                    });
                  }
                }
              })
            }
          });
        }
      });
    }
  },

  //数字转换
  unitConvert: function (num) {
    var _num = parseInt(num);
    //console.log(num);
    if (_num > 9999) {
      return (_num / 10000).toFixed(1) + "万";
    }
    else {
      return _num + "个";
    }
  },

  //获取位置
  loadCity: function (longitude, latitude) {
    var $this = this;
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=vAsmbrTtUyjvKyXGoQWRQ5jV5SMDGamN&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log("api.map.baidu.com");
        console.log(res);
        $this.globalData.Lat = latitude;
        $this.globalData.Lon = longitude;
        $this.globalData.Province = res.data.result.addressComponent.province;
        $this.globalData.Country = res.data.result.addressComponent.country;
        $this.globalData.City = res.data.result.addressComponent.city;
        $this.globalData.CityCode = res.data.result.cityCode;
        $this.globalData.formatted_address = res.data.result.formatted_address;

        wx.setStorage({
          key: 'key_userInfo',
          data: {
            "UserId": $this.globalData.UserId,
            "MerchantId": $this.globalData.MerchantId,
            "Lat": $this.globalData.Lat,
            "Lon": $this.globalData.Lon,
            "Province": $this.globalData.Province,
            "Country": $this.globalData.Country,
            "City": $this.globalData.City,
            "ProvinceCode": $this.globalData.ProvinceCode,
            "CountryCode": $this.globalData.CountryCode,
            "CityCode": $this.globalData.CityCode,
            "formatted_address": $this.globalData.formatted_address
          },
        })

        $this.globalData.header = {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          'CityClub-UserId': $this.globalData.UserId,
          'CityClub-MerchantId': $this.globalData.MerchantId,
          'CityClub-Lat': $this.globalData.Lat,
          'CityClub-Lon': $this.globalData.Lon,
          'CityClub-Province': escape($this.globalData.Province),
          'CityClub-Country': escape($this.globalData.Country),
          'CityClub-City': escape($this.globalData.City),
          'CityClub-ProvinceCode': $this.globalData.ProvinceCode,
          'CityClub-CountryCode': $this.globalData.CountryCode,
          'CityClub-CityCode': $this.globalData.CityCode
        }

        setTimeout(function () {
          wx.reLaunch({
            url: '../index/index',
          })
        }, 1000);
      },
      fail: function () {

      }
    })
  },

  //手机号码判断
  isphone: function (_url) {
    var $this = this;
    if ($this.globalData.phone == -1) {
      wx.navigateTo({
        url: '/pages/phone/index?re_url=' + _url,
      })
    }
    else {
      wx.navigateTo({
        url: _url,
      })
    }
  },

  //获取手机号
  getphone: function (e, url) {
    var $this = this;
    //获取手机号接口-暂无
    console.log("获取手机号接口-暂无");
    console.log(e);
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)

    wx.login({
      success: function (res) {
        var _code = res.code;
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + $this.globalData.appid + '&secret=' + $this.globalData.secret + '&js_code=' + _code + '&grant_type=authorization_code',
          success: function (res1) {
            console.log("api.weixin.qq.com");
            console.log(res1);
            var _seesionKey = res1.data.session_key;
            console.log(_seesionKey);
            wx.request({
              //url: $this.globalData.HostUrl +"/wechat/getPhoneNumber",
              url: "http://42.51.205.15:8001/demo.php",
              method: "POST",
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data: {
                "appid": $this.globalData.appid,
                "encryptedData": e.detail.encryptedData,
                "iv": e.detail.iv,
                "sessionKey": _seesionKey,
                "userId": $this.globalData.UserId
              },
              success: function (res) {
                console.log("/wechat/getPhoneNumber");
                console.log(res);
                wx.setStorage({
                  key: 'key_phone',
                  data: { "phone": res.data.purePhoneNumber },
                })
                $this.globalData.phone = res.data.purePhoneNumber
                wx.navigateTo({
                  url: url,
                })
              }
            })
          }
        })
      }
    })
  },


  upload_file_single: function (type, callback, extdata) {

    var $this = this;

    wx.chooseImage({
      count: 1,  //最多可以选择的图片总数  
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        var tempFilePaths = res.tempFilePaths;
        //启动上传等待中...  
        wx.showToast({
          title: '正在上传...',
          icon: 'loading'
        });

        const uploadTask = wx.uploadFile({
          url: $this.globalData.HostUrl + '/wechat/fileUpload',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'type': type,
            'extdata': extdata || ''
          },
          complete: function (res) {
            //服务器返回格式: { "Catalog": "testFolder", "FileName": "1.jpg", "Url": "https://test.com/1.jpg" }  

            console.info(res);


            if (res.statusCode == 200) {

              var data = JSON.parse(res.data);

              if (data.code == 200) {

                callback(tempFilePaths[0], data.data);

              } else {

                wx.showModal({
                  title: '错误提示',
                  content: '上传图片失败',
                  showCancel: false,
                  success: function (res) { }
                })

              }
            } else {

              wx.showModal({
                title: '错误提示',
                content: '上传图片失败',
                showCancel: false,
                success: function (res) { }
              })
            }

            wx.hideToast();
          }
        });

      }
    });

  }
})