import { Injectable } from '@nestjs/common';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionService: Repository<Subscription>,
  ) {}

  async subscribe() {}
}
