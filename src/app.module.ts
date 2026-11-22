import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { StudentsModule } from './students/students.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [StudentsModule, PrismaModule, AuthModule, ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 2,
      },
    ]),],
  controllers: [AppController],
  providers: [AppService,  {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },],
})
export class AppModule {}
