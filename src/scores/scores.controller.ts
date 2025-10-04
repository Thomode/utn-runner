import { Controller, Get, Post, Body } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { ApiTags } from '@nestjs/swagger';
import { Score } from './entities/score.entity';
import { ScoreResponseDto } from './dto/score-response.dto';

@ApiTags('scores')
@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) { }

  @Post()
  async create(@Body() createScoreDto: CreateScoreDto): Promise<ScoreResponseDto> {
    return await this.scoresService.create(createScoreDto);
  }

  @Get()
  async findAll(): Promise<ScoreResponseDto[]> {
    return await this.scoresService.findAll();
  }
}
