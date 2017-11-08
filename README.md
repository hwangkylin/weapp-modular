#weapp-modular
微信小程序模块化工具

##安装
```
$ npm install weapp-modular -g
```
>目前暂时还没有将包托管到npm

##使用说明

以安装jquery为例，在小程序根目录运行：

```
$ weapp install jquery -F lib -R npm
```

###参数说明
``` 
-F          //必选  所需要安装的小程序目录
-R          //必选  安装的模块源，目前支持npm、bower
```

##TODO
1.将包发到npm上托管

2.制定小程序npm包规范