import { BadRequestException } from '@nestjs/common';
import { IsIn, IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

export const XPEX_RECORD_STATUSES = ['DRAFT', 'ACTIVE', 'PAUSED', 'ARCHIVED'] as const;
export const XPEX_LEAD_STATUSES = ['NEW', 'QUALIFIED', 'CONTACTED', 'CONVERTED', 'ARCHIVED'] as const;
const BLOCKED_KEYS = /token|secret|api[_-]?key|password|credential/i;

export function rejectUnsafePayload(payload: Record<string, unknown>) {
  for (const key of Object.keys(payload || {})) {
    if (BLOCKED_KEYS.test(key)) {
      throw new BadRequestException(`Field ${key} is not accepted by XpeX Commerce`);
    }
  }
}

export function sanitizeExternalUrl(value?: string) {
  if (!value) return undefined;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new BadRequestException('Invalid external URL');
  }
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new BadRequestException('Only http and https URLs are allowed');
  }
  return url.toString();
}

export class XpeXStatusDto {
  @IsIn(XPEX_RECORD_STATUSES)
  status!: string;
}

export class XpeXLeadStatusDto {
  @IsIn(XPEX_LEAD_STATUSES)
  status!: string;
}

export class XpeXProductDto {
  @IsString() @MaxLength(180) title!: string;
  @IsOptional() @IsString() @MaxLength(2048) sourceUrl?: string;
  @IsOptional() @IsString() @MaxLength(2048) imageUrl?: string;
  @IsOptional() @IsString() @MaxLength(3) currency?: string;
  @IsOptional() @IsInt() @Min(0) @Max(10) score?: number;
  @IsOptional() @IsString() @MaxLength(2000) notes?: string;
}

export class XpeXCreatorDto {
  @IsString() @MaxLength(120) displayName!: string;
  @IsOptional() @IsString() @MaxLength(120) handle?: string;
  @IsOptional() @IsString() @MaxLength(1000) channels?: string;
  @IsOptional() @IsString() @MaxLength(2000) audienceNotes?: string;
  @IsOptional() @IsString() @MaxLength(4000) styleGuide?: string;
  @IsOptional() @IsInt() @Min(0) @Max(10) score?: number;
}

export class XpeXCampaignDto {
  @IsString() @MaxLength(160) name!: string;
  @IsOptional() @IsString() productId?: string;
  @IsOptional() @IsString() creatorId?: string;
  @IsOptional() @IsString() @MaxLength(240) slogan?: string;
  @IsOptional() @IsString() @MaxLength(240) cta?: string;
  @IsOptional() @IsString() @MaxLength(1000) channels?: string;
  @IsOptional() @IsInt() @Min(0) @Max(10) score?: number;
}

export class XpeXLeadDto {
  @IsOptional() @IsString() campaignId?: string;
  @IsOptional() @IsString() creatorId?: string;
  @IsOptional() @IsString() productId?: string;
  @IsOptional() @IsString() @MaxLength(120) source?: string;
  @IsOptional() @IsString() @MaxLength(2048) externalProfileUrl?: string;
  @IsOptional() @IsString() @MaxLength(120) name?: string;
  @IsOptional() @IsString() @MaxLength(180) contact?: string;
  @IsOptional() @IsString() @MaxLength(2000) notes?: string;
  @IsOptional() @IsInt() @Min(0) @Max(10) score?: number;
}

export class XpeXLinkPlanDto {
  @IsOptional() @IsString() campaignId?: string;
  @IsOptional() @IsString() productId?: string;
  @IsOptional() @IsString() creatorId?: string;
  @IsString() @MaxLength(120) plannedSlug!: string;
  @IsString() @MaxLength(2048) destinationUrl!: string;
  @IsOptional() @IsString() @MaxLength(120) source?: string;
  @IsOptional() @IsString() @MaxLength(2000) notes?: string;
}

export class XpeXCreativeBriefDto {
  @IsOptional() @IsString() campaignId?: string;
  @IsString() @MaxLength(120) type!: string;
  @IsString() @MaxLength(180) title!: string;
  @IsString() @MaxLength(6000) body!: string;
  @IsOptional() @IsString() @MaxLength(4000) prompt?: string;
}
