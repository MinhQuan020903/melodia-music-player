// import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
// import { RecommendationService } from '../services/RecommendationService';

// @Controller('recommend')
// export class RecommendationController {
//   constructor(private readonly recommendationService: RecommendationService) {}

//   @Post()
//   @HttpCode(HttpStatus.OK)
//   async recommendSongs(@Body('track_id') trackId: string) {
//     const recommendations =
//       await this.recommendationService.recommendSongs(trackId);
//     return recommendations;
//   }
// }
