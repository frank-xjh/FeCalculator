# FeCalculator

> 基于electron开发的计算器

[English Document](https://github.com/frank-xjh/FeCalculator/blob/master/README.md)

## 概观

- 精准计算，不差毫厘
- 整洁界面，强大功能
- 常规/科学快速切换

## 所需依赖

- [node.js 8.11.3](https://nodejs.org/zh-cn/)
- [electron 2.0.7+](https://electronjs.org/)
- [electron-packager 12.1.0+](https://github.com/electron-userland/electron-packager)
- [electron-builder 20.27.1+](https://www.electron.build/)
- [mathjs 3.20.2+](http://mathjs.org/)

## 支持的平台

- Windows (32/64 bit)
- OS X (also known as macOS)
- Linux (x86/x86_64)

它为以下平台生成可执行文件/包：

- Windows（32/64位）

- OS X（darwin）/ [Mac App Store](http://electron.atom.io/docs/v0.36.0/tutorial/mac-app-store-submission-guide/)（mas）*

- Linux（适用于x86，x86_64，armv7l，arm64架构）

它为以下平台生成安装程序：

- [macOS](https://www.electron.build/configuration/mac): `dmg`, `pkg`, `mas` *
- [Linux](https://www.electron.build/configuration/linux): [AppImage](http://appimage.org/), [snap](http://snapcraft.io/), debian package (`deb`), `rpm`, `freebsd`, `pacman`, `p5p`, `apk `
- [Windows](https://www.electron.build/configuration/win): `nsis` (安装程序), `nsis-web` (web平台安装程序), `portable` (无需安装的便携式应用程序), AppX (Windows商店), MSI, Squirrel.Windows

>*OS X / MAS目标包的注意事项：只能在主机OS X平台上构建。*

## 安装依赖

在项目根目录：

```javascript
npm install   # cnpm install
```

你可以使用[cnpm](https://npm.taobao.org/)安装

## 用法

### 运行

```javascript
npm start # cnpm start
```

### 构建

如果你想生成可执行文件/包，运行此命令：

```javascript
npm run-script package # cnpm run-script package
```
它会在`./outApp`生成各平台下的可执行文件/包

如果你想生成安装程序，运行此命令：

```javascript
npm run-script dist # cnpm run-script dist
```

它会在`./dist`生成各平台下的安装程序

## 感谢

- 如果你觉得这很有帮助，我会很感激。
- 感谢所有为本项目做出贡献的人

## 许可

The [Apache-2.0](https://opensource.org/licenses/Apache-2.0) License