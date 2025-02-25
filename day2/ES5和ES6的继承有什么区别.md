**ES5和ES6的继承有什么区别**
    ***1. 继承机制***
        es5 通过原型链实现继承,使用构造函数和prototype属性
        es6 通过class 和 extends 关键词实现继承，语法更接近传统的面向对象语言
    ***2. 语法***
        es5
          ``function Parent() {}
            function Child() {}
            Child.prototype = Object.create(Parent.prototype);
            Child.prototype.constructor = Child;``
        es6 
           `` class Parent {}
            class Child extends Parent {}``
    ***3. 构造函数调用***
        es5 子类构造函数中显示调用父类构造函数 
            ``function child(){
                Parent.call(this)
            }``
        es6 子类构造函数中必须调用 super() 否则会报错
     ***4. 静态方法继承***
        es5 静态方法不会自动继承,需手动处理
        es6 静态方法自动继承
     ***5.原型方法的可枚举型***
        es5 添加到prototype上的方法默认是可枚举的
        ``
        Parent.prototype.method = function() {};
        console.log(Object.keys(Parent.prototype)); // ['method']
        ``
        es6 类中定义的方法默认是不可枚举的
        ``
        class Parent {
            method() {}
        }
        console.log(Object.keys(Parent.prototype)); // []
        ``
     ***6.new.target***
        es5: 无法直接检测构造函数是否通过new调用
        es6: 通过 new.target 可以检测是否通过new 调用
        ``
        class Parent {
            constructor() {
                if (new.target === Parent) {
                console.log('Parent instantiated with new');
                }
            }
        }
        ``
     ***7.内置对象继承***
        es5: 无法直接继承内置对象 如Array Error 等
        es6 可以直接继承内置对象
        ``class MyArray extends Array{}``