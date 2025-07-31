# Agent Development Guide

## Commands
- `pnpm dev` - Start development server
- `pnpm build` - Build all packages  
- `pnpm lint` - Run ESLint across workspace
- `pnpm format` - Format code with Prettier
- `cd apps/web && pnpm typecheck` - Type check Next.js app
- `cd apps/web && pnpm lint:fix` - Fix linting issues

## Code Style
- **Imports**: Use workspace aliases (`@workspace/ui/*`, `@/*` for app paths)
- **Components**: Use Radix UI primitives with class-variance-authority for variants
- **Types**: Strict TypeScript with noUncheckedIndexedAccess enabled
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Error Handling**: Use proper TypeScript types, avoid any
- **Formatting**: Prettier with ESLint integration, no semicolons

## Project Structure
- **Monorepo**: Turbo + pnpm workspace with apps/ and packages/
- **Apps**: `apps/web/` - Next.js application
- **Packages**: `packages/ui/` - Reusable UI components, `packages/eslint-config/`, `packages/typescript-config/`
- **Component Pattern**: Use Radix UI primitives with class-variance-authority for styling variants
- **Utils**: Shared utilities in `packages/ui/src/lib/utils.ts` (cn function for clsx + tailwind-merge)

## Testing
Currently no test framework configured. Add testing setup as needed.
