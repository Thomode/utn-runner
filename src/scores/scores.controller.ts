import { Controller, Get, Post, Body } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { ApiTags } from '@nestjs/swagger';
import { Score } from './entities/score.entity';

@ApiTags('scores')
@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Post()
  async create(@Body() createScoreDto: CreateScoreDto) {
    return await this.scoresService.create(createScoreDto);
  }

  @Get()
  async findAll(): Promise<Score[]> {
    return await this.scoresService.findAll();
  }
}
