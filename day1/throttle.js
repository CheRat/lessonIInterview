var count = 0;
var container = document.getElementById("container");
function getUserAction(event) {
  console.log(event);
  container.innerHTML = ++count;
}
container.addEventListener("mousemove", throttle(getUserAction, 800,{
    leading:false
}));
// 用时间戳的方式去执行 第一次会立马执行
function throttle1(func, wait) {
  let context, args;
  let previous = 0;
  return function () {
    let now = +new Date();
    context = this;
    args = arguments;
    // 现在的时间 减去上次触发的时间 大于 wait 就去执行 并记录现在的时间
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  };
}
// 用定时器的方式去执行
function throttle2(func, wait) {
  let context, args;
  let timeout;
  return function () {
    context = this;
    args = arguments;
    // 假如不为null
    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null;
        func.apply(context,args);
      }, wait);
    }
  };
}

// 双剑合璧
function throttle3(func,wait,){
    let timeout,context,args,result;
    let previous = 0
     
    let later = function(){
        previous = + new Date()
        timeout = null
        func.apply(context,args)
    }
    let throttled = function(){
        let now = +new Date()
        let remaining = wait - (now - previous);// 获取剩下的时间
        context = this;
        args = arguments;
        // 剩下的时间 小于等于0 或者 剩下的时间 大于等待时间
        if(remaining<=0||remaining > wait){
            // 假如 timeout 不为空 进行清除
            if(timeout ){
                clearTimeout(timeout);
                timeout = null
            }
            // 储存这次执行的时间
            previous = now
            func.apply(context,args)
        // 假如 timeout 为空的情况下 执行
        }else if(!timeout){
            timeout = setTimeout(later,remaining);
        }
    }
    return throttled;
}
// 添加控制字段 
//  leading：false 表示禁用第一次执行
//  trailing: false 表示禁用停止触发的回调
function throttle4(func,wait,options){
    let timeout,context,args,result;
    let previous = 0;
     if (!options) options ={};
    let later = function(){
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null
        func.apply(context,args)
        if(!timeout) context = args = null;
    }
    let throttled = function(){
        let now = new Date().getTime();
        if(!previous && options.leading == false) previous = now;
        let remaining = wait - (now - previous);// 获取剩下的时间
        context = this;
        args = arguments;
        // 剩下的时间 小于等于0 或者 剩下的时间 大于等待时间 (手动更改系统时间)
        if(remaining<=0||remaining > wait){
            // 假如 timeout 不为空 进行清除
            if(timeout ){
                clearTimeout(timeout);
                timeout = null
            }
            // 储存这次执行的时间
            previous = now
            func.apply(context,args)
            if (!timeout) context = args = null;
        // 假如 timeout 为空的情况下 执行
        }else if(!timeout  && options.trailing !== false){
            timeout = setTimeout(later,remaining);
        }
    }
    return throttled;
}
function throttle(func,wait,options = {
    // leading 禁用第一次执行
    // trailing 禁用停止触发回调
}){
    let context, timeout,args,result
    let previous // 保存时间
    if(!options) options = {}

    let later = function(){
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null
        func.apply(context,args)
        if(!timeout) context = args = null
    }
    // 
    let throttled = function(){
        // 获取当前时间戳
        let now = new Date().getTime();
        // 假如之前没有执行过 并且 options.leading 不等于false 则将previos = 现在时间
        if(!previous && options.leading === false)  previous= now
        // 获取剩下的时间 保证固定频率触发
        let remaining = wait - (now - previous);
        context = this
        args = arguments
        if(remaining<=0){
            // 已经有任务了 则清除
            if(timeout){
                clearTimeout(timeout);
                timeout = null
            }
            previous = now;
            func.apply(context,args);
            // 假如 timeout 为空的情况下 清除环境变量
            if(!timeout) context = args = null
        }else if(!timeout && options.trailing !=false)
            timeout = setTimeout(later,remaining)
    }
    throttled.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = null;
    }
    return throttled
}