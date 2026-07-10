import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Organization, User } from '@prisma/client';
import { GetOrgFromRequest } from '@gitroom/nestjs-libraries/user/org.from.request';
import { GetUserFromRequest } from '@gitroom/nestjs-libraries/user/user.from.request';
import {
  XpeXCampaignDto,
  XpeXCreativeBriefDto,
  XpeXCreatorDto,
  XpeXLeadDto,
  XpeXLeadStatusDto,
  XpeXLinkPlanDto,
  XpeXProductDto,
  XpeXStatusDto,
} from '@gitroom/nestjs-libraries/dtos/xpex-commerce/xpex-commerce.dto';
import { XpeXCommerceService } from '@gitroom/backend/api/routes/xpex-commerce/xpex-commerce.service';

@ApiTags('XpeX Commerce')
@Controller('/xpex-commerce')
export class XpeXCommerceController {
  constructor(private service: XpeXCommerceService) {}

  @Get('/products') listProducts(@GetOrgFromRequest() org: Organization) { return this.service.listProducts(org.id); }
  @Get('/products/:id') getProduct(@GetOrgFromRequest() org: Organization, @Param('id') id: string) { return this.service.getProduct(org.id, id); }
  @Post('/products') createProduct(@GetOrgFromRequest() org: Organization, @Body() body: XpeXProductDto) { return this.service.createProduct(org.id, body); }
  @Patch('/products/:id/status') updateProductStatus(@GetOrgFromRequest() org: Organization, @Param('id') id: string, @Body() body: XpeXStatusDto) { return this.service.updateProductStatus(org.id, id, body.status); }

  @Get('/campaigns') listCampaigns(@GetOrgFromRequest() org: Organization) { return this.service.listCampaigns(org.id); }
  @Get('/campaigns/:id') getCampaign(@GetOrgFromRequest() org: Organization, @Param('id') id: string) { return this.service.getCampaign(org.id, id); }
  @Post('/campaigns') createCampaign(@GetOrgFromRequest() org: Organization, @GetUserFromRequest() user: User, @Body() body: XpeXCampaignDto) { return this.service.createCampaign(org.id, user.id, body); }
  @Patch('/campaigns/:id/status') updateCampaignStatus(@GetOrgFromRequest() org: Organization, @Param('id') id: string, @Body() body: XpeXStatusDto) { return this.service.updateCampaignStatus(org.id, id, body.status); }

  @Get('/creators') listCreators(@GetOrgFromRequest() org: Organization) { return this.service.listCreators(org.id); }
  @Get('/creators/:id') getCreator(@GetOrgFromRequest() org: Organization, @Param('id') id: string) { return this.service.getCreator(org.id, id); }
  @Post('/creators') createCreator(@GetOrgFromRequest() org: Organization, @Body() body: XpeXCreatorDto) { return this.service.createCreator(org.id, body); }
  @Patch('/creators/:id/status') updateCreatorStatus(@GetOrgFromRequest() org: Organization, @Param('id') id: string, @Body() body: XpeXStatusDto) { return this.service.updateCreatorStatus(org.id, id, body.status); }

  @Get('/leads') listLeads(@GetOrgFromRequest() org: Organization) { return this.service.listLeads(org.id); }
  @Get('/leads/:id') getLead(@GetOrgFromRequest() org: Organization, @Param('id') id: string) { return this.service.getLead(org.id, id); }
  @Post('/leads') createLead(@GetOrgFromRequest() org: Organization, @Body() body: XpeXLeadDto) { return this.service.createLead(org.id, body); }
  @Patch('/leads/:id/status') updateLeadStatus(@GetOrgFromRequest() org: Organization, @Param('id') id: string, @Body() body: XpeXLeadStatusDto) { return this.service.updateLeadStatus(org.id, id, body.status); }

  @Get('/link-plans') listLinkPlans(@GetOrgFromRequest() org: Organization) { return this.service.listLinkPlans(org.id); }
  @Get('/link-plans/:id') getLinkPlan(@GetOrgFromRequest() org: Organization, @Param('id') id: string) { return this.service.getLinkPlan(org.id, id); }
  @Post('/link-plans') createLinkPlan(@GetOrgFromRequest() org: Organization, @Body() body: XpeXLinkPlanDto) { return this.service.createLinkPlan(org.id, body); }
  @Patch('/link-plans/:id/status') updateLinkPlanStatus(@GetOrgFromRequest() org: Organization, @Param('id') id: string, @Body() body: XpeXStatusDto) { return this.service.updateLinkPlanStatus(org.id, id, body.status); }

  @Get('/creative-briefs') listCreativeBriefs(@GetOrgFromRequest() org: Organization) { return this.service.listCreativeBriefs(org.id); }
  @Get('/creative-briefs/:id') getCreativeBrief(@GetOrgFromRequest() org: Organization, @Param('id') id: string) { return this.service.getCreativeBrief(org.id, id); }
  @Post('/creative-briefs') createCreativeBrief(@GetOrgFromRequest() org: Organization, @GetUserFromRequest() user: User, @Body() body: XpeXCreativeBriefDto) { return this.service.createCreativeBrief(org.id, user.id, body); }
  @Patch('/creative-briefs/:id/status') updateCreativeBriefStatus(@GetOrgFromRequest() org: Organization, @Param('id') id: string, @Body() body: XpeXStatusDto) { return this.service.updateCreativeBriefStatus(org.id, id, body.status); }
}
