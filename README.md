# SwaptoX DApp UI

SwaptoX DApp UI is the web interface for SwaptoX, built with Next.js, React, and TypeScript.

**Live application:** [app.swaptox.com](https://app.swaptox.com/)

## Local Development

Recommended toolchain: Node.js `24.14.1` and pnpm `10.33.0` (supported Node.js range: `>=20.9.0 <25.0.0`).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Production Build

```bash
pnpm build
pnpm start
```

`pnpm start` runs the production build locally at [http://localhost:3000](http://localhost:3000). It does not publish the app by itself. For a Node.js deployment, the usual flow is to build the app and then run it on the production server.

---

# SwaptoX DApp UI（中文）

SwaptoX DApp UI 是 SwaptoX 的网页界面，使用 Next.js、React 和 TypeScript 构建。

**线上应用：**[app.swaptox.com](https://app.swaptox.com/)

## 本地开发

推荐环境：Node.js `24.14.1` 和 pnpm `10.33.0`（支持的 Node.js 版本范围：`>=20.9.0 <25.0.0`）。

```bash
pnpm install
pnpm dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 即可访问。

## 生产构建

```bash
pnpm build
pnpm start
```

`pnpm start` 会在本地 [http://localhost:3000](http://localhost:3000) 启动生产构建。它本身不会发布项目。使用 Node.js 服务器部署时，通常先构建项目，再在生产服务器上运行它。
