# 贡献指南

在贡献之前，请阅读[贡献者公约](./CODE_OF_CONDUCT.zh.md)与本文件。

## 翻译

本项目主要语言为*简体中文*，你可以根据*简体中文*翻译为其他语言。

当然了如果你不会*简体中文*，也可以参考官方的*英文*文档。

### 翻译项目介绍

项目介绍包括 README、CONTRIBUTING 等文件（不包括 [`/docs`](./docs/) 目录下的文件）。

默认为英文，但以简体中文为主。其他语言文件名为 `<文档名>.<语言>.md`（例如 [`README.zh.md`](./README.zh.md)）。

| 语言     | 文件名               |
| -------- | -------------------- |
| 英语     | `<文档名>.md`        |
| 简体中文 | `<文档名>.zh.md`     |
| 其他语言 | `<文档名>.<语言>.md` |

> [!NOTE]
>
> 目前，本项目不接受简体中文以外的贡献指南（CONTRIBUTING）。

### 翻译文档

文档是指 [`/docs`](./docs/) 下的文件。

默认为英文，但以简体中文为主。其他语言文件名为 `<文档名>.<语言>.md`（例如 [`README.zh.md`](./docs/README.zh.md)）。

| 语言     | 文件名               |
| -------- | -------------------- |
| 英语     | `<文档名>.md`        |
| 简体中文 | `<文档名>.zh.md`     |
| 其他语言 | `<文档名>.<语言>.md` |

> [!NOTE]
>
> 目前，本项目不接受简体中文以外的任何文档。

### 翻译应用

应用内所有翻译存放在 [`/src/locales/`](./src/locales/) 目录下，内容请以简体中文（[`zh-CN.json`](./src/locales/zh-CN.json)）为主。

一旦新增一门语言后，必须在 [`locales/index.ts`](./src/locales/index.ts) 中导入该语言文件，并在[应用设置数据文件（settings.ts）](./src/data/settings.ts)的 `language` 中添加该语言名称以及代码。

> [!TIP]
>
> 可以使用 [i18n Ally](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally) 辅助您翻译。

## 提交代码

您可以参考[开发文档](./docs/develop/README.zh.md)。
