import { SongService } from './song.service';
import { Controller, Get } from '@nestjs/common';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get()
  async getUser(): Promise<{ data: any }> {
    return await this.songService.getSongs();
  }
}
