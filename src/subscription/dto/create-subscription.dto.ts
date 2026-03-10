import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
  MaxDate,
} from 'class-validator';
import {
  Category,
  Currency,
  Frequency,
  Status,
} from '../entities/subscription.entity';

export class CreateSubscriptionDto {
  @IsNumber()
  price: number;

  @IsEnum(Currency)
  currency: Currency;

  @IsEnum(Frequency)
  frequency: Frequency;

  @IsEnum(Category)
  category: Category;

  @IsString()
  paymentMethod: string;

  @IsEnum(Status)
  status: Status;

  @IsDateString()
  @MaxDate(new Date(), {
    message: 'Start date must be in the past',
  })
  startDate: Date;

  @IsDateString()
  renewalDate: Date;
}
