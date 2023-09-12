# F-OH PWA

![LOGO](./public/icons/android-chrome-192x192.png)

F-OH 是一个 OpenHarmony 平台上 FOSS（Free and Open Source Software，自由开源软件）的应用中心，并提供下载安装支持。

F-OH PWA 是基于[粼光商店 Demo](https://gitee.com/sparkling-store/webv3demo) 的一个浏览器版本的 F-OH。

[![许可证](https://img.shields.io/github/license/Jesse205/F-OH-PWA?label=%E8%AE%B8%E5%8F%AF%E8%AF%81)](./LICENSE)

[![QQ 群（开鸿派）: 752399947](https://img.shields.io/badge/QQ_群:_开鸿派-752399947-0099FF?logo=tencentqq)](https://qm.qq.com/q/jWeBdnvPz2)

[![Gitee 仓库](https://img.shields.io/badge/Gitee-仓库-C71D23?logo=gitee)](https://gitee.com/ohos-dev/F-OH-PWA)
[![Github 仓库](https://img.shields.io/badge/Github-仓库-0969DA?logo=github)](https://github.com/Jesse205/F-OH-PWA)

**中文** |
[English](./README.md)

## 屏幕截图

<div>
<img src="./public/screenshots/Snipaste_2023-09-06_21-32-26.webp" width=30% />
<img src="./public/screenshots/Snipaste_2023-09-06_21-32-39.webp" width=30% />
<img src="./public/screenshots/Snipaste_2023-09-06_21-32-50.webp" width=30% />
</div>
<div>
<img src="./public/screenshots/Snipaste_2023-09-06_21-33-22.webp" width=30% />
<img src="./public/screenshots/Snipaste_2023-09-06_21-33-28.webp" width=30% />
<img src="./public/screenshots/Snipaste_2023-09-06_21-33-35.webp" width=30% />
</div>

## 系列项目

- [F-OH](https://gitee.com/ohos-dev/f-oh)：F-OH OpenHarmony 移动端
- [F-OH Data](http://gogs.444404.xyz/ohos-dev/F-OH-Data)：F-OH 所有应用程序的元数据，开发者在这里PR提交自己的应用
- [F-OH Server](https://gitee.com/ohos-dev/f-oh-server)：F-OH 服务器，提供接口服务、平台管理等（待开发）
- [F-OH Website](https://gitee.com/ohos-dev/f-oh-website)：F-OH 网站，包含文档、博客、精选应用等（待开发）`

## 项目设置

1. 安装 NodeJS v19
2. 安装 Yarn
3. 按照 [Tauri 的预先准备](https://tauri.app/zh-cn/v1/guides/getting-started/prerequisites)设置 Tauri 环境。
   - Windows: Microsoft Visual Studio C++ 生成工具、WebView2、Rust。
   - macOS: CLang 和 macOS 开发依赖项、Rust。
   - Linux: 系统依赖、Rust。
4. 运行 `yarn install`

> **NOTE**\
> 因服务器没有 SSL 并且有跨域问题， F-OH PWA 暂时无法使用，请使用 F-OH Tauri。

### 为开发编译和热加载

1. 克隆 <http://gogs.444404.xyz/ohos-dev/F-OH-Data> 并启动一个 `5500` 端口的服务器。
2. 在该项目打开终端，按照以下规则运行命令。
   - 网页与 PWA 应用：运行 `yarn dev` 。
   - Windows Tauri 软件：运行 `yarn tauri dev` 。

### 为生产编译和精简

1. 设置 `.env.production` 文件。
2. 在该项目打开终端，按照以下规则运行命令。
   - 网页与 PWA 应用：运行 `yarn build` 。
   - Windows Tauri 软件：运行 `yarn tauri build` 。

### 约束和修复文件

```bash
yarn lint
```

## 许可证

``` txt
Copyright (C) 2023 Jesse205

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```
