export { validateRules };
// 检查身份证件格式
function IdentityCodeValid(idCardNo) {
  var code = idCardNo;
  var pass = true;
  var city = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外 "
  };
  if (
    !code ||
    !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/i.test(
      code
    )
  ) {
    // this.$toast('请检查证件号码');
    pass = false;
  } else if (!city[code.substr(0, 2)]) {
    // this.$toast('请检查证件号码');
    pass = false;
  } else {
    //18位身份证需要验证最后一位校验位
    if (code.length == 18) {
      code = code.split("");
      //∑(ai×Wi)(mod 11)
      //加权因子
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //校验位
      var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++) {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }
      var last = parity[sum % 11];
      if (parity[sum % 11] != code[17]) {
        // this.$toast('请检查证件号码');
        pass = false;
      }
    }
  }
  return pass;
}
// 检查手机号格式
function checkMobile(phoneNo) {
  var regPhone = /^[1][345678]\d{9}$/;
  var pass = true;
  if (!regPhone.test(phoneNo)) {
    pass = false;
  }
  return pass;
}
//检查邮箱格式
function checkEmail(email) {
  var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
  var flag = true;
  if (!reg.test(email)) {
    flag = false;
    return flag;
  } else {
    return flag;
  }
}
//检查护照格式是否正确
/**
 * ^1[45]\d{7}$|^[EK]\d{8}$|^(EA|EB|EC|ED|DE|SE|PE|MA)\d{7}$|^[GDSPHM]\d{8}$
 * ^[EK]\d{8}$  电子护照 E--普通护照；K--香港特区护照； 后接8位数字
 * ^(EA|EB|EC|ED|DE|SE|PE|MA)\d{7}$ 电子护照 EA，EB，EC，ED--普通护照；DE--外交护照；SE--公务护照；PE--公务普通护照；MA--澳门特区护照；
 * ^[GDSPHM]\d{8} 97-2版护照 G--普通护照；D--外交护照；S--公务护照；P--公务普通护照；M--澳门特区护照；H--香港特区护照；
 * @param {string} passport
 */
function checkPassport(passport) {
  var reg = /^1[45]\d{7}$|^[EK]\d{8}$|^(EA|EB|EC|ED|DE|SE|PE|MA)\d{7}$|^[GDSPHM]\d{8}$/;
  var flag = true;
  if (!reg.test(passport)) {
    flag = false;
    return flag;
  } else {
    return flag;
  }
}
//检查军官证格式是否正确
function checkMilitaryOfficerIdCard(MilitaryOfficerIdCard) {
  var reg = /[\u4e00-\u9fa5](字第){1}(\d{4,8})(号?)$/;
  var flag = true;
  if (!reg.test(MilitaryOfficerIdCard)) {
    flag = false;
    return flag;
  } else {
    return flag;
  }
}
function others(value) {
  if (value === null || value === undefined || value === "") {
    return false;
  } else {
    return true;
  }
}
//主函数
//I--身份证
//P--护照
//M--军官证
//PM--手机号
//EM--邮箱
//O -- 其他
function validateRules(type, value) {
  switch (type) {
    case "I":
      return IdentityCodeValid(value);
    case "P":
      return checkPassport(value);
    case "M":
      return checkMilitaryOfficerIdCard(value);
    case "PM":
      return checkMobile(value);
    case "EM":
      return checkEmail(value);
    case "O":
      return others(value);
    default:
      return false;
  }
}
