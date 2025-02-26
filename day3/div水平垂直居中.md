已知
```  
    <div class='parent'>
        <div class='child'></div>
    </div>
```
1. 通过 flex 实现
``` 
    .parent{
        display:flex;
        justify-content:center;
        align-items:center;
    }
```
2. 通过相对定位和绝对定位
   ```
    // 宽高未知
    .parent{
        position:relatve;
    }
    .child{
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,50%);
    }
    // 已知宽高
    div.child {
        width: 50px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
   ```
3. 通过 display grid
   ```
    .parent{
        display:grid;
    }
    .child{
        justify-self: center;
        align-self:center
    }
   ```
4. 用margin
    ```
    div.parent{
        display:flex;
    }
    div.child{
        margin:auto;
    }
    ```