# Recipe App (Unit 7)

## Project setup

This project is a React app with a lightweight Express API for development.

### Requirements
- Node.js 18+ (LTS recommended)
- npm (or your preferred npm-compatible package manager)

### Install dependencies
```bash
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
