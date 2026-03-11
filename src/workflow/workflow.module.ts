import { forwardRef, Module } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { SubscriptionModule } from 'src/subscription/subscription.module';
import { WorkflowConfig } from './workflow.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [forwardRef(() => SubscriptionModule), ConfigModule],
  providers: [WorkflowService, WorkflowConfig],
  exports: [WorkflowService, WorkflowConfig],
})
export class WorkflowModule {}
