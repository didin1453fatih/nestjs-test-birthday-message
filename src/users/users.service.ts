import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AgendaService } from '../agenda/agenda.service';
import { UserDto } from './dto/user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(
        private readonly agendaService: AgendaService,
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }

    async create(dto: UserDto): Promise<User> {
        const emailExist = await this.userModel.findOne({
            email: dto.email
        })
        if (emailExist) {
            throw new NotAcceptableException(`${dto.email} was exist`)
        }
        const created = new this.userModel(dto);
        const user = await created.save();
        await this.agendaService.scheduleBirthdayJob(user);
        return user;
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async update(id: string, dto: UserDto): Promise<User> {

        const emailExist = await this.userModel.findOne({
            $and: [
                {
                    email: dto.email
                },
                {
                    _id: {
                        $ne: id
                    }
                }
            ]
        })

        if (emailExist) {
            throw new NotAcceptableException(`${dto.email} was exist`)
        }

        const user = await this.userModel.findByIdAndUpdate(id, dto, { new: true }).exec();
        if (!user) {
            throw new NotFoundException('User not found');
        }
        await this.agendaService.rescheduleBirthdayJob(user);
        return user;
    }

    async remove(id: string): Promise<void> {
        const user = await this.userModel.findByIdAndDelete(id).exec();
        if (!user) {
            throw new NotFoundException('User not found');
        }
        await this.agendaService.cancelBirthdayJob(user._id);
    }
}