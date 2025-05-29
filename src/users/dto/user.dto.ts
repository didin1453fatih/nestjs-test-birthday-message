import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsISO8601, IsString, IsTimeZone } from 'class-validator';

export class UserDto {
    @IsNotEmpty() @IsString() @ApiProperty({
        type: String,
        example: 'Budi'
    })
    name: string;

    @IsNotEmpty() @IsEmail() @ApiProperty({
        type: String,
        example: 'budi@gmail.com'
    })
    email: string;

    @IsNotEmpty() @IsISO8601() @ApiProperty({
        type: Date,
        example: '2022-09-27'
    })
    birthday: string;

    @IsNotEmpty() @IsTimeZone() @ApiProperty({
        type: String,
        example: 'America/New_York'
    })
    timezone: string;
}