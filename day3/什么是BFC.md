## 什么是BFC
1. BFC (Block Formatting Context) 块级格式化上下文,是CSS中一个控制块级元素布局的独立渲染区域，通过隔离内部元素与外部元素的相互影响，解决一些常见的布局问题
2. 触发条件
   1. 根元素 ``<html>``
   2. 浮动元素 (float 不为 none)
   3. 绝对定位元素 (postion: absolute/fixed)
   4. overflow 不为 visible 的块元素
   5. display 值为 inline——block flex grid table-cell 等
3. 特性
   1. 独立渲染区域
        BFC 内部的元素布局不影响外部，外部元素也不影响内部 
   2. 垂直排列
        BFC 内的块级元素按垂直方向依次排列 默认文档流
   3. 外边距 margin 折叠解决
        同一 BFC 内的相邻块级元素垂直外边距会合并，但不同BFC之间的外边距不会折叠
   4. 包含浮动元素
        BFC 会计算内部浮动元素的高度，避免父容器高度塌陷
   5. 避开浮动区域
        BFC 区域不会与外部浮动元素重叠