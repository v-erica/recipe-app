# Recipe App (Unit 7)

This project is aligned to the Unit 7 recipe app rubric criteria.

## Project setup

This project is a React app with a lightweight Express API for development.

### Requirements
- Node.js 18+ (LTS recommended)
- npm (or your preferred npm-compatible package manager)

### Install dependencies
```bash
npm install
```

### Initial scaffold command (`npx`)
If you need to recreate this project structure from scratch, use:
```bash
npx create-vite@latest recipe-app --template react
```
Then:
```bash
cd recipe-app
npm install
```

### Run the app (development)
```bash
npm run dev
```

This starts an Express server on `http://localhost:5173` that:
- Serves the Vite dev build middleware
- Logs requests with `morgan('dev')`
- Exposes the recipes API at `/api/recipes`

Both commands load environment variables from `.env` using `--env-file=.env`.

You can also run the server directly:
```bash
npm start
```

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

### Lint
```bash
npm run lint
```

## What is included
- Frontend framework: React 19 (`react`, `react-dom`)
- Build tool: Vite
- Backend: Express + Morgan (`morgan('dev')`)
- Linting: ESLint
- Entry file: `src/main.jsx`
- App component in `main.jsx`: `./app.jsx`
- Recipe data is now loaded through `GET /api/recipes`.

## Notes
- `package.json` is the source of truth for scripts and dependencies.
- If you also want only frontend-only mode, run the Vite server directly with `npx vite`.

## Rubric evidence checklist

### 1) Project Setup
- VS Code + GitHub workflow is used for this project.
- `npx` setup command is documented above (`create-vite`).
- GitHub Copilot usage can be documented in your submission notes/process log.

### 2) UI Generation
- Recipe UI is implemented and styled in:
  - `src/app.jsx`
  - `src/components/*`
  - `src/App.css`

### 3) Sample Data Generation
- Sample recipe data exists in:
  - `src/data/recipes.js`
  - `FALLBACK_RECIPES` in `src/app.jsx`

### 4) Recipe Display
- Recipes are fetched from `/api/recipes` and rendered in the list/detail layout:
  - `src/app.jsx`
  - `src/components/RecipeList.jsx`

### 5) Recipe Detail Component
- Implemented in:
  - `src/RecipeDetail.jsx`

### 6) Search Functionality
- Implemented with query state + filtering:
  - `src/app.jsx`
  - `src/components/RecipeSearch.jsx`
