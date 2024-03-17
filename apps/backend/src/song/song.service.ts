import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../common/supabase';

@Injectable()
export class SongService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getSongs(): Promise<{ data: any }> {
    const getData = async () => {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message); // Throw an error if there's an error
      }
      const res = data || [];
      return { data: res };
    };
    return await getData(); // Return the result of getData function
  }
}
