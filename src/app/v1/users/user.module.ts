import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [HttpModule],
  providers: [UserService, UserResolver],
})
export class UserModule {}
