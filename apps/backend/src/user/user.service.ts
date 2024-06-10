import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../common/supabase';

@Injectable()
export class UserService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getUser(): Promise<{ data: any }> {
    const getData = async () => {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('liked_songs')
        .select('*');

      if (error) {
        throw new Error(error.message); // Throw an error if there's an error
      }
      const res = data || [];
      return { data: res };
    };
    return await getData(); // Return the result of getData function
  }
}
