# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

JBIT Email Signature Generator - A React/TypeScript web application that allows users to create professional email signatures compatible with multiple email clients (Outlook Windows/Mac, Apple Mail, Gmail).

## Key Architecture Decisions

### Email Client Compatibility
- **Table-based layouts**: Email clients have limited CSS support, requiring table-based HTML structure
- **Inline styles only**: All styles must be inline; `<style>` tags are stripped by most email clients
- **Base64 images**: Company logos are converted to base64 and embedded directly in the signature HTML to avoid external dependencies
- **No external resources**: Signatures are completely self-contained

### State Management
- Uses React's `useState` for simple state management
- No need for Redux/Context as the app state is straightforward
- Template data is persisted to `localStorage` via utility functions in `src/utils/storage.ts`

### Type Safety
- All type imports must use `import type` syntax due to TypeScript's `verbatimModuleSyntax` setting
- Core types defined in `src/types/index.ts`

## Common Development Commands

### Development
```bash
npm run dev              # Start dev server (http://localhost:5173)
npm run build            # Build for production
npm run preview          # Preview production build
```

### Code Quality
```bash
npm run type-check       # Run TypeScript type checking (doesn't emit files)
npm run lint             # Check for linting errors
npm run lint:fix         # Auto-fix linting errors
npm run format           # Format code with Prettier
npm run format:check     # Check if code is formatted
```

### Testing Build
Always run `npm run build` before committing to ensure the production build works.

## Project Structure

```
src/
├── components/          # React components (each in own folder with index.ts)
│   ├── SignatureForm/      # User input form
│   ├── SignaturePreview/   # Live signature preview
│   ├── ExportOptions/      # Copy buttons for email clients
│   └── TemplateManager/    # Save/load template functionality
├── utils/              # Utility functions
│   ├── signatureGenerator.ts      # Core HTML generation logic
│   ├── emailClientFormatters.ts   # Email client specific configs
│   ├── storage.ts                 # localStorage CRUD operations
│   └── imageUtils.ts              # Image validation & base64 conversion
├── types/
│   └── index.ts        # TypeScript type definitions
└── App.tsx             # Main app component
```

## Critical Implementation Details

### Signature Generation (`src/utils/signatureGenerator.ts`)
- Uses table-based HTML layout for maximum email client compatibility
- All styles are inline CSS
- Social media icons use embedded SVG data URLs
- Conditional rendering: social icons only appear if URLs are provided

### Image Handling
- Max file size: 2MB
- Supported formats: JPEG, PNG, GIF
- Automatically converts to base64 for embedding
- Validation in `src/utils/imageUtils.ts`

### Template Storage
- Uses `crypto.randomUUID()` for unique IDs
- Stored in `localStorage` under key `jbit-signature-templates`
- Each template includes: id, name, data, createdAt timestamp

## CI/CD Pipeline

### GitHub Actions Workflows

**CI Workflow** (`.github/workflows/ci.yml`):
- Runs on: Push and PR to main/develop
- Steps: Type check → Lint → Format check → Build

**Deploy Workflow** (`.github/workflows/deploy.yml`):
- Runs on: Push to main
- Deploys to GitHub Pages
- Sets `NODE_ENV=production` for correct base path in Vite

### Vite Configuration
- Base path is `/jbit-signature-gen/` in production for GitHub Pages
- Uses environment variable to toggle between dev and production paths

## TypeScript Configuration

- Using `verbatimModuleSyntax: true`
- **Important**: Always use `import type` for type-only imports
- Three tsconfig files: `tsconfig.json` (base), `tsconfig.app.json` (app), `tsconfig.node.json` (build tools)

## Styling with Tailwind CSS v4

- Uses `@tailwindcss/postcss` plugin (not the old `tailwindcss` plugin)
- Configuration in `tailwind.config.js`
- PostCSS configured in `postcss.config.js`
- Utility-first approach for component styling

## Common Patterns

### Adding New Component
1. Create folder in `src/components/ComponentName/`
2. Create `ComponentName.tsx` and `index.ts`
3. Use `import type` for all type imports
4. Export from `index.ts` for clean imports

### Adding New Email Client Support
1. Add client config to `EMAIL_CLIENTS` in `src/utils/emailClientFormatters.ts`
2. Include: client ID, label, and installation instructions
3. Test signature HTML in actual email client

### Modifying Signature HTML
- Edit `generateSignatureHTML()` in `src/utils/signatureGenerator.ts`
- Must use table-based layout and inline styles
- Test in multiple email clients (Outlook is most restrictive)

## Debugging Tips

### Build Failures
- Check for type import errors (use `import type`)
- Ensure PostCSS config uses `@tailwindcss/postcss`
- Run `npm run type-check` first to isolate TypeScript errors

### Email Signature Not Displaying Correctly
- Verify all styles are inline (no CSS classes in generated HTML)
- Check that layout uses tables, not divs
- Ensure images are base64 encoded
- Test in actual email client, not just browser

## GitHub Pages Deployment

- Deployed from `dist/` folder
- Base path configured in `vite.config.ts`
- Automatic deployment on push to main via GitHub Actions
- Manual deployment: Build locally and push `dist/` folder

## Important Constraints

- No backend required (fully client-side)
- No authentication (templates stored locally)
- Template data stays in user's browser (localStorage)
- Cannot sync templates across devices/browsers
