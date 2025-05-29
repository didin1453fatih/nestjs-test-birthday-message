import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @ApiBody({ type: UserDto })
    @Post()
    create(@Body() body: UserDto) {
        return this.usersService.create(body);
    }

      @Get(':id')
      findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
      }

      @Get()
      findAll() {
        return this.usersService.findAll();
      }

      @Put(':id')
      update(@Param('id') id: string, @Body() dto: UserDto) {
        return this.usersService.update(id, dto);
      }

      @Delete(':id')
      remove(@Param('id') id: string) {
        return this.usersService.remove(id);
      }
}