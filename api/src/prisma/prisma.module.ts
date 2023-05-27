import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  imports: [ConfigModule],
})
export class PrismaModule {}
