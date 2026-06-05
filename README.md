# Ribbon Admin Frontend

A modern, scalable admin dashboard built with cutting-edge web technologies. This project provides a professional foundation for building enterprise-grade administrative interfaces with best-in-class developer experience.

---

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [Development Workflow](#development-workflow)
- [License](#license)

---

## ✨ Features

### Core Technology Stack
- **⚡ Next.js 14** — Utilizing the modern App Router for optimal performance and developer experience
- **⚛️ React 18** — Latest React features for building interactive user interfaces
- **⛑ TypeScript** — Full static typing for improved code quality and maintainability

### Development Tools & Practices
- **📏 ESLint** — Automated code quality and consistency analysis
- **💖 Prettier** — Opinionated code formatter ensuring uniform style
- **🐶 Husky** — Git hooks automation for pre-commit checks
- **🚓 Commitlint** — Enforces conventional commit standards
- **🖌 Renovate** — Automated dependency management and updates
- **🚫 Lint-staged** — Performance-optimized pre-commit linting
- **👷 CI/CD Workflow** — Type checking and linting on pull requests
- **⚙️ EditorConfig** — Cross-IDE coding style standardization
- **🗂 Path Mapping** — Clean, maintainable imports with `@` prefix

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** ≥ 20.x
- **Yarn** ≥ 1.22.22

---

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/arhamimran324/ribbon_admin_frontend.git
cd ribbon_admin_frontend
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

---

## 📁 Project Structure

```
ribbon_admin_frontend/
├── .github/              # GitHub Actions CI/CD workflows
├── .husky/               # Git hooks configuration
├── public/               # Static assets (images, robots.txt, favicon)
├── src/                  # Application source code
│   ├── components/       # Reusable React components
│   ├── pages/            # Application pages
│   ├── styles/           # Global and component styles
│   └── ...
├── .eslintrc.json        # ESLint configuration
├── .prettierrc            # Prettier configuration
├── tsconfig.json         # TypeScript configuration
├── next.config.js        # Next.js configuration
└── package.json          # Project dependencies and scripts
```

---

## 🛠 Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server on `http://localhost:3000` |
| `yarn build` | Create optimized production build |
| `yarn start` | Run application in production mode |
| `yarn type-check` | Validate code with TypeScript compiler |
| `yarn lint` | Run ESLint on `src` directory |
| `yarn format` | Format code with Prettier |

---

## ⚙️ Configuration

### TypeScript Path Mapping

The project uses TypeScript path aliases for cleaner, more maintainable imports. Use the `@` prefix to import from the project root:

```typescript
// Import components
import { Button } from '@/components/Button';
import { Layout } from '@/components/Layout';

// Import utilities
import { formatDate } from '@/utils/formatters';

// Import from public folder
import logoImage from '@/public/images/logo.png';
```

### Environment Variables

Create a `.env.local` file in the project root for environment-specific configuration:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
API_SECRET_KEY=your_secret_key
```

---

## 👥 Development Workflow

### Commit Standards

This project enforces [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Common types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat(auth): implement JWT authentication
fix(dashboard): resolve chart rendering issue
docs: update API documentation
```

### Pre-commit Checks

Husky automatically runs:
- ESLint and Prettier checks on staged files
- TypeScript type validation
- Commit message validation

---

## 🧪 Technology Stack

| Technology | Percentage | Purpose |
|-----------|-----------|---------|
| TypeScript | 95.8% | Type-safe JavaScript development |
| CSS | 2.9% | Styling and layout |
| JavaScript | 1.3% | Dynamic functionality |

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE.md](LICENSE.md) file for full details.

---

## 🤝 Contributing

Contributions are welcome! Please ensure your code follows the project's standards:

1. Follow Conventional Commits
2. Maintain TypeScript best practices
3. Pass all linting and type checks
4. Add tests where applicable

---

## 📞 Support

For issues, questions, or suggestions, please open an [issue](https://github.com/arhamimran324/ribbon_admin_frontend/issues) on GitHub.

---

<div align="center">
  <sub>Built with ❤️ for modern web development</sub>
</div>
