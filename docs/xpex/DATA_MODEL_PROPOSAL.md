# XpeX Data Model Proposal

This document proposes future Prisma models for XpeX Creator Commerce OS. It is intentionally not a migration. Schema changes should wait until Phase 02 after build validation and human approval.

## Proposed models

### CommerceProduct
Represents a manually entered or later API-synced commerce product. Relates to `Organization` and optionally `Integration` for future Mercado Livre API ownership. Recommended fields: organizationId, integrationId, externalSource, externalId, title, url, imageUrl, priceSnapshot, currency, status, metadata, createdAt, updatedAt.

### CommerceCreator
Represents creators such as Anderso. Relates to `Organization`, optionally `User`, and future campaigns. Recommended fields: organizationId, userId, displayName, handle, channels, audienceNotes, styleGuide, status, createdAt, updatedAt.

### CommerceCampaign
Represents campaign briefs and execution status. Relates to `Organization`, `CommerceProduct`, `CommerceCreator`, `User`, `Post`, and assets. Recommended fields: organizationId, productId, creatorId, ownerUserId, name, slogan, cta, status, startsAt, endsAt, createdAt, updatedAt.

### CommerceCreativeAsset
Represents copy, scripts, prompts, thumbnails, or generated assets. Relates to `Organization`, `CommerceCampaign`, `Media`, and optionally `User`. Recommended fields: organizationId, campaignId, mediaId, type, title, body, prompt, status, createdByUserId, createdAt, updatedAt.

### CommerceShortLink
Represents tracked destination links. Relates to `Organization`, `CommerceCampaign`, `CommerceProduct`, `CommerceCreator`, `Post`, and future Dub integration. Recommended fields: organizationId, campaignId, productId, creatorId, postId, provider, providerLinkId, shortUrl, destinationUrl, source, status, createdAt, updatedAt.

### CommerceClickEvent
Represents click telemetry. Relates to `Organization`, `CommerceShortLink`, `CommerceCampaign`, and optionally `CommerceLead`. Recommended fields: organizationId, shortLinkId, campaignId, source, referrer, userAgentHash, ipHash, clickedAt, metadata.

### CommerceLead
Represents captured interest from comments, forms, or tracked flows. Relates to `Organization`, `CommerceCampaign`, `CommerceCreator`, `CommerceProduct`, and optionally `User`. Recommended fields: organizationId, campaignId, creatorId, productId, source, externalProfileUrl, name, contact, status, consentSnapshot, createdAt, updatedAt.

### CommercePerformanceReport
Represents generated reports. Relates to `Organization`, `CommerceCampaign`, `CommerceProduct`, and `CommerceCreator`. Recommended fields: organizationId, campaignId, productId, creatorId, periodStart, periodEnd, metricsJson, insightsJson, createdAt.

### CommerceComplianceCheck
Represents automated and human compliance decisions. Relates to `Organization`, `CommerceCampaign`, `CommerceCreativeAsset`, `Post`, and `User`. Recommended fields: organizationId, campaignId, creativeAssetId, postId, reviewerUserId, status, riskLevel, findingsJson, approvedAt, createdAt.

## Relationships with existing schema

- `Organization` remains the tenant boundary for all commerce models.
- `User` remains the owner/reviewer/operator identity.
- `Media` stores uploaded or generated assets referenced by creative assets.
- `Post` remains the scheduling/publishing unit from Postiz and can be associated with campaigns and links.
- `Integration` can later represent Mercado Livre, Dub, analytics, or other provider credentials without adding secrets to commerce tables.

## Recommended indexes

Use tenant-first indexes for all commerce models. Recommended index dimensions include `organizationId`, `creatorId`, `campaignId`, `productId`, `status`, `createdAt`, and `source`. Event tables should include time-series friendly indexes such as `(organizationId, clickedAt)` and `(shortLinkId, clickedAt)`.

## Migration policy

Do not apply these models in Phase 01. Prisma migrations should only enter Phase 02 after the current build is validated, data ownership is approved, and a human reviews naming, retention, privacy, and provider integration requirements.
