import { UsersService } from './../users/users.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Frequency, Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { User } from 'src/users/entities/user.entity';
import { WorkflowConfig } from 'src/workflow/workflow.config';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionService: Repository<Subscription>,
    private readonly usersService: UsersService,
    private readonly workflowConfig: WorkflowConfig,
    private readonly configService: ConfigService,
  ) {}

  calculateRenewalDate = (startDate: Date, frequency: Frequency): Date => {
    const date = new Date(startDate);

    switch (frequency) {
      case Frequency.MONTHLY:
        date.setMonth(date.getMonth() + 1);
        break;

      case Frequency.YEARLY:
        date.setFullYear(date.getFullYear() + 1);
        break;

      case Frequency.WEEKLY:
        date.setDate(date.getDate() + 7);
        break;
    }

    return date;
  };

  async findById(subscriptionId: number) {
    const subscription = await this.subscriptionService.findOne({
      where: { id: subscriptionId },
    });

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    return subscription;
  }

  async creatre(createSubscription: CreateSubscriptionDto, user: User) {
    const { startDate, frequency } = createSubscription;
    const renewal = this.calculateRenewalDate(startDate, frequency);

    const subscription = this.subscriptionService.create({
      ...createSubscription,
      renewalDate: renewal,
      user: user,
    });
    await this.subscriptionService.save(subscription);

    const url = this.configService.get<string>('SERVER_URL');

    const { workflowRunId } = await this.workflowConfig.client.trigger({
      url: `${url}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: { 'content-type': 'application/json' },
      retries: 0,
    });

    return { subscription, workflowRunId };
  }

  async findByUserId(userId: number) {
    const subscriptions = await this.subscriptionService.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!subscriptions) {
      throw new NotFoundException('Subscription not found');
    }

    return subscriptions;
  }
}
