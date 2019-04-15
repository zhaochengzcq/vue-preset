export { isRegister }
/**
 *
 * @param {Object} that 传入this对象
 * @param {String} vueRouter 要跳转的路由地址
 * @param {String} registerUrl 未注册时，跳转注册的地址。默认值为生产地址 ：http://weixin.capli.com.cn/wxTerminal/binding/prepareRegist.do?  测试环境地址为 ： http://weixincs.capli.com.cn/wxTerminal/binding/prepareRegist.do?
 */
function isRegister (
  that,
  vueRouter,
  registerUrl = 'http://weixin.capli.com.cn/wxTerminal/binding/prepareRegist.do?'
) {
  // 获取url传参
  let url = window.location.search
  url = decodeURIComponent(url)
  let info = url.split('=')[1]

  // 解密出的信息内容
  // phoneNo   "购买人手机号"
  // roleType  "购买人人员类型"    a a端   c c端  n 内勤 z 未注册
  // shareId   "购买人员分享ID"
  // roleCode  "出单营销员人员代码"
  // salesComCode  "出单归属机构"
  // pid   "二维码ID"
  // cityCode  区域代码
  // XG 销管信息 如果XG为1，是销管人员，XG为0,不是销管人员

  // 调用解密接口
  // 开发服务器
  // 'http://10.253.116.235:8082/api/caic/card/toDecrypt'
  // 测试服务器用
  // http://wxcarcs.capli.com.cn:8082/api/caic/card/toDecrypt
  // 生产服务器用
  // /api/caic/card/toDecrypt

  that.axios
    .get('/api/caic/card/toDecrypt', {
      params: {
        context: info
      }
    })
    .then(response => {
      let strArr = response.data.split('&')
      let registerObj = {} // 将获取的字符串处理成对象
      let href = null // 跳转链接
      for (let a in strArr) {
        let temp = strArr[a].split('=')
        registerObj[temp[0]] = temp[1]
      }
      // 对未注册进行跳转
      let getRegisterInfo = {
        phoneNo: null,
        roleCode: null,
        salesComCode: null,
        roleType: null,
        cityCode: null,
        pid: null,
        xgFlag: null
      }
      getRegisterInfo.phoneNo = registerObj.phoneNo
      getRegisterInfo.roleCode = registerObj.roleCode
      getRegisterInfo.salesComCode = registerObj.salesComCode
      getRegisterInfo.roleType = registerObj.roleType
      getRegisterInfo.cityCode = registerObj.cityCode
      getRegisterInfo.pid = registerObj.pid
      getRegisterInfo.xgFlag = registerObj.XG
      // 生产用
      // http://weixin.capli.com.cn/wxTerminal/binding/prepareRegist.do?
      // 测试用
      // http://weixincs.capli.com.cn/wxTerminal/binding/prepareRegist.do?
      console.log(registerUrl)
      if (
        registerObj.phoneNo === null ||
        registerObj.phoneNo === '' ||
        registerObj.phoneNo === undefined
      ) {
        href = registerUrl + (registerObj.shareId ? registerObj.shareId : null)
        // console.log(href);
        window.location.href = href
      } else if (
        registerObj.roleType !== 'A' &&
        registerObj.roleType !== 'C' &&
        registerObj.roleType !== 'N'
      ) {
        href = registerUrl + (registerObj.shareId ? registerObj.shareId : null)
        window.location.href = href
      } else {
        window.localStorage.setItem('info', JSON.stringify(getRegisterInfo))
        that.$router.push(vueRouter)
      }
    })
    .catch(error => {
      console.log(error)
    })
}
