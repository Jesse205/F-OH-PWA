# 贡献指南

## 翻译

本项目主要语言为*简体中文*，你可以根据*简体中文*翻译为其他语言。如果你不会*简体中文*，可以参考官方的英文文档。

> [!TIP]\
> 翻译后请在语言选择器中添加新的语言。

### 翻译项目介绍

项目介绍包括 README、CONTRIBUTING 等文件。

> [!NOTE]\
> 不包括 [`/docs`](./docs/)

默认为英文但以简体中文为主。其他语言文件名为 `<文档名>.<语言>.md`（例如 [`README.zh.md`](./README.zh.md)）。

### 翻译说明文档

说明文档是指 [`/docs`](./docs/) 下的文件。

以简体中文为主。其他语言（**包括英语**）文件名为 `<文档名>.<语言>.md`。

### 翻译网站

网站内所有翻译存放在 [`/src/locales/`](./src/locales/) 目录下，内容请以简体中文（[`zh-CN.ts`](./src/locales/zh-CN.ts)）为主。

一旦新增一门语言后，须在 [`index.ts`](./src/locales/index.ts) 中注册该语言。

## 更换服务器

服务器链接写死在以下文件，更换时需要**全部替换**。

- [`.env`](./.env)：服务器地址 `VITE_HOST_SERVER`。
- [`vite.config.ts`](./vite.config.ts)：vite 开发时转发，用于解决跨域问题。
- [`netlify.toml`](./netlify.toml)：netlify 转发，用于解决跨域问题。

## 代码规范

本项目使用 Prettier 与 ESLint 规范代码。

- JavaScript、TypeScript（`.vue`、`.js`、`.ts`）：详见 [`prettier.config.js`](./prettier.config.js) 与 [`.eslintrc.cjs`](./.eslintrc.cjs)。
- Markdown：
  - [Markdown lint tool](https://github.com/markdownlint/markdownlint)（[规范](https://github.com/DavidAnson/markdownlint/blob/main/doc/md001.md)）

## 依赖更新

一般情况下，依赖需要全部保持最新，除非有特殊情况。

**不要更新的依赖**：

| 依赖                               | 原因          |
| ---------------------------------- | ------------- |
| `@typescript-eslint/eslint-plugin` | lint 无法使用 |
| `@typescript-eslint/parser`        | lint 无法使用 |

## 截图

截图包含竖屏与横屏。他们参数如下：

| 方向 | 边框 | 内容大小 | 实际大小 | 示例        |
| ---- | ---- | -------- | -------- | ----------- |
| 竖屏 | 1px  | 500x800  | 502x802  | ![横屏截图] |
| 横屏 | 1px  | 960x600  | 962x602  | ![竖屏截图] |

[横屏截图]: ./public/screenshots/Snipaste_2023-12-05_05-16-05.webp
[竖屏截图]: ./public/screenshots/Snipaste_2023-12-05_05-17-05.webp

其中 `1px` 的边框是因为 Snipaste 会自带 `1px` 的边框，所以需要额外加 `2px` 。

所有截屏存放到 [`./public/screenshots`](./public/screenshots/) 目录下，因为需要打包进软件内，并在 PWA 安装前显示。
