# 开发文档

## 代码规范

本项目使用 Prettier 与 ESLint 规范代码。

- JavaScript、TypeScript（`.vue`、`.js`、`.ts`）：详见 [`prettier.config.js`](./prettier.config.js) 与 [`eslint.config.js`](./eslint.config.js)；
- Markdown：[Markdown lint tool](https://github.com/markdownlint/markdownlint)（[规范](https://github.com/DavidAnson/markdownlint/blob/main/doc/md001.md)）；
- Css、Scss：BEM 规范 `block-name__element-name--modifier-name`。

## 更换服务器

默认的服务器链接写死在以下文件，更换时需要**全部替换**。

- [`.env`](./.env)：服务器地址 `FOHPWA_URL_API_ORIGIN`。
- [`vite.config.ts`](./vite.config.ts)：vite 开发时转发，用于解决跨域问题。
- [`netlify.toml`](./netlify.toml)：netlify 转发，用于解决跨域问题。

## 依赖更新

一般情况下，依赖需要全部保持最新，除非有特殊情况。

## 应用截图

截图包含竖屏与横屏。他们参数如下：

| 方向 | 边框 | 内容大小 | 实际大小 | 示例                                                                                          |
| ---- | ---- | -------- | -------- | --------------------------------------------------------------------------------------------- |
| 竖屏 | 1px  | 500x800  | 502x802  | <img src="../../public/screenshots/Snipaste_2023-12-05_05-17-05.webp" width=100 alt="竖屏截图" /> |
| 横屏 | 1px  | 960x600  | 962x602  | <img src="../../public/screenshots/Snipaste_2023-12-05_05-16-05.webp" width=100 alt="横屏截图" /> |

其中 `1px` 的边框是因为 Snipaste 会自带 `1px` 的边框，所以需要额外加 `2px` 。

因为截图需要打包到成品中，所以存放到 [`./public/screenshots`](./public/screenshots/) 目录下。

<details>
<summary>截图展示位置</summary>

- README 中
- PWA 应用安装时的对话框

</details>
