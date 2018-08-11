# html-layout-webpack-plugin

> webpack html 布局插件，适用于 html 模块化引用和多布局引用

## Install

```
$ npm i -D html-layout-webpack-plugin
```

## Usage

#### webpack.config.js

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlLayoutWebpackPlugin = require("html-layout-webpack-plugin");
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProd ? "production" : "development",
  entry: "./index.js",
  output: {
    path: __dirname + "/dist",
    filename: "index_bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html"
    }),
    // 传入对应用到的key值和对应的目录路径，key值名称和数量并无限制
    new HtmlLayoutWebpackPlugin({
      include: path.resolve("./includes"),
      layout: path.resolve("./layouts")
    })
  ]
};
```

#### index.html

引用一个布局

```html
<!-- @layout:default -->
<div class="content">
    content
</div>
```

#### layouts/default.html

定义一个布局，其中 slot = true 为内容分发，即被引用的本身数据

```html
<!-- @include:header -->
<!-- @slot:true -->
<!-- @include:footer -->
```

#### includes/header.html

定义一个页头组件

```html
<!DOCTYPE html>
<html>
    <head>
        <title>html-layout-webpack-plugin</title>
    </head>
    <body>
```

#### includes/footer.html

定义一个页脚组件

```html
    </body>
</html>
```

## Output

#### dist/index.html

```html
<!DOCTYPE html>
<html>
    <head>
        <title>html-layout-webpack-plugin</title>
    </head>
    <body>
      <div class="content">
          content
      </div>
      <script type="text/javascript" src="index_bundle.js"></script>
    </body>
</html>
```

## License

MIT © [Harvey Zack](https://www.zhw-island.com/)
