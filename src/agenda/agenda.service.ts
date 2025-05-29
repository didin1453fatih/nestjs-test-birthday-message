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
        const today = moment.tz(user.timezone);
        const birthMonthDay = moment(user.birthday).format('MM-DD');

        let nextBirthday = moment.tz(`${today.year()}-${birthMonthDay} 09:00`, 'YYYY-MM-DD HH:mm', user.timezone);

        if (nextBirthday.isBefore(today)) {
            nextBirthday = nextBirthday.add(1, 'year');
        }
        this.logger.log(`Scheduling birthday job for ${user.email} at ${nextBirthday.format()}`);
        await this.agenda.schedule(nextBirthday.toDate(), 'birthday-job', {
            user: user,
            createdAt: new Date()
        });
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