# 🚀  Astro Sidecar

Watch and execute TypeScript processes alongside your Astro development server.

**Use cases**:

- REST API **mocking** server
- **WebSocket** server
- Parallel **bundlers**, like Vite, Webpack, Rollup…

**Features**:

- **Live reload** of each separate process on file change
- **WebSocket** TypeScript compilation and execution
- Pipe **coloured** terminal outputs to the main one

It uses **`tsx` + `execa`** under the hood, and comes as an AstroJS **integration**.

## 📦  Installation

```sh
pnpm astro add astro-sidecar
```

## 🛠  Usage

Add as many sidecar(s) as needed in your `./astro.config.mjs`, you must setup entry points like this:

```mjs
import { defineConfig } from 'astro/config';
import astroSidecar from 'astro-sidecar';

// https://astro.build/config
export default defineConfig({
	integrations: [
		//
		astroSidecar({
			entryPoint: './src/server/mocking.ts',
		}),
		astroSidecar({
			entryPoint: './src/server/websocket.ts',
		}),
		astroSidecar({
			entryPoint: './src/server/webpack.ts',
		}),
	],
});
```

<!-- ## 🎉  Result

<div class="git-footer">

---

## 🕹  Live Demo

<div align="center">
	<a href="https://stackblitz.com/github/JulianCataldo/astro-sidecar/demo"><img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" alt="Open in StackBlitz"></a>
	<a href="https://codesandbox.io/p/github/JulianCataldo/astro-sidecar/demo/main"><img src="https://assets.codesandbox.io/github/button-edit-lime.svg" alt="Open with CodeSandbox"></a>
</div> -->

## 🤷🏼‍♂️  But… why?

I found myself to re-use this piece of code across various Astro integrations (apps. and projects). \
Here are some use cases here, but you can find yourself many others creative uses for this.

### WebSocket

I had trouble running a WebSocket server alongside the Vite dev. one.
It's seems to be common need for Vite-based frameworks users (see
[this](https://stackoverflow.com/questions/75319037/how-to-setup-a-websocket-server-inside-sveltekit-using-the-ws-package),
[that](https://dev.to/theether0/sveltekit-with-socketio-and-nodejs-285h), or
[this](https://github.com/sveltejs/kit/issues/1491)…).

While upgrading the `server.httpServer` has worked for me, some HMR issues still arose.\
Basically it's very difficult not to have the dreaded "Socket already in use" issue,
as soon as you are importing your server inside your Astro project (server-side). \
I'm still investigating a way to use the `ws` instance inside the main app. scope,
but meanwhile, this project allows to kickstart WebSocket endpoint easily, though with a different port.\
Please note your are required to include (or not) the server in your final SSR app. (e.g. using middleware). \
There might be a way to streamline this part furthermore (e.g. leveraging build hooks API?, SSR assets manifest?…).

### Mock server / API endpoint (exotic server framework)

You might want to spin-up a Fastify / Koa / Express / _you name it_, server framework,
for example you want to use a specific library for only made for it. \
Or you may want to add a bit of realism by using a different server origin during dev., like it would in the wild.

### Additional / exotic bundlers

Maybe you have a older micro-frontend using Webpack, with Vite incompatible libraries,
or maybe you want to build an intricate module federation-like system, with total isolation
for each build / processes…

---

Other projects:

- [remark-lint-frontmatter-schema](https://github.com/JulianCataldo/remark-lint-frontmatter-schema): Validate your Markdown **frontmatter** data against a **JSON schema**.
- [retext-case-police](https://github.com/JulianCataldo/retext-case-police): Check popular names casing. Example: ⚠️ `github` → ✅ `GitHub`.
- [Flowbite Astro Admin Dashboard](https://github.com/themesberg/flowbite-astro-admin-dashboard): Open-source admin dashboard template built with Astro, Flowbite, and Tailwind CSS

---

<div align="center">

**Find this project useful?**

[![GitHub](https://img.shields.io/badge/🌟_Leave_a_star_on_GitHub-222222?logo=github&style=social)](https://github.com/JulianCataldo/remark-lint-frontmatter-schema)

🔗  [JulianCataldo.com](https://www.juliancataldo.com/)

</div>

</div>
