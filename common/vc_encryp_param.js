var CryptoJS = require('./crypto-js');
var keykey = 'f530b3df31d72125852611d031cc6e6b';

/**
项目加密流程
1、添加一个时间戳参数 vc_timestamp 其值为当前的时间戳减去123456。
2、所有参数（包括vc_timestamp参数）进行字典排序后，拼接到一起再拼接上秘钥（系统给定的sign）进行MD5运算 生成签名。
3、签名作为sign参数传值
4、所有参数变为json字符串
5、对json字符串进行 des 加密
6、把加密后的字符串做为vc_string 参数传值
 */


/**
 * 获取加密后的参数
 */
function get_vc_String(param) {
  if (emptyempty(param)) {
    param = {};
  }
  var changetimestamp = (getTimeStamp().toString().substring(0, 10));
  var vc_timestamp = parseInt(changetimestamp) - 123456;
  param.vc_timestamp = vc_timestamp;
  param.sign = getSign(param);
  var json = mapToJson(param);
  return { 'vc_string': desEncrypt(keykey, json) }

}

/******************签名加密算法用到的函数开始*******************************/
function getTimeStamp() {
  var timestamp = new Date().getTime();
  return timestamp;
}


/**
 * 获取签名
 */
function getSign(param) {
  var temp = "";
  param = objKeySort(param);
  for (var k in param) {
    temp += k + "=" + param[k] + "&";
  }
  temp = temp.substring(0, temp.length - 1)
  return CryptoJS.MD5(temp + keykey).toString();
}

//排序的函数
function objKeySort(obj) {
  var newkey = Object.keys(obj).sort();
  //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  var newObj = {};//创建一个新的对象，用于存放排好序的键值对
  for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
    newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
  }
  return newObj;//返回排好序的新对象
}

/**
 * map转json
 */
function mapToJson(paramMap) {
  var map2json = JSON.stringify(paramMap);
  return map2json;
}

/**
 * des加密
 */
function desEncrypt(key, json) {
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var encrypted = CryptoJS.DES.encrypt(json, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

function emptyempty(mixed_var) {
  var key;

  if (mixed_var === "" || mixed_var === 0 || mixed_var === "0" || mixed_var === null || mixed_var === false || typeof mixed_var === 'undefined') {
    return true;
  }

  if (typeof mixed_var == 'object') {
    for (key in mixed_var) {
      return false;
    }
    return true;
  }

  return false;
}
/******************签名加密算法用到的函数结束*******************************/

module.exports = {
  get_vc_String: get_vc_String,
}
