# 前端项目脚手架

## 技术栈

- 框架：Tanstack Start
- 样式：TailwindCSS
- 图标：_待定_
- 国际化：next-intl core
- 数据验证：zod
- 代码格式化：biome
- 数据获取：TanStack Query
- 状态管理：_待定_

## 目录结构

参照 <https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md>。

## 开发环境设置

我们推荐使用 Visual Studio Code (VSCode) 进行开发，但这不是强制要求。为了方便快速设置开发环境或进行线上调试，我们也提供了 devcontainer 配置。

### 本地环境要求

要在本地运行和开发本项目，你需要以下环境：

- Node.js（推荐使用最新的 LTS 版本）
- pnpm 包管理器
- Git 版本控制系统

### 使用 devcontainer

1. 确保你的系统上安装了 Docker 和 VSCode。
2. 在 VSCode 中安装 "Remote - Containers" 扩展。
3. 克隆此仓库并在 VSCode 中打开。
4. 当提示时，选择 "Reopen in Container"。

### 使用 GitHub Codespace

GitHub Codespaces 提供了一个便捷的云端开发环境，无需本地设置即可开始工作：

1. 在 GitHub 仓库页面上，点击 "Code" 按钮，然后选择 "Open with Codespaces"。
2. 选择 "New codespace" 创建一个新的开发环境。
3. 等待环境准备完毕后，你就可以直接在浏览器中开始编码了。

## 持续集成及部署

我们使用自动化的 CI/CD 流程进行部署：

- 生产环境：从 main 分支自动部署
- 预览环境：从 develop 分支自动部署
- 其他分支：会自动分配临时的预览部署

## 贡献指南

本项目贡献流程与大部分开源项目类同。请查阅 [CONTRIBUTING.md](https://github.com/MoonPixelTeam/web/.github/CONTRIBUTING.md) 文件了解更多关于如何参与项目开发的信息。（贡献指南从别的项目搬过来机翻的，凑合看）
