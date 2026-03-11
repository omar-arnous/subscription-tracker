import { Body, Controller, Post, Version } from '@nestjs/common';
import { WorkflowService } from './workflow.service';

@Controller('workflows')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Version('1')
  @Post('/subscription/reminder')
  createWorkflow(@Body() subscriptionId: number) {
    return this.workflowService.sendReminders({ subscriptionId });
  }
}
