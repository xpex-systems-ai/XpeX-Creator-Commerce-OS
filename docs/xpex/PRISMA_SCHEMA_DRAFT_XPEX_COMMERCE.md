# Prisma schema draft — XpeX Commerce

This is documentation only. Do not paste into `schema.prisma` or apply migrations until a later human-reviewed phase.

## Draft enums

```prisma
enum XpeXCommerceStatus {
  DRAFT
  PLANNED
  IN_REVIEW
  APPROVED
  ACTIVE
  WINNER
  PAUSED
  DISCARDED
  NEW
  LINK_SENT
  INTERESTED
  PURCHASED
  FOLLOW_UP
  NO_RESPONSE
}

enum XpeXCommerceChannel {
  INSTAGRAM
  TIKTOK
  WHATSAPP
  MANUAL
  OTHER
}

enum XpeXComplianceResult {
  PENDING
  PASSED
  WARNING
  BLOCKED
}
```

## Draft models

```prisma
model XpeXCommerceProduct {
  id              String   @id @default(uuid())
  organizationId  String
  createdByUserId String
  updatedByUserId String?
  name            String
  category        String
  mercadoLivreUrl String?
  audienceFit     String
  creatorFit      String
  campaignAngle   String
  ctaKeyword      String
  score           Float?
  status          XpeXCommerceStatus @default(DRAFT)
  notes           String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  createdBy    User         @relation("XpeXProductCreatedBy", fields: [createdByUserId], references: [id])

  @@index([organizationId, status])
  @@index([organizationId, createdAt])
}

model XpeXCommerceCreator {
  id              String   @id @default(uuid())
  organizationId  String
  createdByUserId String
  name            String
  niche           String
  audience        String
  channels        XpeXCommerceChannel[]
  status          XpeXCommerceStatus @default(DRAFT)
  notes           String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  createdBy    User         @relation("XpeXCreatorCreatedBy", fields: [createdByUserId], references: [id])

  @@index([organizationId, status])
}

model XpeXCommerceCampaign {
  id              String   @id @default(uuid())
  organizationId  String
  productId       String
  creatorId       String
  createdByUserId String
  name            String
  slogan          String?
  cta             String
  channels        XpeXCommerceChannel[]
  status          XpeXCommerceStatus @default(PLANNED)
  expectedMetric  String?
  score           Float?
  briefing        String
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  product      XpeXCommerceProduct @relation(fields: [productId], references: [id])
  creator      XpeXCommerceCreator @relation(fields: [creatorId], references: [id])
  createdBy    User @relation("XpeXCampaignCreatedBy", fields: [createdByUserId], references: [id])

  @@index([organizationId, status])
  @@index([organizationId, productId])
  @@index([organizationId, creatorId])
}

model XpeXCommerceLead {
  id                  String   @id @default(uuid())
  organizationId      String
  campaignId          String?
  interestedProductId String?
  creatorId           String?
  createdByUserId     String
  name                String
  channel             XpeXCommerceChannel
  status              XpeXCommerceStatus @default(NEW)
  observation          String?
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  createdBy    User @relation("XpeXLeadCreatedBy", fields: [createdByUserId], references: [id])

  @@index([organizationId, status])
  @@index([organizationId, channel])
}

model XpeXCommerceLinkPlan {
  id              String   @id @default(uuid())
  organizationId  String
  campaignId      String
  productId       String
  creatorId       String
  createdByUserId String
  channel         XpeXCommerceChannel
  slug            String
  destinationUrl  String?
  status          XpeXCommerceStatus @default(PLANNED)
  notes           String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  campaign     XpeXCommerceCampaign @relation(fields: [campaignId], references: [id])
  product      XpeXCommerceProduct @relation(fields: [productId], references: [id])
  creator      XpeXCommerceCreator @relation(fields: [creatorId], references: [id])
  createdBy    User @relation("XpeXLinkPlanCreatedBy", fields: [createdByUserId], references: [id])

  @@unique([organizationId, slug])
  @@index([organizationId, campaignId])
}

model XpeXCommerceCreativeBrief {
  id              String   @id @default(uuid())
  organizationId  String
  campaignId      String
  productId       String
  creatorId       String
  createdByUserId String
  hook            String
  slogan          String?
  caption         String?
  shortScript     String?
  whatsappText    String?
  status          XpeXCommerceStatus @default(PLANNED)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  campaign     XpeXCommerceCampaign @relation(fields: [campaignId], references: [id])
  product      XpeXCommerceProduct @relation(fields: [productId], references: [id])
  creator      XpeXCommerceCreator @relation(fields: [creatorId], references: [id])
  createdBy    User @relation("XpeXBriefCreatedBy", fields: [createdByUserId], references: [id])

  @@index([organizationId, campaignId])
  @@index([organizationId, status])
}

model XpeXCommercePerformanceReport {
  id              String   @id @default(uuid())
  organizationId  String
  campaignId      String
  createdByUserId String
  periodStart     DateTime
  periodEnd       DateTime
  metrics         Json
  notes           String?
  createdAt       DateTime @default(now())

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  campaign     XpeXCommerceCampaign @relation(fields: [campaignId], references: [id])
  createdBy    User @relation("XpeXReportCreatedBy", fields: [createdByUserId], references: [id])

  @@index([organizationId, campaignId])
  @@index([organizationId, periodStart, periodEnd])
}

model XpeXCommerceComplianceCheck {
  id              String   @id @default(uuid())
  organizationId  String
  checkedByUserId String
  entityType      String
  entityId        String
  result          XpeXComplianceResult @default(PENDING)
  findings        Json?
  createdAt       DateTime @default(now())

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  checkedBy    User @relation("XpeXComplianceCheckedBy", fields: [checkedByUserId], references: [id])

  @@index([organizationId, entityType, entityId])
  @@index([organizationId, result])
}
```

## Review notes

The real schema will need relation fields added to existing `Organization` and `User` models. Those reverse relations are intentionally omitted from the live schema in Phase 05. Migrations must be generated and applied only in a later phase after human review, DTO validation, permission mapping, and tenant-isolation tests.
