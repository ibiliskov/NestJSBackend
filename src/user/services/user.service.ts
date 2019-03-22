import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IUserRO } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities';
import { Repository, FindOneOptions, FindConditions, DeleteResult } from 'typeorm';
import { validate } from 'class-validator';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async findAll(): Promise<IUserRO[]> {

        const users = await this.userRepository.find();
        return users.map(user => this.buildUserRO(user));
    }

    async findOne(email: string): Promise<IUserRO> {

        const findOneOptions: FindConditions<UserEntity> = {
            email,
        };

        const user = await this.userRepository.findOne(findOneOptions);

        if (!user) {

            const userError = { name: `Can't find user by email '${email}'.` };
            throw new HttpException({ message: 'Data error', errors: userError }, HttpStatus.BAD_REQUEST);
        }

        return this.buildUserRO(user);
    }

    async create(userData: CreateUserDto): Promise<IUserRO> {

        const { firstName, lastName, email } = userData;
        const query: FindOneOptions<UserEntity> = {
            where: { email },
        };

        const user = await this.userRepository.findOne(query);

        if (user) {

            const duplicateError = { name: 'Email must be unique.' };
            throw new HttpException({ message: 'Input data validation failed', errors: duplicateError }, HttpStatus.BAD_REQUEST);
        }

        const newUser = this.userRepository.manager.create(UserEntity, {
            first_name: firstName,
            last_name: lastName,
            email,
        });
        const errors = await validate(newUser);

        if (errors.length > 0) {

            const invalidError = { Name: 'User input is not valid.' };
            throw new HttpException({ message: 'Input data validation failed', errors: invalidError }, HttpStatus.BAD_REQUEST);

        } else {

            const savedUser = await this.userRepository.save(newUser);
            return this.buildUserRO(savedUser);
        }
    }

    async delete(email: string): Promise<void> {

        const deleteOptions: FindConditions<UserEntity> = {
            email,
        };

        const deleteResult = await this.userRepository.delete(deleteOptions);

        if (!deleteResult.affected) {

            const deleteError = { name: `Can't find user by email '${email}'.` };
            throw new HttpException({ message: 'Data error', errors: deleteError }, HttpStatus.BAD_REQUEST);
        }
    }

    private buildUserRO(user: UserEntity): IUserRO {

        const userRO: IUserRO = {
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
        };

        return userRO;
    }
}
