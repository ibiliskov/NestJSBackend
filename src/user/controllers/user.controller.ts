import { Controller, Get, Param, Post, Body, UsePipes, ValidationPipe, Delete } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { IUserRO } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto';

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    async getAll(): Promise<IUserRO[]> {

        return this.userService.findAll();
    }

    @Get(':email')
    async getOne(@Param() { email }): Promise<IUserRO> {

        return this.userService.findOne(email);
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body('user') userData: CreateUserDto): Promise<IUserRO> {

        return this.userService.create(userData);
    }

    @Delete(':email')
    async delete(@Param() { email }): Promise<void> {

        return this.userService.delete(email);
    }
}
