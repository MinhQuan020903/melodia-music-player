import { Module } from '@nestjs/common';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { SupabaseModule, SupabaseService } from '../common/supabase';

@Module({
  imports: [SupabaseModule],
  controllers: [SongController],
  providers: [SongService, SupabaseService],
})
export class SongModule {}
