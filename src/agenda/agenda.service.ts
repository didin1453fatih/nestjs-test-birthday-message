import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as Agenda from 'agenda';

import * as moment from 'moment-timezone';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Types } from 'mongoose';

@Injectable()
export class AgendaService implements OnModuleInit {
    private readonly agenda: Agenda.Agenda;
    private readonly logger = new Logger(AgendaService.name);

    constructor() {
        this.agenda = new Agenda.Agenda({
            db: { address: process.env.MONGO_URI!, collection: 'agendaJobs' }
        });
    }

    async onModuleInit() {
        this.agenda.define('birthday-job', async (job: Agenda.Job) => {
            const userData = job.attrs.data.user as UserDocument;
            
            // Send happy birthday message
            const msg = `Happy Birthday, ${userData.name}!`;
            this.logger.log(`Sending to ${userData.email}: ${msg}`);

            this.scheduleBirthdayJob(userData)
        });

        await this.agenda.start();
        this.logger.log('Agenda started and ready to process jobs');
    }

    async scheduleBirthdayJob(user: UserDocument): Promise<void> {
        this.logger.log(`User birthday ${user.birthday}`)
        const nextBirthday = this.calculateNextBirthDay(user.birthday, user.timezone)
        this.logger.log(`Scheduling birthday job for ${user.email} at ${nextBirthday}`);
        await this.agenda.schedule(nextBirthday, 'birthday-job', {
            user: user,
            createdAt: new Date()
        });
    }

    calculateNextBirthDay(birthday: Date, timezone: string) {
        const today = moment.tz(timezone);
        const birthMonth = moment(birthday).format('MM');
        const birthDay = moment(birthday).format('DD');

        // Handle leap year birthday
        let birthMonthDay = `${birthMonth}-${birthDay}`;
        let targetYear = today.year();

        // Check if it's Feb 29 and not a leap year
        if (birthMonth === '02' && birthDay === '29' && !moment([targetYear]).isLeapYear()) {
            // For non-leap years, use March 1 instead
            birthMonthDay = '03-01';
        }

        let nextBirthday = moment.tz(`${targetYear}-${birthMonthDay} 09:00`, 'YYYY-MM-DD HH:mm', timezone);

        if (nextBirthday.isBefore(today)) {
            targetYear += 1;

            // Check again for leap year in next year
            if (birthMonth === '02' && birthDay === '29' && !moment([targetYear]).isLeapYear()) {
                birthMonthDay = '03-01';
            }

            nextBirthday = moment.tz(`${targetYear}-${birthMonthDay} 09:00`, 'YYYY-MM-DD HH:mm', timezone);
        }

        return nextBirthday.toDate();
    }

    async rescheduleBirthdayJob(user: UserDocument): Promise<void> {
        await this.cancelBirthdayJob(user._id);
        return this.scheduleBirthdayJob(user);
    }

    async cancelBirthdayJob(userId: Types.ObjectId): Promise<number | undefined> {
        const numRemoved = await this.agenda.cancel({ 'data.user._id': userId });
        this.logger.log(`Cancelled ${numRemoved} job(s) for user ${userId}`);
        return numRemoved;
    }
}