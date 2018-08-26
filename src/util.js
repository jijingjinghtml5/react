// import merged from 'obj-merged';
import * as config from './Config/Config';

const {target} = config;
const Util = {};
/**
 * 将对象转成 a=1&b=2的形式
 * @param obj 对象
 */
function obj2String(obj, arr = [], idx = 0) {
  for (let item in obj) {
    arr[idx++] = [item, obj[item]]
  }
  return new URLSearchParams(arr).toString()
}
Util.localItem = function (key, value) {
    if (arguments.length == 1) {
        return localStorage.getItem(key);
    } else {
        return localStorage.setItem(key, value);
    }
}

/**
 * 删除本地数据
 * 
 * @param {any} key
 * @returns
 */
Util.removeLocalItem = function (key) {
    if (key) {
        return localStorage.removeItem(key);
    }
    return localStorage.removeItem();
}

/**
 * 真正的请求
 * @param url 请求地址
 * @param options 请求参数
 * @param method 请求方式
 */
async function commonFetcdh(url, options, method = 'GET') {
  const searchStr = obj2String(options)
  let initObj = {};
  var session_id = Util.localItem('_SID'),
                vmc_uid = Util.localItem('_VMC_UID');
                console.log(session_id);
  var headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-isWXAPP':'YES',
        'X-WxappStorage-SID':session_id?session_id:'',
        'X-WxappStorage-VMC-UID':vmc_uid?vmc_uid:''
      })
  if (method === 'GET') { // 如果是GET请求，拼接url
    url += '?' + searchStr
    initObj = {
      method: method,
      credentials: 'include'
    }
  } else {
    initObj = {
      method: method,
      credentials: 'include',
      headers: headers,
      body: searchStr
    }
  }

  return new Promise((resolve, reject) => {
    fetch(url, initObj).then((res) => {
      if(res.headers.get('x-wxappstorage')){
        Util.localItem('_SID',res.headers.get('x-wxappstorage').split('=')[1])
      }
      return  res.json()
    }).then((res) => {
      resolve(res)  
    }).catch(function(err){
      reject(err)
    })
  });
}
class Http {
    //get
    async get(url, options) {
      return await commonFetcdh(url, options, 'GET')
    }

    //post
    async post(url, options) {
      return await commonFetcdh(url, options, 'POST')
    }
}

const Tool = new Http();
// export default new Http();
export { Tool,  config ,Util }//merged,