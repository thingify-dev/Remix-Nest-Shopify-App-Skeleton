import { ShopifyService } from './shopify.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShopifyApiController } from './shopify.controller';

@Module({
  imports: [ConfigModule],
  providers: [ShopifyService],
  controllers: [ShopifyApiController],
})
export class ShopifyModule {}
