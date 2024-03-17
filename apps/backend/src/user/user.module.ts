import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import {
  SupabaseModule,
  SupabaseService,
  SupabaseStrategy,
} from '../common/supabase';

@Module({
  imports: [SupabaseModule],
  controllers: [UserController],
  providers: [UserService, SupabaseService, SupabaseStrategy],
})
export class UserModule {}
