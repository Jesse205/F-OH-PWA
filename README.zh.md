# F-OH PWA

<!-- <img src="./src/assets/images/icon.svg" width=192 height=192 alt="项目图标" title="项目图标"/> -->
![BANNER](./docs/images/banner.svg)

F-OH 是一个 OpenHarmony 平台上 FOSS（Free and Open Source Software，自由开源软件）的应用中心，并提供下载安装支持。

F-OH PWA 是基于[粼光商店 Demo](https://gitee.com/sparkling-store/webv3demo) 的一个浏览器版本的 F-OH。

F-OH PWA + BrowserCE，通过网页分发开源鸿蒙 hap 应用的最佳实践，对于有内部分发测试 hap 应用的团队来说，也许是一个不错的选择。

[![许可证](https://img.shields.io/github/license/Jesse205/F-OH-PWA?label=%E8%AE%B8%E5%8F%AF%E8%AF%81)](./LICENSE)
[![Netlify Status](https://api.netlify.com/api/v1/badges/953dd570-c06c-4f52-a688-c2789adaa8cb/deploy-status)](https://app.netlify.com/sites/f-oh-pwa-jesse205/deploys)

[![QQ 群（开鸿派）: 752399947](https://img.shields.io/badge/QQ_群:_开鸿派-752399947-0099FF?logo=tencentqq)](https://qm.qq.com/q/jWeBdnvPz2)
[![@Jesse205: jesse205@qq.com](https://img.shields.io/badge/@Jesse205-jesse205@qq.com-0099FF)](https://qm.qq.com/q/jWeBdnvPz2)

[![Gitee 仓库](https://img.shields.io/badge/Gitee-仓库-C71D23?logo=gitee)](https://gitee.com/ohos-dev/F-OH-PWA)
[![Github 仓库](https://img.shields.io/badge/Github-仓库-0969DA?logo=github)](https://github.com/Jesse205/F-OH-PWA)

**中文** |
[English](./README.md) | <small>期待你的翻译！</small>

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

## 下载与访问

F-OH PWA 提供 **独立软件** 与 **网页访问** 两种方式供用户选择性。

- **F-OH Tauri** ![独立软件](https://img.shields.io/badge/-独立软件-00a6f9)：~~系统深度集成，近乎原生的体验~~，不自动更新，离线可用，加载快速。
  - [Gitee 发行版](https://gitee.com/ohos-dev/F-OH-PWA/releases/latest)
- **F-OH Lite**、**F-OH PWA** ![网页访问](https://img.shields.io/badge/-网页访问-81bd0a) ：点击即用，自动更新，无需下载。
  - 正式版：<http://170.178.208.105:5000/>
  - 开发版：<https://f-oh-pwa-jesse205.netlify.app/#/index/home>

> **Note**\
> ~~因服务器没有 SSL 并且有跨域问题， F-OH PWA 暂时无法使用（[无安全上下文，无法满足成为 PWA 的最低要求][PWASecureContextRequirement]），请使用 F-OH Tauri 或 F-OH Lite (Web)。~~ 如需使用 PWA，请使用部署在 Netlify 上的开发版。

### PWA 安装

**渐进式 Web 应用**（Progressive Web App，PWA）是一个使用 web 平台技术构建的应用程序，但它提供的用户体验就像一个特定平台的应用程序。（来自 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps)）

部分浏览器支持安装该网站到桌面，只需点击“安装应用”。安装后应用名会由 `F-OH Lite` 变为 `F-OH PWA`。

![Chrome 安装应用示意图](./docs/images/pwa/install.png)

## 系列项目

- [F-OH](https://gitee.com/ohos-dev/f-oh)：F-OH OpenHarmony 移动端
- [F-OH Data][F-OH-Data]：F-OH 所有应用程序的元数据，开发者在这里PR提交自己的应用
- [F-OH Server](https://gitee.com/ohos-dev/f-oh-server)：F-OH 服务器，提供接口服务、平台管理等（待开发）
- [F-OH Website](https://gitee.com/ohos-dev/f-oh-website)：F-OH 网站，包含文档、博客、精选应用等（待开发）

## 项目设置

1. 安装 NodeJS v19
2. 安装 Yarn
3. 按照 [Tauri 的预先准备](https://tauri.app/zh-cn/v1/guides/getting-started/prerequisites)设置 Tauri 环境。
   - Windows: Microsoft Visual Studio C++ 生成工具、WebView2、Rust。
   - macOS: CLang 和 macOS 开发依赖项、Rust。
   - Linux: 系统依赖、Rust。
4. 运行 `yarn install`

### 为开发编译和热加载

1. 克隆 [F-OH Data][F-OH-Data] 并启动一个 `5500` 端口的服务器。
2. 在该项目打开终端，按照以下规则运行命令。
   - 网页与 PWA 应用：运行 `yarn dev` 。
   - Windows Tauri 软件：运行 `yarn dev:tauri` 。

### 为生产编译和精简

1. 设置 `.env.production` 文件。
2. 在该项目打开终端，按照以下规则运行命令。
   - 网页与 PWA 应用：
      1. 运行 `yarn build` 。
      2. 拉取 [F-OH Data][F-OH-Data] 到 `dist/data` 。
      3. 部署 `dist/*` 到服务器。
   - Windows Tauri 软件：
      1. 运行 `yarn build:tauri` 。
      2. 发布 `src-tauri\target\release\F-OH Tauri.exe` 与 `src-tauri\target\release\bundle\nsis\F-OH Tauri_<version>_x64-setup.exe`

### 约束和修复文件

```bash
yarn lint
```

## 支持项目

赞助可私信联系[@westinyang]或扫描下方二维码（微信、支付宝）

> **NOTE**\
> 赞助费用请备注“F-OH”或私信告诉[@westinyang]，方便统计到[赞助列表][SponsorList]中。

![QRCode](https://gitee.com/ohos-dev/f-oh/raw/master/screenshot/wx+zfb.png)

对于本项目，您可以进入[哈兔 Box 捐赠页面](https://jesse205.github.io/hellotool/donation.html)支持杰西 205。

## 许可证

```txt
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

[F-OH-Data]: http://170.178.208.105:3000/ohos-dev/F-OH-Data
[PWASecureContextRequirement]: https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#%E5%AE%89%E5%85%A8%E4%B8%8A%E4%B8%8B%E6%96%87
[SponsorList]: https://gitee.com/ohos-dev/f-oh#%E8%B5%9E%E5%8A%A9%E5%88%97%E8%A1%A8
[@westinyang]: https://gitee.com/westinyang
