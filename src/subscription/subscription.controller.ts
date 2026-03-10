import {
  dy,
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

@Controller('subscriptions')
export class SubscriptionController {
  @Version('1')
  @Get('/')
  getAllSubscriptions() {
    return 'GET/ all Subscriptions';
  }

  @Version('1')
  @Get('/:id')
  getSubscriptionDetails(@Param('id') id: string) {
    return `GET/ Subscription ${id} Details`;
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
  createSubscription(@Body() createSubscription: CreateSubscriptionDto) {
    return 'POST/ create subsctiption';
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
