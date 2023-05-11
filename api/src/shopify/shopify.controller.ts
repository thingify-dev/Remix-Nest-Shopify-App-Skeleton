import { Controller, Get, Res, Req, Query, Request, Response } from '@nestjs/common';
import { ShopifyService } from './shopify.service';

@Controller('shopify')
export class ShopifyController {
  constructor(private shopifyService: ShopifyService) { }
  @Get('/auth')
  initAuth(@Req() req: Request, @Res() res: Response, @Query() query: any) {
    return this.shopifyService.initAuth(req, res, query)
  }

  @Get('/auth/callback')
  authCallback(@Req() req: Request, @Res() res: Response) {
    return this.shopifyService.authCallback(req, res)
  }
}
