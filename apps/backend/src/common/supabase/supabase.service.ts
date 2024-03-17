// supabase.service.ts
import { Injectable, Logger } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly logger = new Logger(SupabaseService.name);
  private clientInstance: SupabaseClient;

  constructor(private readonly configService: ConfigService) {}

  getClient() {
    this.logger.log('Getting Supabase client...');
    if (this.clientInstance) {
      this.logger.log('Client exists - returning for current request scope');
      return this.clientInstance;
    }

    this.logger.log('Initializing new Supabase client for new request scope');

    this.clientInstance = createClient(
      this.configService.get('NEXT_PUBLIC_SUPABASE_URL'),
      this.configService.get('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    );

    this.logger.log('Supabase client has been initialized!');

    return this.clientInstance;
  }
}
