
## 开始

```bash
# 安装
npm install

# 建议使用
npm install --registry=https://registry.npm.taobao.org

# 启动
npm start
```

在浏览器打开: http://localhost:8080

## 打包

```bash
# 建立测试环境
npm run build:test

# 构建生产环境
npm run build:prod 或 npm run build
```

## 开发

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果+静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查和自动修复
npm run lint -- --fix
```