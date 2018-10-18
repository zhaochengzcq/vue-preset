export { isRegister };
function isRegister(that) {
  //获取url传参
  var url = window.location.search;
  url = decodeURIComponent(url);
  var info = url.split("=")[1];

  //测试用
  // var tp = '1639d470acf906d5239b10bbcbd7ba89b868792e296de05205799c89e1f5ef98ca084ea511439ac7b60ea460e93c5a832c29530c5e82d7ac4a4d4ab61ebb8e2d2575cfce2c9c01810f7dd3d938a71fadae25cb8f799b1b7daacfe682acc314c622a4e211b91249d333a0e5923aafa87d1985ecdbf19135fd86e1047f6c0057ff78015c161594a1125fe1da64e6a44b9a'
  // that.axios.get('http://10.253.116.235:8082/api/caic/card/toDecrypt', {
  //     params: {
  //         context: tp,
  //     }
  // })
  // .then(response => {
  //     console.log(response)
  // })

  // 解密出的信息内容
  // phoneNo   "购买人手机号"
  // roleType  "购买人人员类型"    a a端   c c端  n 内勤 z 未注册
  // shareId   "购买人员分享ID"
  // roleCode  "出单营销员人员代码"
  // salesComCode  "出单归属机构"
  // pid   "二维码ID"
  // cityCode  区域代码

  //调用解密接口
  // 开发服务器
  // 'http://10.253.116.235:8082/api/caic/card/toDecrypt'
  // 测试服务器用
  // http://wxcarcs.capli.com.cn:8082/api/caic/card/toDecrypt
  // 生产服务器用
  // /api/caic/card/toDecrypt

  that.axios
    .get("/api/caic/card/toDecrypt", {
      params: {
        context: info
      }
    })
    .then(response => {
      // console.log(response)
      var strArr = response.data.split("&");
      // 将获取的字符串处理成对象
      var registerObj = {};
      //跳转链接
      var href = null;
      for (var a in strArr) {
        var temp = strArr[a].split("=");
        // console.log(temp[0]);
        registerObj[temp[0]] = temp[1];
      }
      // console.log(registerObj)
      // 测试用
      // for(var b in registerObj){
      //      alert(b+":"+registerObj[b])
      // }
      //对未注册进行跳转
      //    console.log(registerObj)
      let getRegisterInfo = {
        phoneNo: null,
        roleCode: null,
        salesComCode: null,
        roleType: null,
        cityCode: null,
        pid: null
      };
      getRegisterInfo.phoneNo = registerObj.phoneNo;
      getRegisterInfo.roleCode = registerObj.roleCode;
      getRegisterInfo.salesComCode = registerObj.salesComCode;
      getRegisterInfo.roleType = registerObj.roleType;
      getRegisterInfo.cityCode = registerObj.cityCode;
      getRegisterInfo.pid = registerObj.pid;

      // console.log(registerObj);
      // console.log(getRegisterInfo);
      // var href = "http://weixin.capli.com.cn/wxTerminal/binding/prepareRegist.do?" + "shareId=" + (registerObj.shareId ? registerObj.shareId : null);
      // console.log(href);
      // 生产用
      // http://weixin.capli.com.cn/wxTerminal/binding/prepareRegist.do?
      // 测试用
      // http://weixincs.capli.com.cn/wxTerminal/binding/prepareRegist.do?
      if (
        registerObj.phoneNo === null ||
        registerObj.phoneNo === "" ||
        registerObj.phoneNo === undefined
      ) {
        href =
          "http://weixincs.capli.com.cn/wxTerminal/binding/prepareRegist.do?" +
          "shareId=" +
          (registerObj.shareId ? registerObj.shareId : null);
        // console.log(href);
        window.location.href = href;
      } else if (
        registerObj.roleType !== "A" &&
        registerObj.roleType !== "C" &&
        registerObj.roleType !== "N"
      ) {
        href =
          "http://weixincs.capli.com.cn/wxTerminal/binding/prepareRegist.do?" +
          "shareId=" +
          (registerObj.shareId ? registerObj.shareId : null);
        window.location.href = href;
      } else {
        window.localStorage.setItem("info", JSON.stringify(getRegisterInfo));
        that.$router.push("/InsTbxz");
      }
    })
    .catch(error => {
      console.log(error);
    });
}
