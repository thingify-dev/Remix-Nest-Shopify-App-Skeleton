import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { DbModule } from './db/db.module';
import { ShopifyModule } from './shopify/shopify.module';

@Module({
  controllers: [],
  providers: [],
  imports: [ConfigModule.forRoot({ cache: true }), DbModule, ShopifyModule]
})
export class AppModule { }
