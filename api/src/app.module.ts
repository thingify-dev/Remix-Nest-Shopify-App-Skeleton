import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { ShopifyModule } from './shopify/shopify.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({ cache: true }),
    DbModule,
    ShopifyModule,
    PrismaModule,
  ],
})
export class AppModule {}
