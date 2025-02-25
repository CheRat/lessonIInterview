**比较Object.prototype.toString.call()、instanceof、以及Array.isArray()的区别和优劣**
1. Object.prototype.toString.call()
    1. 每一个继承Object的对象都有toString方法,如果toString方法没有重写,会返回``[Object type]``  这种方法对于所有基本的数据类型都能进行判断，即使是 null 和 undefined
    2. 常用于判断浏览器内置对象时。
2. instanceof
   1. instanceof 的内部机制是通过判断对象的原型链中是不是能找到类型的 prototype 
   2. 使用 ``instanceof`` 判断一个对象是否是数组,instanceof 会判断这个对象的原型链上是否会找到对应的 ``Array``的原型 找到返回 true 
   3. ``instanceof`` 只能用来判断对象类型,原始类型不可以，并且所有对象类型 instanceof 都是 true
3. Array.isArray()
   1. 用来判断对象是否为数组
   2. instanceof 与 isArray 
      1. 当检测Array 实例时，Array.isArray 优于 instanceof 
      2. Array.isArray 可以检测出iframes 
   3. Array.isArray() 与 Object.prototype.call(),isArray()是es5新增的方法，当不存在Array.isArray()，可以用 Object.prototype.call()实现
   ``if(!Array.isArray){
        Array.isArray = function(arg){
            return Object.prototype.toString.call(arg) === '[
                object Array
            ]'
        }
    }
   ``