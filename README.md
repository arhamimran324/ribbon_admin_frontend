<div align="center"><strong>Next.js Starter Template</strong></div>
<div align="center">Highly scalable foundation with the best DX. All the tools you need to build your next project.</div>

<br />


<div align="center">
  <sub>Created by Code Encoders with the help of wonderful contributors.</sub>
</div>

<br />

## Features

- ⚡️ Next.js 14 (App Router)
- ⚛️ React 18
- ⛑ TypeScript
- 📏 ESLint — To find and fix problems in your code
- 💖 Prettier — Code Formatter for consistent style
- 🐶 Husky — For running scripts before committing
- 🚓 Commitlint — To make sure your commit messages follow the convention
- 🖌 Renovate — To keep your dependencies up to date
- 🚫 lint-staged — Run ESLint and Prettier against staged Git files
- 👷 PR Workflow — Run Type Check & Linters on Pull Requests
- ⚙️ EditorConfig - Consistent coding styles across editors and IDEs
- 🗂 Path Mapping — Import components or images using the `@` prefix

### Development

To start the project locally, run:

```bash
yarn run dev
```

Open `http://localhost:3000` with your browser to see the result.

## Documentation

### Requirements

- Node.js >= 20
- yarn >= 1.22.22 

### Directory Structure

- [`.github`](.github) — GitHub configuration including the CI workflow.<br>
- [`.husky`](.husky) — Husky configuration and hooks.<br>
- [`public`](./public) — Static assets such as robots.txt, images, and favicon.<br>
- [`src`](./src) — Application source code, including pages, components, styles.

### Scripts

- `yarn dev` — Starts the application in development mode at `http://localhost:3000`.
- `yarn build` — Creates an optimized production build of your application.
- `yarn start` — Starts the application in production mode.
- `yarn type-check` — Validate code using TypeScript compiler.
- `yarn lint` — Runs ESLint for all files in the `src` directory.
- `yarn format` — Runs Prettier for all files in the `src` directory.

### Path Mapping

TypeScript are pre-configured with custom path mappings. To import components or files, use the `@` prefix.

```tsx
import { Button } from '@/components/Button';
// To import images or other files from the public folder
import avatar from '@/public/avatar.png';
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for more information.
