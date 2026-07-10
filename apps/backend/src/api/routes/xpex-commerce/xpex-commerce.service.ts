import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@gitroom/nestjs-libraries/database/prisma/prisma.service';
import {
  rejectUnsafePayload,
  sanitizeExternalUrl,
  XpeXCampaignDto,
  XpeXCreativeBriefDto,
  XpeXCreatorDto,
  XpeXLeadDto,
  XpeXLinkPlanDto,
  XpeXProductDto,
} from '@gitroom/nestjs-libraries/dtos/xpex-commerce/xpex-commerce.dto';

@Injectable()
export class XpeXCommerceService {
  constructor(private prisma: PrismaService) {}

  private async requireOwned(model: 'xpeXCommerceProduct' | 'xpeXCommerceCreator' | 'xpeXCommerceCampaign', orgId: string, id?: string) {
    if (!id) return;
    const record = await (this.prisma[model] as any).findFirst({ where: { id, organizationId: orgId }, select: { id: true } });
    if (!record) throw new BadRequestException('Referenced XpeX Commerce record is not in this organization');
  }

  listProducts(orgId: string) { return this.prisma.xpeXCommerceProduct.findMany({ where: { organizationId: orgId }, orderBy: { createdAt: 'desc' } }); }
  async getProduct(orgId: string, id: string) { const item = await this.prisma.xpeXCommerceProduct.findFirst({ where: { id, organizationId: orgId } }); if (!item) throw new NotFoundException(); return item; }
  createProduct(orgId: string, body: XpeXProductDto) { rejectUnsafePayload(body as any); return this.prisma.xpeXCommerceProduct.create({ data: { organizationId: orgId, title: body.title, sourceUrl: sanitizeExternalUrl(body.sourceUrl), imageUrl: sanitizeExternalUrl(body.imageUrl), currency: body.currency || 'BRL', score: body.score || 0, notes: body.notes } }); }
  updateProductStatus(orgId: string, id: string, status: string) { return this.prisma.xpeXCommerceProduct.update({ where: { id, organizationId: orgId }, data: { status: status as any } }); }

  listCreators(orgId: string) { return this.prisma.xpeXCommerceCreator.findMany({ where: { organizationId: orgId }, orderBy: { createdAt: 'desc' } }); }
  async getCreator(orgId: string, id: string) { const item = await this.prisma.xpeXCommerceCreator.findFirst({ where: { id, organizationId: orgId } }); if (!item) throw new NotFoundException(); return item; }
  createCreator(orgId: string, body: XpeXCreatorDto) { rejectUnsafePayload(body as any); return this.prisma.xpeXCommerceCreator.create({ data: { organizationId: orgId, ...body, score: body.score || 0 } }); }
  updateCreatorStatus(orgId: string, id: string, status: string) { return this.prisma.xpeXCommerceCreator.update({ where: { id, organizationId: orgId }, data: { status: status as any } }); }

  listCampaigns(orgId: string) { return this.prisma.xpeXCommerceCampaign.findMany({ where: { organizationId: orgId }, orderBy: { createdAt: 'desc' } }); }
  async getCampaign(orgId: string, id: string) { const item = await this.prisma.xpeXCommerceCampaign.findFirst({ where: { id, organizationId: orgId } }); if (!item) throw new NotFoundException(); return item; }
  async createCampaign(orgId: string, userId: string, body: XpeXCampaignDto) { rejectUnsafePayload(body as any); await this.requireOwned('xpeXCommerceProduct', orgId, body.productId); await this.requireOwned('xpeXCommerceCreator', orgId, body.creatorId); return this.prisma.xpeXCommerceCampaign.create({ data: { organizationId: orgId, ownerUserId: userId, ...body, score: body.score || 0 } }); }
  updateCampaignStatus(orgId: string, id: string, status: string) { return this.prisma.xpeXCommerceCampaign.update({ where: { id, organizationId: orgId }, data: { status: status as any } }); }

  listLeads(orgId: string) { return this.prisma.xpeXCommerceLead.findMany({ where: { organizationId: orgId }, orderBy: { createdAt: 'desc' } }); }
  async getLead(orgId: string, id: string) { const item = await this.prisma.xpeXCommerceLead.findFirst({ where: { id, organizationId: orgId } }); if (!item) throw new NotFoundException(); return item; }
  async createLead(orgId: string, body: XpeXLeadDto) { rejectUnsafePayload(body as any); await this.requireOwned('xpeXCommerceCampaign', orgId, body.campaignId); await this.requireOwned('xpeXCommerceProduct', orgId, body.productId); await this.requireOwned('xpeXCommerceCreator', orgId, body.creatorId); return this.prisma.xpeXCommerceLead.create({ data: { organizationId: orgId, ...body, externalProfileUrl: sanitizeExternalUrl(body.externalProfileUrl), score: body.score || 0 } }); }
  updateLeadStatus(orgId: string, id: string, status: string) { return this.prisma.xpeXCommerceLead.update({ where: { id, organizationId: orgId }, data: { status: status as any } }); }

  listLinkPlans(orgId: string) { return this.prisma.xpeXCommerceLinkPlan.findMany({ where: { organizationId: orgId }, orderBy: { createdAt: 'desc' } }); }
  async getLinkPlan(orgId: string, id: string) { const item = await this.prisma.xpeXCommerceLinkPlan.findFirst({ where: { id, organizationId: orgId } }); if (!item) throw new NotFoundException(); return item; }
  async createLinkPlan(orgId: string, body: XpeXLinkPlanDto) { rejectUnsafePayload(body as any); await this.requireOwned('xpeXCommerceCampaign', orgId, body.campaignId); await this.requireOwned('xpeXCommerceProduct', orgId, body.productId); await this.requireOwned('xpeXCommerceCreator', orgId, body.creatorId); return this.prisma.xpeXCommerceLinkPlan.create({ data: { organizationId: orgId, ...body, destinationUrl: sanitizeExternalUrl(body.destinationUrl) || '' } }); }
  updateLinkPlanStatus(orgId: string, id: string, status: string) { return this.prisma.xpeXCommerceLinkPlan.update({ where: { id, organizationId: orgId }, data: { status: status as any } }); }

  listCreativeBriefs(orgId: string) { return this.prisma.xpeXCommerceCreativeBrief.findMany({ where: { organizationId: orgId }, orderBy: { createdAt: 'desc' } }); }
  async getCreativeBrief(orgId: string, id: string) { const item = await this.prisma.xpeXCommerceCreativeBrief.findFirst({ where: { id, organizationId: orgId } }); if (!item) throw new NotFoundException(); return item; }
  async createCreativeBrief(orgId: string, userId: string, body: XpeXCreativeBriefDto) { rejectUnsafePayload(body as any); await this.requireOwned('xpeXCommerceCampaign', orgId, body.campaignId); return this.prisma.xpeXCommerceCreativeBrief.create({ data: { organizationId: orgId, createdByUserId: userId, ...body } }); }
  updateCreativeBriefStatus(orgId: string, id: string, status: string) { return this.prisma.xpeXCommerceCreativeBrief.update({ where: { id, organizationId: orgId }, data: { status: status as any } }); }
}
