# 🚀  Astro Sidecar

Watch and execute TypeScript processes alongside your Astro development server.

> **Warning**: Experimental. It has some rough edges.

**Use cases**:

- REST API **mocking** server
- **WebSocket** server
- Parallel **bundlers**, like Vite, Webpack, Rollup…

**Features**:

- **Live reload** of each separate process on file change
- **WebSocket** TypeScript compilation and execution
- Pipe **coloured** terminal outputs to the main one

It uses **`tsx` + `concurrently`** under the hood, and comes as an AstroJS **integration**.

> **Note:** Checkout the demo with **Fastify** + **SocketIO** servers / client integration in the [project repository](https://github.com/JulianCataldo/astro-sidecar/blob/master/demo).

## 📦  Installation

```sh
pnpm astro add astro-sidecar
pnpm i -D tsx
```

## 🛠  Usage

Add as many sidecar(s) as needed in your `./astro.config.mjs`, you must setup entry points like this:

```mjs
import { defineConfig } from 'astro/config';
import sidecar from 'astro-sidecar';

// https://astro.build/config
export default defineConfig({
	integrations: [
		//
		sidecar({
			entryPoints: [
				//
				'./src/server/websocket.ts',
				'./src/server/mocking.ts',
				'./src/server/exotic-bundler.ts',
				// ...
			],
		}),
	],
});
```

## 🎉  Result

https://user-images.githubusercontent.com/603498/225384084-5159b008-182c-4a4c-adf6-e5aabe88b42b.mp4

## 🕹  Live Demo

It comes with two pre-configured sidecar, server boilerplates:

- **Fastify**, for setting up a mocking server, a proxy…
- **SocketIO _server_** for WebSocket communication

Everything is wired up **client side** too, as seen in the [Astro index page](./demo/src/pages/index.astro).  
Native **`fetch`** is used for REST API and **SocketIO _client_** for the WebSocket connection.

---

Web containers:

<div align="center">
	<a href="https://stackblitz.com/github/JulianCataldo/astro-sidecar/tree/master/demo"><img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" alt="Open in StackBlitz"></a>
	<a href="https://codesandbox.io/s/github/JulianCataldo/astro-sidecar/tree/master/demo"><img src="https://assets.codesandbox.io/github/button-edit-lime.svg" alt="Open with CodeSandbox"></a>
</div>

---

_— OR —_ locally:

```
pnpx degit https://github.com/JulianCataldo/astro-sidecar/demo ./demo
pnpm dev
```

## 🤷🏼‍♂️  But… why?

I found myself to re-use and perfect this tiny piece of code across various Astro integrations (apps. and projects). \
Here are some non-exhaustive use cases here. Of course, you can find yourself many others creative uses for this utility.

I did try other solutions, but wasn't satisfied (e.g. Vite plugins have narrower responsibilities compared to Astro hooks, meaning less power).

It's more or less the same as:

```
pnpm dev & pnpm tsx watch ./src/server/websocket.ts & pnpm tsx watch ./src/server/mocking.ts
```

One main benefit is to make it easier to follow the sequential course of events.

But there are some behaviors difference, like doing <kbd>CTRL</kbd> + <kbd>C</kbd> with the Astro
integration is killing the main process with its child processes.  
The shell solution is more dependendant on OS also.  
Fine with POSIX-compliant environments (macOS, linux, WSL, modern Windows PowerShell? IDK),
but can be troublesome otherwise.  
It's also planned to add an option for bundling sidecars with final SSR production build.

**Known issues**:

- `tsx watch ./src/server/websocket.ts exited with code 130`
- https://github.com/esbuild-kit/tsx/issues/95#issuecomment-1276505396

Need to find a way to relay process termination.  
For now, doing <kbd>CTRL</kbd> + <kbd>C</kbd> two times is bearable.

### WebSocket

I had trouble running a WebSocket server alongside the Vite dev. one.
It's seems to be common need for Vite-based frameworks users (see
[this](https://stackoverflow.com/questions/75319037/how-to-setup-a-websocket-server-inside-sveltekit-using-the-ws-package),
[that](https://dev.to/theether0/sveltekit-with-socketio-and-nodejs-285h), or
[this](https://github.com/sveltejs/kit/issues/1491)…).

While upgrading the `server.httpServer` has worked for me, some HMR issues still arose.\
Basically it's very difficult not to have the dreaded "Socket already in use" issue,
as soon as you are importing your server inside your Astro project (server-side). \
I'm still investigating a way to use the `ws` instance inside the main app. scope (which is the most error-prone), or at least in the `astro.config.mjs` scope,
but meanwhile, this project allows to kickstart WebSocket endpoint easily, though with a different port.\
Please note your are required to include (or not) the server in your final SSR app. (e.g. using the Astro dist. as a middleware). \
There might be a way to streamline this part furthermore (e.g. leveraging build hooks API?, SSR assets manifest?…).  
Anyway, there are also many valid reasons not to include it in the final build.  
E.g. the mocking server, or the WebSocket which could be externalized in production.  
Admittedly, I aim to make it possible to have an all-in-one Astro / Vite + WS solution.

### Mock server / API endpoint (exotic server framework)

You might want to spin-up a Fastify / Koa / Express / _you name it_, server framework,
for example you want to use a specific library only made for it. \
Or add a bit of realism by using a different server origin during dev.  
Or hack a proxy which is altering or caching an external API…

### Additional / exotic bundlers

You have to integrate a older micro-frontend using Webpack, with Vite incompatible libraries,
or you want to build an intricate module federation-like system, with total isolation
for each build / processes…

<div class="git-footer">

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
