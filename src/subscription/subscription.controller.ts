import type { Request } from 'express';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  Version,
  Body,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionService } from './subscription.service';
import { GetUser } from 'src/get-user/get-user.decorator';
import { User } from 'src/users/entities/user.entity';

export type JwtPayload = {
  id: number;
  email: string;
};

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Version('1')
  @Get('/')
  getAllSubscriptions() {
    return 'GET/ all Subscriptions';
  }

  @Version('1')
  @Get('/:id')
  getSubscriptionDetails(@Param('id') id: string) {
    return this.subscriptionService.findById(+id);
  }

  @Version('1')
  @Get('/user/:id')
  getUserSubscriptions(@Param('id') id: string) {
    return `GET/ user ${id} Subscriptions`;
  }

  @Version('1')
  @Get('/upcoming-renewals')
  getUpcomingRenewal() {
    return `GET/ upcoming renewals subscription`;
  }

  @Version('1')
  @UseGuards(AuthGuard)
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  createSubscription(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
    // @Req() req: Request,
    @GetUser() user: User,
  ) {
    // const user = req['user'];

    return this.subscriptionService.creatre(createSubscriptionDto, user);
  }

  @Version('1')
  @UseGuards(AuthGuard)
  @Put('/:id')
  updateSubscription(@Param('id') id: string) {
    return `PUT/ update ${id} subsctiption`;
  }

  @Version('1')
  @UseGuards(AuthGuard)
  @Put('/:id/cancel')
  cancelSubscription(@Param('id') id: string) {
    return `PUT/ cancel ${id} subsctiption`;
  }

  @Version('1')
  @UseGuards(AuthGuard)
  @Delete('/:id')
  deleteSubscription(@Param('id') id: string) {
    return `DELETE/ delete ${id} subsctiption`;
  }
}
