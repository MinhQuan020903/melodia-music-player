import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SupabaseGuard } from '../common/supabase';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(SupabaseGuard)
  async getUser(): Promise<{ data: any }> {
    return await this.userService.getUser();
  }
}
