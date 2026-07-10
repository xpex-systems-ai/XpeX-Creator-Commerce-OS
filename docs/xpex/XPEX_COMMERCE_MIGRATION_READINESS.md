# XpeX Commerce migration readiness checklist

This checklist must be completed before applying real database migrations for XpeX Commerce outside a disposable local environment.

## Human approval gate

Production migration is allowed only after explicit human approval, environment confirmation, backup verification, and successful local/test validation. Do not run destructive database commands as part of automated homologation.

## Environment checklist

- [ ] Confirm the target environment name and database host are correct.
- [ ] Confirm `DATABASE_URL` points to the intended non-production database for tests.
- [ ] Confirm secrets are loaded from the approved secret manager or local `.env`, never committed.
- [ ] Confirm no Mercado Livre, Dub, n8n, OpenAI, WhatsApp, or paid ads credentials are needed for this migration.

## Backup and rollback

- [ ] Current database backup completed and restore path tested.
- [ ] Rollback plan documented for schema and application deployment.
- [ ] Maintenance window or test window agreed if the environment is shared.
- [ ] Owner assigned for validation and rollback decision.

## Prisma/schema review

- [ ] XpeXCommerce models reviewed for `organizationId` scoping.
- [ ] Tenant-first indexes reviewed.
- [ ] Relations to `Organization` and `User` reviewed.
- [ ] Enum changes reviewed for compatibility.
- [ ] Generated Prisma client reviewed in local/test before deploy.

## Suggested commands for documentation only

Run these only in the correct environment after human approval:

```bash
pnpm install
pnpm run prisma-generate
pnpm prisma migrate status
pnpm prisma migrate deploy
```

For local disposable validation only, use the project's approved local migration workflow. Do not use reset/drop commands against shared or production databases.

## Success criteria

- Migration status is clean.
- Backend build passes.
- Authenticated diagnostics returns safe status only.
- CRUD smoke tests pass with dummy internal data.
- No secrets or provider tokens are introduced.
