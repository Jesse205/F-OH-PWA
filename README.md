# F-OH PWA

![LOGO](./public/icons/android-chrome-192x192.png)

F-OH is an application center for FOSS (Free and Open Source Software) on the OpenHarmony platform with download and installation support.

F-OH PWA is a browser-based version of F-OH based on the [Sparkling Store Demo](https://gitee.com/sparkling-store/webv3demo).

[![License](https://img.shields.io/github/license/Jesse205/F-OH-PWA)](./LICENSE)

[![QQ group (开鸿派): 752399947](https://img.shields.io/badge/QQ_group:_开鸿派-752399947-0099FF?logo=tencentqq)](https://qm.qq.com/q/jWeBdnvPz2)

[![Gitee repository](https://img.shields.io/badge/Gitee-repository-C71D23?logo=gitee)](https://gitee.com/Jesse205/F-OH-PWA)
[![Github repository](https://img.shields.io/badge/Github-repository-0969DA?logo=github)](https://github.com/Jesse205/F-OH-PWA)

[中文](./README.zh.md) |
**English**

## Screenshots

<div>
<img src="./public/screenshots/Snipaste_2023-09-06_21-32-26.webp" width=200 />
<img src="./public/screenshots/Snipaste_2023-09-06_21-32-39.webp" width=200 />
<img src="./public/screenshots/Snipaste_2023-09-06_21-32-50.webp" width=200 />
</div>
<div>
<img src="./public/screenshots/Snipaste_2023-09-06_21-33-22.webp" width=200 />
<img src="./public/screenshots/Snipaste_2023-09-06_21-33-28.webp" width=200 />
<img src="./public/screenshots/Snipaste_2023-09-06_21-33-35.webp" width=200 />
</div>

## Series of projects

- [F-OH](https://gitee.com/ohos-dev/f-oh): F-OH OpenHarmony Mobile
- [F-OH Data](http://gogs.444404.xyz/ohos-dev/F-OH-Data): metadata for all F-OH apps, where developers PR submit their apps
- [F-OH Server](https://gitee.com/ohos-dev/f-oh-server): F-OH server, providing interface services, platform management, etc. (to be developed)
- [F-OH Website](https://gitee.com/ohos-dev/f-oh-website): F-OH website, including documents, blogs, selected applications, etc. (to be developed)

## Project setup

1. Install NodeJS v19
2. Install Yarn
3. Set up the Tauri environment according to [Tauri prep](https://tauri.app/v1/guides/getting-started/prerequisites/).
   - Windows: Microsoft Visual Studio C++ Builder, WebView2, Rust.
   - macOS: CLang and macOS development dependencies, Rust.
   - Linux: system dependencies, Rust.
4. Run `yarn install`

> **NOTE**\
> F-OH PWA is temporarily unavailable because the server does not have SSL and has cross-domain issues, please use F-OH Tauri.

### Compiling and hotloading for development

1. Clone <http://gogs.444404.xyz/ohos-dev/F-OH-Data> and start a server on port `5500`.
2. Open a terminal in the project and run commands according to the following rules.
   - Web and PWA applications: run `yarn dev`.
   - Windows Tauri software: run `yarn tauri dev`.

### Compiling and streamlining for production

1. Set up the `.env.production` file.
2. Open a terminal in the project and run commands according to the following rules.
   - Web and PWA applications: run `yarn build`.
   - Windows Tauri software: Run `yarn tauri build`.

## Lint and fixing files

```bash
yarn lint
```

## License

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
