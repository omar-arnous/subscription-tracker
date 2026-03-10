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
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('subscription')
export class SubscriptionController {
  @Version('1')
  @Get('/')
  getAllSubscriptions() {
    return 'GET/ all Subscriptions';
  }

  @Version('1')
  @Get('/:id')
  getSubscriptionDetails(@Param() id) {
    return `GET/ Subscription ${id} Details`;
  }

  @Version('1')
  @Get('/user/:id')
  getUserSubscriptions(@Param() id) {
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
  createSubscription() {
    return 'POST/ create subsctiption';
  }

  @Version('1')
  @UseGuards(AuthGuard)
  @Put('/:id')
  updateSubscription() {
    return 'PUT/ update subsctiption';
  }

  @Version('1')
  @UseGuards(AuthGuard)
  @Put('/:id/cancel')
  cancelSubscription() {
    return 'PUT/ cancel subsctiption';
  }

  @Version('1')
  @UseGuards(AuthGuard)
  @Delete('/')
  deleteSubscription() {
    return 'DELETE/ delete subsctiption';
  }
}
