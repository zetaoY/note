# HTML5存储

> [慕课网链接](http://www.imooc.com/learn/104)

## 存储形式
- 本地存储
- 离线缓存
- IndexedDB/Web SQL

## 本地存储
### localStorage
- 存储形式

    `key: value`
- 过期策略

    `永不过期, 除非手动删除`
- 大小

    `5M`
- 浏览器支持
    
    `IE8/Safari3.2/Andeoid2.1`


### sessionStorage

- 过期策略

    `关闭页面后删除`

API
> getItem/setItem  设置/获取  
key(int)  按索引获取  
clear  清除所有  

***跨域问题***
- 需要使用 `postMessage` 实现

### indexedDB database

> 能在浏览器中持久存储结构化数据的***数据库***, 并且为 Web应用 提供了丰富的***查询能力***

- 浏览器支持

    `IE10+`, 移动端支持较差, `opera` 完全不支持

> W3C 已停止维护 Web SQL


