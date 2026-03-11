import { Injectable } from '@nestjs/common';
import { Frequency, Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionService: Repository<Subscription>,
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

  subscribe(createSubscription: CreateSubscriptionDto, user: User) {
    const { startDate, frequency } = createSubscription;
    const renewal = this.calculateRenewalDate(startDate, frequency);

    const subscription = this.subscriptionService.create({
      ...createSubscription,
      renewalDate: renewal,
      user: user,
    });

    return { subscription };
  }
}
