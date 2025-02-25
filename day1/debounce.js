var count = 1;
var container = document.getElementById("container");

function getUserAction(event) {
  let i = 10;
  console.log(event);
  container.innerHTML = count++;
  return count;
}

// container.onmousemove = debonce5(
//   (args) => {
//     const count = getUserAction(args);
//     console.log("count", count);
//   },
//   1000,
//   true
// );
function getUserAction(e) {
  container.innerHTML = ++count;
  // console.log(setUserAction())
  return count;
}
let setUserAction = debonce(
  function (event) {
    let count = getUserAction(event);
    console.log("count", count);
  },
  1000,
  false
);

container.onmousemove = setUserAction;
document
  .getElementsByClassName("button")[0]
  .addEventListener("click", function () {
    setUserAction.cancel();
  });
function debonce1(func, wait = 100) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}
function debonce2(func, wait = 1000) {
  let timeout;
  return function () {
    let context = this; // this 重新指向
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context);
    }, wait);
  };
}
function debonce3(func, wait = 1000) {
  let timeout;
  return function () {
    let context = this; // this 重新指向
    let arg = arguments; // 获取传递参数
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, arg);
    }, wait);
  };
}
// 添加立即执行
function debonce4(func, wait = 1000, immediate) {
  let timeout;
  return function () {
    let context = this; // this 重新指向
    let arg = arguments; // 获取传递参数
    // 如果存在则销毁 重新开始计时
    if (timeout) clearTimeout(timeout);
    // 是否立即开始执行
    if (immediate) {
      // 假如已经执行过 停止
      let callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, arg);
    } else {
      timeout = setTimeout(() => {
        func.apply(context, arg);
      }, wait);
    }
  };
}
// 添加返回值
function debonce5(func, wait = 1000, immediate) {
  let timeout, result;
  return function () {
    let context = this; // this 重新指向
    let arg = arguments; // 获取传递参数
    // 如果存在则销毁 重新开始计时
    if (timeout) clearTimeout(timeout);
    // 是否立即开始执行
    if (immediate) {
      // 假如已经执行过 停止
      let callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) result = func.apply(context, arg);
    } else {
      timeout = setTimeout(() => {
        return func.apply(context, arg);
      }, wait);
    }
    return result;
  };
}
// 添加取消函数
function debonce6(func, wait = 1000, immediate) {
  let timeout, result;
  let debonced = function () {
    let context = this; // this 重新指向
    let arg = arguments; // 获取传递参数
    // 如果存在则销毁 重新开始计时
    if (timeout) clearTimeout(timeout);
    // 是否立即开始执行
    if (immediate) {
      // 假如已经执行过 停止
      let callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) result = func.apply(context, arg);
    } else {
      timeout = setTimeout(() => {
        return func.apply(context, arg);
      }, wait);
    }
    return result;
  };
  debonced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };
  return debonced;
}

function debonce(func, wait = 1000, immediate = false) {
  let result, timeout;
  let debonced = function () {
    let context = this;
    let args = arguments;
    // 假如timeout 存在 清除之前的timeout
    if (timeout) clearTimeout(timeout);
    // 是否立即执行
    if (immediate) {
      // 判断是否已经执行过 timeout 为null的情况下 允许执行
      let callNow = !timeout;
      // 设置清理函数
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      // 立即执行 同步函数 所以可以直接返回
      if (callNow) result = func.call(this, args);
      return result;
    } else {
      // 异步函数 result 直接返回没有意义
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
  };
  debonced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };
  return debonced;
}
