# 💾 Ivy/api

Ivy's API has two major pieces of functionality:

1. Serve as the proxy server to Ivy/client to NUs course API
2. Opinionated proxy layer/data cleaning layer over the course API

## Ivy/client's proxy server

- Plug and play support for Ivy's client application. Close nit URLs. Secure access from both development and production. CORS-supported
- 1:1 typings (v1.1) with Ivy's client application
- Null checking and custom error handling that Ivy/client is aware of natively

## Opinionated data layer over NUs course API

- Returns opinionated, Ivy-typed JSON bundles from NUs course API.
- Light data cleaning of NUs course API information

## FAQ

| Topic         | Answer     | Comments                                         |
| ------------- | ---------- | ------------------------------------------------ |
| **Runtime**   | Node       | v16 and runs as an HTTP server                   |
| **Builds**    | swc        | `npm run build`                                  |
| **Dev**       | Node       | `npm run dev`                                    |
| **Env**       | .env.local | process.env and .env.local are merged via dotenv |
| **Sandbox**   | Fly        | https://ivy-api.fly.dev/                         |
| **Localhost** | 3001       | Default is http://localhost:3001/                |

## Quickstart for devs

- `cd ivy/server`
- `npm i`
- `npm run dev`

Run this in parallel with `ivy/client`.