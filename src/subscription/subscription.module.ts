import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionController } from './subscription.controller';
import { UsersModule } from 'src/users/users.module';
import { SubscriptionService } from './subscription.service';
import { ConfigModule } from '@nestjs/config';
import { WorkflowModule } from 'src/workflow/workflow.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription]),
    UsersModule,
    ConfigModule,
    forwardRef(() => WorkflowModule),
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
