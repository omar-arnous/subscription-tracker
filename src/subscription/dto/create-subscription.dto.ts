import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
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
  @IsOptional()
  status?: Status;

  @IsDateString()
  startDate: Date;
}
