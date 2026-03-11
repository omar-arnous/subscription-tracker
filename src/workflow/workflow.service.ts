import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { SubscriptionService } from '../subscription/subscription.service';
import { Status } from 'src/subscription/entities/subscription.entity';

const REMINDERS = [7, 5, 2, 1];

export type ReminderWorkflowPayload = {
  subscriptionId: number;
};

@Injectable()
export class WorkflowService {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  // Simply an async method, no serve()
  async sendReminders(payload: ReminderWorkflowPayload) {
    const { subscriptionId } = payload;

    const subscription =
      await this.subscriptionService.findById(subscriptionId);

    if (!subscription || subscription.status !== Status.ACTIVE) return;

    const renewalDate = dayjs(subscription.renewalDate);

    if (renewalDate.isBefore(dayjs())) {
      console.log(
        `Renewal date has passed for subscription ${subscriptionId}. Stopping workflow`,
      );
      return;
    }

    for (const daysBefore of REMINDERS) {
      const reminderDate = renewalDate.subtract(daysBefore, 'day');

      if (reminderDate.isAfter(dayjs())) {
        await this.sleepUntilReminder(
          `Reminder ${daysBefore} days before`,
          reminderDate,
        );
      }

      this.triggerReminder(`Reminder ${daysBefore} days before`);
    }
  }

  private async sleepUntilReminder(
    label: string,
    date: dayjs.Dayjs,
  ): Promise<void> {
    console.log(`Sleeping until ${label} reminder at ${date.toISOString()}`);
    // simulate async sleep or queue
    await new Promise((resolve) => setTimeout(resolve, 0));
  }

  private triggerReminder(label: string) {
    console.log(`Triggering ${label} reminder`);
    // send email / notification
  }
}
