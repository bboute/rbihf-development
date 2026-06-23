# Agent Development Guide

## Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build all packages
- `pnpm lint` - Run ESLint across workspace
- `pnpm format` - Format code with Prettier
- `cd apps/web && pnpm typecheck` - Type check Next.js app
- `cd apps/web && pnpm lint:fix` - Fix linting issues

## Design System

- **Style Guide**: See [styleguide.md](./styleguide.md) for comprehensive design guidelines
- **Target Audience**: Primarily coaches (60%) and parents (35%) seeking player development pathways
- **Colors**: Primary (#00576B), Secondary (#E65C6B), Background (#F5F2EB)
- **Typography**: Geist font family with responsive scaling
- **Components**: Follow educational component patterns in style guide
- **Brand Voice**: Community-focused, approachable, supportive, educational

## Code Style

- **Imports**: Use workspace aliases (`@workspace/ui/*`, `@/*` for app paths)
- **Components**: Use Radix UI primitives with class-variance-authority for variants
- **Types**: Strict TypeScript with noUncheckedIndexedAccess enabled
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Error Handling**: Use proper TypeScript types, avoid any
- **Formatting**: Prettier with ESLint integration, no semicolons
- **Styling**: Follow Tailwind utility classes as defined in style guide

## Project Structure

- **Monorepo**: Turbo + pnpm workspace with apps/ and packages/
- **Apps**: `apps/web/` - Next.js application
- **Packages**: `packages/ui/` - Reusable UI components, `packages/eslint-config/`, `packages/typescript-config/`
- **Component Pattern**: Use Radix UI primitives with class-variance-authority for styling variants
- **Utils**: Shared utilities in `packages/ui/src/lib/utils.ts` (cn function for clsx + tailwind-merge)

## Testing

Currently no test framework configured. Add testing setup as needed.
