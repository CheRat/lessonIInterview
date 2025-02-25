
// 会打印出什么
console.log(['1','2','3'].map(parseInt)) 
/**
 *  parseInt 会接收两个参数 map接收从参数为两个 一个为 key 一个为index 
 *  进行遍历的时候 
 *  第一次 parseInt('1',0) 1 
 *  第二次 parseInt('2',1) NaN
 *  第三次 parseInt('3',2) NaN
 */