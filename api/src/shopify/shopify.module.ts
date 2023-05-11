import { ShopifyService } from './shopify.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShopifyController } from './shopify.controller'



@Module({
  imports: [ConfigModule],
  providers: [ShopifyService],
  controllers: [ShopifyController]
})
export class ShopifyModule {
}
