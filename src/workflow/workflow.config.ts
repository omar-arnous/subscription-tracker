import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client as WorkflowClient } from '@upstash/workflow';

@Injectable()
export class WorkflowConfig {
  public readonly client: WorkflowClient;

  constructor(private readonly configService: ConfigService) {
    const baseUrl = this.configService.get<string>('QSTASH_URL');
    const token = this.configService.get<string>('QSTASH_TOKEN');

    this.client = new WorkflowClient({
      baseUrl,
      token,
    });
  }
}
