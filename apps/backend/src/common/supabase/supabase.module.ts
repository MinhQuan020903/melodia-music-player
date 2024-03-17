import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SupabaseStrategy } from './supabase.strategy';
import { SupabaseGuard } from './supabase.guard';
import { SupabaseService } from './supabase.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [SupabaseService, SupabaseStrategy, SupabaseGuard],
  imports: [ConfigModule.forRoot({ isGlobal: true }), PassportModule],

  exports: [SupabaseService, SupabaseStrategy, SupabaseGuard],
})
export class SupabaseModule {}
