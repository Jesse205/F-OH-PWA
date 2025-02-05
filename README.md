<div align="center">
<img src="./src/assets/images/icon.svg" width=192 height=192 alt="Project logo" title="Project logo"/>

# F-OH PWA ![Third-party](https://img.shields.io/badge/-Third--party-%23ED6F21)

[![Gitee repository](https://img.shields.io/badge/Gitee-repository-C71D23?logo=gitee)](https://gitee.com/Jesse205/F-OH-PWA)
[![Github repository](https://img.shields.io/badge/Github-repository-0969DA?logo=github)](https://github.com/Jesse205/F-OH-PWA)

[![PWA](https://img.shields.io/badge/PWA-html-%235A0FC8?logo=pwa)][Website]
[![Windows](https://img.shields.io/badge/Windows-exe-%232863C5?logo=windows)][ReleaseInGitee]
[![Linux](https://img.shields.io/badge/Linux-deb-%23FCC624?logo=linux&logoColor=%23ffffff)][ReleaseInGitee]

[中文](./README.zh.md) |
**English** |
<small>More translations are welcome!</small>

</div>

![Overview](./docs/images/overview.png)

[F-OH] is an application center for FOSS (Free and Open Source Software) on the OpenHarmony platform with download and installation support.

F-OH PWA is a cross-platform **third-party** [F-OH] based on a browser version of the [Sparkling Store V3 Demo](https://gitee.com/sparkling-store/SparklingStoreV3Demo).

F-OH PWA + BrowserCE, best practices for distributing OpenHarmony hap apps via web pages, might be a good choice for teams with internal distribution of test hap apps.

> 2023-12-29 [F-OH Suspension Notice](https://gitee.com/westinyang/f-oh/blob/master/ServerStopAnnouncement.md)

[![License](https://img.shields.io/github/license/Jesse205/F-OH-PWA)](./LICENSE)
[![Netlify Status](https://api.netlify.com/api/v1/badges/953dd570-c06c-4f52-a688-c2789adaa8cb/deploy-status)](https://app.netlify.com/sites/f-oh-pwa-jesse205/deploys)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](./CODE_OF_CONDUCT.md)

[![open source license](https://img.shields.io/badge/open--source--license-1.0.0-0A59F7.svg)](./docs/terms/licenses_v1.0.0.md)

[![QQ group (OHOS Dev): 528608689](https://img.shields.io/badge/QQ_group:_OHOS--Dev-528608689-0099FF?logo=tencentqq)](https://qm.qq.com/q/CDSFf6DvVK)
[![E-Mail: jesse205@qq.com](https://img.shields.io/badge/E--Mail-jesse205@qq.com-0099FF)](mailto:jesse205@qq.com)

## Screenshots

<div>
<img src="./public/screenshots/Snipaste_2023-12-05_05-17-05.webp" width=30% alt="Home"/>
<img src="./public/screenshots/Snipaste_2023-12-05_05-17-10.webp" width=30% alt="Categories"/>
<img src="./public/screenshots/Snipaste_2023-12-05_05-17-15.webp" width=30% alt="App view"/>
</div>
<div>
<img src="./public/screenshots/Snipaste_2023-12-05_05-16-05.webp" width=30% alt="Home"/>
<img src="./public/screenshots/Snipaste_2023-12-05_05-16-10.webp" width=30% alt="Categories"/>
<img src="./public/screenshots/Snipaste_2023-12-05_05-16-17.webp" width=30% alt="App view"/>
</div>

## Features

- Design: Multi-design-language
  - [HarmonyOS Design](https://developer.huawei.com/consumer/cn/design/)
  - [Material Design 2](https://m2.material.io/)
  - Fluent Design 2 (not yet realized)
- Platform: Browser, Linux, Windows
- Advertising: None
- Fees: None for now
- Source code: Open sourced to Gitee and GitHub
- Internationalization: Multilingual based on Vue I18n

## Download & Use

The F-OH PWA offers a choice between **standalone software** and **web access**.

- **F-OH Tauri** ![SOFTWARE](https://img.shields.io/badge/-SOFTWARE-00a6f9): ~~Deep system integration, near-native experience~~, no automatic updates, available offline, fast loading.
  - [Gitee Releases](https://gitee.com/ohos-dev/F-OH-PWA/releases/latest)
- **F-OH Lite**、**F-OH PWA** ![WEBSITE](https://img.shields.io/badge/-WEBSITE-81bd0a): Click-and-go, automatic update, no download required.
  - Release: ~~<http://74.48.94.162:5000/>~~ (Discontinued)
  - Development: <https://f-oh-pwa-jesse205.netlify.app/>

> [!TIP]
>
> ~~F-OH PWA is temporarily unavailable because the server does not have SSL and has cross-domain issues ([No security context to meet the minimum requirements to be a PWA][PWASecureContextRequirement]), please use F-OH Tauri or F-OH Lite (Web).~~ If you want to use use the PWA, use the development version deployed on Netlify.

### PWA Installation

A **progressive web app** (PWA) is an app that's built using web platform technologies, but that provides a user experience like that of a platform-specific app. (From [MDN](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps))

Some browsers support installing this website to the desktop by clicking "Install Application". After installation, the application name will change from `F-OH Lite` to `F-OH PWA`.

![Chrome Installation Diagram](./docs/images/pwa/install.png)

> [!TIP]
>
> For more information about using PWAs, see [Use Progressive Web Apps in Microsoft Edge](https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/ux).

### Change the API url

The default API url is `/api`, and you can replace it in three ways.

1. Modify the `.env` file, replacing `FOHPWA_URL_API_WEB`, `FOHPWA_URL_API_WEB_ORIGIN`, `FOHPWA_URL_API_CLIENT`, and `FOHPWA_URL_API_CLIENT_ORIGIN` with your own API url, and then build and publish.
2. Directly modify the API url in the application settings.
3. Add `?apiUrl=<Your API url>` to the application link to temporarily override the API url.

## Series of Projects

- [F-OH](https://gitee.com/westinyang/f-oh): F-OH OpenHarmony Mobile
- [F-OH Data]: metadata for all F-OH apps, where developers PR submit their apps
- [F-OH Server]: F-OH server, providing interface services, platform management, etc. (to be developed)
- [F-OH Website]: F-OH website, including documents, blogs, selected applications, etc. (to be developed)

## Project Setup

1. Install NodeJS v21 and [pnpm](https://pnpm.io/installation)
2. (Optional, only required if a Tauri application needs to be developed) Set up the Tauri environment according to [Tauri prep](https://tauri.app/v1/guides/getting-started/prerequisites/).
   - Windows: Microsoft Visual Studio C++ Builder, WebView2, Rust.
   - macOS: CLang and macOS development dependencies, Rust.
   - Linux: system dependencies, Rust.
3. Run `pnpm install`.

### Compiling and Hotloading for Development

1. Clone [F-OH Data] and start a server.
2. (Optional) Save [ `.env.development.local.example`](. /.env.development.local.example) as `.env.development.local` and configure some variables.
3. Open a terminal in the project and run commands according to the following rules.
   - Web and PWA applications: run `pnpm dev:web`.
   - Windows Tauri software: run `pnpm dev:tauri`.

### Compiling and Streamlining for Production

1. Set up the `.env.production` file.
2. Follow the example in [`.env.development.local.example`](. /.env.development.local.example) to configure the data server as shown in the example.
3. Open a terminal in the project and run commands according to the following rules.
   - Web pages and PWA applications:
     1. Run `pnpm build:web`.
     2. (Optional) Pull [F-OH Data] into `dist/data`.
     3. Deploy `dist/*` to the server.
   - Windows Tauri software:
     1. Run `pnpm build:tauri`.
     2. Release `src-tauri\target\release\F-OH Tauri.exe` and `src-tauri\target\release\bundle\nsis\F-OH Tauri_<version>_x64-setup.exe`.

### Lint and Fixing Files

```bash
pnpm lint-fix
pnpm format-fix
```

## Contributing

Please read [`CONTRIBUTING.md`](./CONTRIBUTING.md).

> [!WARNING]
>
> Please be sure to follow the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md).

## Support Program

Sponsorship can be contacted by private message or scanning the QR code below (WeChat, Alipay)

> [!NOTE]
>
> Please note "F-OH" or private message to [@westinyang (Gitee)][@westinyang] for sponsorship fee, so that it can be counted in [Sponsor List][SponsorList].

![QRCode](https://gitee.com/westinyang/f-oh/raw/master/screenshot/wx+zfb.png)

For this project (F-OH PWA), you can go to the [F-OH PWA donation page](https://f-oh-pwa-jesse205.netlify.app/donate) to support Jesse205.

## License

This project uses the GPL-3.0 license, see the [LICENSE](./LICENSE) file for details.

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

[F-OH]: https://gitee.com/westinyang/f-oh
[F-OH Server]: https://gitee.com/westinyang/f-oh/blob/master/F-OH-Server.md
[F-OH Website]: https://gitee.com/westinyang/f-oh/blob/master/F-OH-Web.md
[F-OH Data]: https://gitee.com/westinyang/f-oh-data
[PWASecureContextRequirement]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#secure_context
[SponsorList]: https://gitee.com/ohos-dev/f-oh#%E8%B5%9E%E5%8A%A9%E5%88%97%E8%A1%A8
[@westinyang]: https://gitee.com/westinyang
[ReleaseInGitee]: https://gitee.com/ohos-dev/F-OH-PWA/releases/latest
[Website]: https://f-oh-pwa-jesse205.netlify.app/
