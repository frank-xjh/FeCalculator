# FeCalculator

> A calculator based on electron

[中文文档](https://github.com/frank-xjh/FeCalculator/blob/master/README-zh-CN.md)

## Overview

- Accurate calculations,no whit of difference

- Clean interface,great power

- Standard/Science,quickly switch

## Prerequisites

- [node.js 8.11.3](https://nodejs.org/en/)
- [electron 2.0.7+](https://electronjs.org/)
- [electron-packager 12.1.0+](https://github.com/electron-userland/electron-packager)
- [electron-builder 20.27.1+](https://www.electron.build/)
- [mathjs 3.20.2+](http://mathjs.org/)

## Supported Platforms

- Windows (32/64 bit)
- OS X (also known as macOS)
- Linux (x86/x86_64)

It generates executables/bundles for the following platforms:

- Windows (also known as `win32`, for both 32/64 bit)
- OS X (also known as `darwin`) / [Mac App Store](http://electron.atom.io/docs/v0.36.0/tutorial/mac-app-store-submission-guide/) (also known as `mas`)*
- Linux (for x86, x86_64, armv7l and arm64  architectures)

It generates installer for the following platforms:

- [macOS](https://www.electron.build/configuration/mac): `dmg`, `pkg`, `mas` *

- [Linux](https://www.electron.build/configuration/linux): [AppImage](http://appimage.org/), [snap](http://snapcraft.io/), debian package (`deb`), `rpm`, `freebsd`, `pacman`, `p5p`, `apk`

- [Windows](https://www.electron.build/configuration/win): `nsis` (Installer), `nsis-web` (Web installer), `portable` (portable app without installation), AppX (Windows Store), MSI, Squirrel.Windows

>*Note for OS X / MAS target bundles: the .app bundle can only build on a host OS X platform.*

## Install requirements

In the root of the repository:

```javascript
npm install   # cnpm install
```

You can use [cnpm](https://npm.taobao.org/) to install.

## Usage

### Run

```javascript
npm start # cnpm start
```
### Build

If you want to generat executables/bundles,run this command:

```javascript
npm run-script package # cnpm run-script package
```

It will create executables/bundles(all platform) in `./outApp`

If you want to generat installer,run this command:

```javascript
npm run-script dist # cnpm run-script dist
```

It will create installer(all platform) in `./dist`

## Thanks

- I'd appreciate a star if you find this helpful
- Thanks to everyone that contributes to this project

## License

The [Apache-2.0](https://opensource.org/licenses/Apache-2.0) License

> Reference documentation
> - [Electron: 从零开始写一个记事本app](https://www.jianshu.com/p/57d910008612)
> - [electron开发一个计算器](https://www.jianshu.com/p/4defee431782)