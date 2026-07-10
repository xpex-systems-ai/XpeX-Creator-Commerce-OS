# XpeX Commerce backend route placeholder

Phase 05 intentionally does not register active XpeX Commerce API routes.

Future implementation should add authenticated, organization-scoped NestJS controllers only after the API contract, Prisma schema draft, and permissions plan in `docs/xpex` are reviewed. Any temporary controller must return `501 Not Implemented` and must not be added to `ApiModule` until auth, DTO validation, and permission policies are complete.
