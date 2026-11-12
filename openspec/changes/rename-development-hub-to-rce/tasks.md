## 1. Update application branding

- [x] 1.1 Replace “Development Hub” platform branding in page metadata, navigation, page copy, and footer with “Development Centre of Excellence”; use “RDCE” only where a compact name is appropriate, and verify the updated labels in the affected components.

## 2. Update project documentation

- [x] 2.1 Update relevant project documentation that presents “Development Hub” as the current product name, while preserving historical or generic uses; verify remaining matches with a case-insensitive repository search and review each in context.

## 3. Validate the rename

- [ ] 3.1 Verify the application metadata and visible branding use the canonical name consistently, and run `cd apps/web && pnpm typecheck` to confirm the changes introduce no type errors.
- [x] 3.2 Review the final diff to confirm routes, schemas, technical identifiers, and unrelated local changes remain untouched.
