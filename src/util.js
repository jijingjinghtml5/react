// import merged from 'obj-merged';
import * as config from './Config/Config';
import { Toast } from 'antd-mobile';
import createBrowserHistory from 'history/createBrowserHistory'
const history = createBrowserHistory();
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
Util.dateFormat = function(fmt,date) { //author: meizz
    date = parseInt(date);
    date = new Date(date*1000);
    var o = {
        "M+" : date.getMonth()+1,                 //月份
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S"  : date.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
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
//滚动条在Y轴上的滚动距离
Util.getScrollTop = function(){
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if(document.body){
        bodyScrollTop = document.body.scrollTop;
    }
    if(document.documentElement){
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}
//文档的总高度
Util.getScrollHeight = function(){
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if(document.body){
        bodyScrollHeight = document.body.scrollHeight;
    }
    if(document.documentElement){
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}
//浏览器视口的高度
Util.getWindowHeight = function(){
    var windowHeight = 0;
    if(document.compatMode == "CSS1Compat"){
        windowHeight = document.documentElement.clientHeight;
    }else{
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}

//倒计时
Util.count = function(time,current_time) {
    var day = 0,hour = 0,minute = 0,second = 0; //时间默认值

    var timestamp = current_time / 1000;
    var intDiff = time - timestamp;
    if (intDiff > 0) {
        day = Math.floor(intDiff / (60 * 60 * 24)).toString();
        hour = (Math.floor(intDiff / (60 * 60)) - (day * 24)).toString();
        minute = (Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60)).toString();
        second = (Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)).toString();
    }
    if (day <= 9)
        day = '0' + day;
    if (hour <= 9)
        hour = '0' + hour;
    if (minute <= 9)
        minute = '0' + minute;
    if (second <= 9)
        second = '0' + second;
    var rare_time = (day > 0 ? (day + '天') :'') +(hour > 0 ? hour + '小时':'') +(minute > 0 ? minute + '分':'');
    return rare_time
}

Util.loadImage = function (page_ins, ident, size) {
    size || (size = 'o');
    if (['o', 'xs', 's', 'm', 'l'].indexOf(size) < 0) {
        size = 'o';
    }
    if (!page_ins || !ident) {
        return;
    }
    if (page_ins.state.images && page_ins.state.images[ident]) {
        return;
    }
    if (!page_ins.image_ids) {
        page_ins.image_ids = {};
    }
    if (!page_ins.image_ids[size]) {
        page_ins.image_ids[size] = []
    }
    if (!page_ins.load_image_timer) {
        page_ins.load_image_timer = {};
    }
    if (page_ins.load_image_timer[size] == 'undefined') {
        page_ins.load_image_timer[size] = 0;
    }
    page_ins.image_ids[size].push(ident);
    clearTimeout(page_ins.load_image_timer[size]);
    page_ins.load_image_timer[size] = setTimeout(async function() {
        let res = await Tool.post('/openapi/storager/' + size,{
            'images': page_ins.image_ids[size]
        },'hidden')
        let image_src_data = res.data;
        // console.log(image_src_data);
        let images = {};
        for (let i = 0; i < image_src_data.length; i++) {
            images[page_ins.image_ids[size][i]] = image_src_data[i];
        }
        // console.log(page_ins);
        page_ins.setState({
            images:images
        });
    }, 200);
}
/**
 * 真正的请求
 * @param url 请求地址
 * @param options 请求参数
 * @param method 请求方式
 */
async function commonFetcdh(url, options, method = 'GET',toast) {
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
  if(toast!='hidden'){
      Toast.info('加载中',0,function(){},true);
  }
  return new Promise((resolve, reject) => {
      fetch(url, initObj).then((res) => {
          if(res.headers.get('x-wxappstorage')){
            Util.localItem('_SID',res.headers.get('x-wxappstorage').split('=')[1])
          }
          return  res.json()
      }).then((res) => {
          Toast.hide();
          if(res.error&&res.redirect.match('/m/passport-login.html')){
              console.log('请求错误');
              console.log(res);
              history.push('/pages/login/login');
              return;
          }
          resolve(res)
      }).catch(function(err){
          Toast.hide();
          reject(err)
      })
  });
}
class Http {
    //get
    async get(url, options ,toast) {
      return await commonFetcdh(url, options, 'GET',toast)
    }

    //post
    async post(url, options ,toast) {
      return await commonFetcdh(url, options, 'POST',toast)
    }
}

const Tool = new Http();
// export default new Http();
export { Tool,  config ,Util }//merged,