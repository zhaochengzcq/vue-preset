export {
  format,
  getAgeByBirthday,
  getInfoFormIdNo,
  checkAge,
  getCookie,
  setCookie,
  compressImg
};
//时间格式化函数
function format(format) {
  var date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1
          ? date[k]
          : ("00" + date[k]).substr(("" + date[k]).length)
      );
    }
  }
  return format;
}
/**
 * 从身份证号获取出生日期，性别，年龄。
 * @param {String} idNo --身份证号
 * @param {String}} afferentDate -- 传入日期字符串进行比较以计算年龄,格式yyyy-MM-dd，若传入为空或格式不正确，则以函数触发的时间为准；
 */
function getInfoFormIdNo(idNo, afferentDate) {
  // ic = IdentityCodeValid(ic);
  var infoFromIdNo = {
    birth: null,
    sex: null,
    age: null
  };
  //获取出生日期
  infoFromIdNo.birth =
    idNo.substring(6, 10) +
    "-" +
    idNo.substring(10, 12) +
    "-" +
    idNo.substring(12, 14);

  //获取性别
  infoFromIdNo.sex = idNo.slice(14, 17) % 2 ? "1" : "2"; // 1代表男性，2代表女性
  /*var sexOption = document.getElementsByName("rabSex");
   for(var i = 0; i < sexOption.length; i++) {
   if(sexOption[i].value == gender) {
   sexOption[i].checked = true;
   break;
   }
   }*/

  //获取年龄
  var reg = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  if (reg.test(afferentDate)) {
    var myDate = new Date(afferentDate);
  } else {
    var myDate = new Date();
  }
  // var myDate = new Date(Date.now()+60*60*24*1000*30)

  var month = myDate.getMonth() + 1;
  var day = myDate.getDate();
  var age = myDate.getFullYear() - idNo.substring(6, 10) - 1; //getFullYear()返回一个表示年份的 4 位数字
  if (
    idNo.substring(10, 12) < month ||
    (idNo.substring(10, 12) == month && idNo.substring(12, 14) <= day)
  ) {
    age++;
  }
  infoFromIdNo.age = age;
  return infoFromIdNo;
}

/**
 *根据出生日期获取年龄
 * @param {String} birthDay -- 出生日期
 * @param {String} afferentDate -- 传入日期字符串进行比较以计算年龄,格式yyyy-MM-dd，若传入为空或格式不正确，则以函数触发的时间为准；
 */
function getAgeByBirthday(birthDay, afferentDate) {
  var reg = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  var birth = birthDay;
  if (reg.test(afferentDate)) {
    var nowDate = new Date(afferentDate);
  } else {
    var nowDate = new Date();
  }
  // alert(date+'/'+nowDate)
  var month = nowDate.getMonth() + 1;
  var day = nowDate.getDate();
  var age = nowDate.getFullYear() - birth.substring(0, 4) - 1; //getFullYear()返回一个表示年份的 4 位数字
  if (
    birth.substring(5, 7) < month ||
    (birth.substring(5, 7) == month && birth.substring(8) <= day)
  ) {
    age++;
  }
  // alert(age)
  return age;
}

/**
 *此函数用于航意险中年龄是否符合要求
 * @param {boolean} changeFlg - 身份证为true，其他类型为false
 * @param {string} idNo - 身份证时为证件号，其他类型为出生日期
 * @param {string} tbDate - 需要进行比较的日期,格式yyyy-MM-dd
 */
function checkAge(changeFlg, idNo, tbDate) {
  var returnInfo = {
    code: null,
    age: null,
    daysFlg: null //0-30天婴儿
  };
  function checkMethod(age) {
    if (+age >= 18) {
      returnInfo.code = 1;
      returnInfo.age = age;
      returnInfo.daysFlg = false;
    } else if (+age < 18) {
      returnInfo.code = 0;
      returnInfo.age = age;
      returnInfo.daysFlg = false;
      if (+age === 0) {
        var nowDate = tbDate;
        var birth = null;
        if (changeFlg) {
          birth = getInfoFormIdNo(idNo).birth;
        } else {
          birth = idNo;
        }
        if (
          Date.parse(birth) >= Date.parse(nowDate) - 60 * 60 * 24 * 1000 * 30 &&
          Date.parse(birth) < Date.parse(nowDate)
        ) {
          returnInfo.daysFlg = true;
        }
      }
    }
  }

  if (changeFlg) {
    var age = getInfoFormIdNo(idNo, tbDate).age;
    checkMethod(age);
    return returnInfo;
  } else {
    var age = getAgeByBirthday(idNo, tbDate);
    checkMethod(age);
    return returnInfo;
  }
}
//获取cookie
function getCookie(name) {
  var cookieArr = document.cookie.split("; ");
  for (var i = 0; i < cookieArr.length; i++) {
    var arr = cookieArr[i].split("=");
    if (arr[0] == name) {
      return unescape(arr[1]);
    }
  }
}
//设置cookie
function setCookie(ssInfo) {
  for (var i in ssInfo) {
    document.cookie = i + "=" + escape(ssInfo[i]);
  }
}

/**
 *图片压缩
 * @param {String} base64Url -- base64编码地址
 * @param {Function} imgPost -- 回调函数
 */
function compressImg(base64Url, imgPost) {
  //创建image对象
  var img = new Image();
  //创建画布
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  var a = 0;

  img.src = base64Url;
  if (imageSize(base64Url) > 0.3) {
    img.onload = function() {
      var that = this;
      changeImgSize(that, imgPost);
    };
  } else {
    console.log(a);
    imgPost(base64Url);
  }
  //处理图片函数
  function changeImgSize(that, imgPost) {
    a++;
    var canWidth = that.width * 0.8;
    var canHeight = that.height * 0.8;
    var base64Url = null;
    //设置画布长宽
    canvas.width = canWidth;
    canvas.height = canHeight;
    //清理画布
    context.clearRect(0, 0, canWidth, canHeight);
    //绘图
    context.drawImage(img, 0, 0, canWidth, canHeight);
    //获取base64url
    base64Url = canvas.toDataURL("image/jpeg");
    console.log(imageSize(base64Url));
    //发送数据或者再次处理
    if (imageSize(base64Url) <= 0.3) {
      console.log(a);
      imgPost(base64Url);
    } else {
      img.src = base64Url;
      img.onload = function() {
        var that = this;
        changeImgSize(that, imgPost);
      };
    }
  }
  //由base64获取图片大小。
  function imageSize(base64Url) {
    var str = base64Url.substring(22);
    var equalIndex = str.indexOf("=");
    if (str.indexOf("=") > 0) {
      str = str.substring(0, equalIndex);
    }
    var strLength = str.length;
    var fileLength = (
      parseInt(strLength - (strLength / 8) * 2) /
      1024 /
      1024
    ).toFixed(3);
    return fileLength;
  }
}
