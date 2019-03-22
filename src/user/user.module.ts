import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as entites from './entities';

@Module({
  imports: [TypeOrmModule.forFeature(Object.values(entites))],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
