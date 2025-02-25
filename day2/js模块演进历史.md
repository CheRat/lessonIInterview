**一、模块化演进史**
1. IIFE 
   1. 核心思想
      1. 通过闭包隔离作用域，避免全局污染
   2. 特点
      1. ``
        (function(window){
            const data = {};
            wndow.module = {
                method:()=>{}
            };
        })(window)
      ``
2. AMD
   1. 代表库 RequireJS
   2. 特点
      1. ``
        define(['dep1','dep2'],function(dep1,dep2){
            return {method:()=>dep1.action()}
        })
      ``
      2. 浏览器优先，异步加载
      3. 前置声明依赖，提前执行
      4. 适合网络环境较差的场景
3. CMD
   1. 代表库 Sea.js
   2. 特点 
      1. ``define(function(require,exports,module){
            const dep1 = require('./dep1');
            module.exports = { method:function(){} }
        })``
      2. 依赖就近，延迟执行
      3. 更符合 CommonJS 书写习惯
4. CommonJS
   1. 应用场景： Node.js 服务端
   2. 特点
      1. ``const fs = require('fs')// 同步加载
           module.exports = function(){}
        ``
5. UMD 
   1. 设计目标 兼容 AMD/CommonJS/全局变量
   2. 实现模式
      1. ``
        (function(root,factory){
            if(typeof define === 'function' && define.amd){
                define(['dep'].factory);
            }else if (typeof exports === 'object'){
                module.exports = factory(require('dep'))
            }else {
                root.module = factory(root.dep)
            }
        })(this,(dep)=>({ method:()=>{} } ))
      ``
**二、现代解决方案**
1. ES Module (ESM)
   1. 标准化: ES6 语言级支持
   2. 关键特性
      1. ``import {func} from './module.js' 
         export const value = 42
         ``
      2. 静态分析支持 Tree Shaking
      3. 输出为实时绑定的引用
      4. 浏览器原生支持需配合 ``<script type="module">``
2. Webpack 生态
   1. require.ensure:
      1. ``requrie.ensure([],(require)=>{
            const chunk = require('./async-module');
         },'chunk-name')``
      2. 动态加载生成独立的chunk文件
      3. 现代已被 import() 语法代替
   2. 打包策略
      1. 支持所有历史模块规范
      2. 通过``__webpack_require__`` 模拟模块系统
      3. 实现Scope Hoistiog 优化
3. 浏览器原生模块
   1. ``<script type="module">``
      1. 自动启用严格模式
      2. 支持 import/export 语法
      3. 默认 defer加载 
      4. 需要服务端提供正确的 MIME 类型
4. 对比决策指南
    | 方案 | 适用场景 | 典型工具链 | 关键优势 |
    | :-----: | :--: | :-------: | :-------:|
    | IIFE | 小型传统项目| 无 | 简单快速|
    | AMD | 遗留浏览器项目| RequireJS|异步加载依赖|
    |CommonJS| Node.js 后端开发| Webpack/Babel| 同步加载生态完善|
    | ESM| 现代浏览器/Node.js 14+| Vite/Rollup|语言标准 静态优化|
    |Webpack| 复杂前端工程| 完整工具链|生态强大、兼容历史方案|
    |<script module>| 现代浏览器原型开发|无构建步骤|原生支持、快速迭代|
