# LocalStorage to backend migration plan

## Goal

Move XpeX Commerce from browser-only localStorage to protected backend persistence without losing demo capability or accidentally sending local demo data to a server.

## Step 1 — Keep localStorage as demo

The current MVP remains the default demo mode. It stores products, campaigns, creators, creative briefs, link plans, and leads only in the user's browser. Exported JSON now carries metadata that helps future import tooling identify source and schema version.

## Step 2 — Create protected backend read/write

A later phase should add auth-protected NestJS controllers, DTOs, services, repositories, and Prisma models. Every endpoint must derive `organizationId` and `userId` from authenticated request context.

## Step 3 — Manual local-to-backend sync

Add an explicit import screen or admin action that lets a user review local JSON before upload. The backend should dry-run validation first, then show counts for creates, updates, duplicates, and rejected records.

## Step 4 — Disable localStorage as primary source

After backend persistence is stable, the frontend should read from the API by default. localStorage can remain only for demo mode, offline drafts, or backup staging with a clear visual label.

## Step 5 — Export/import JSON backup

Keep export/import JSON as a backup and recovery workflow. Exports should include `schemaVersion`, `exportedAt`, `source`, and the actual local state under a stable `data` key.

## Data-loss prevention

- Never auto-upload localStorage without user confirmation.
- Preserve local exports before destructive sync.
- Use idempotent import keys based on record IDs and organization scope.
- Report rejected records with safe messages that do not expose secrets.
- Keep demo seed data distinguishable from user-created records.

## Demo mode preservation

Demo mode should remain available for sales, onboarding, and restricted environments. It must be visually marked as local/demo and must not call backend persistence unless the user explicitly switches to authenticated backend mode.
