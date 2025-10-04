import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './entities/score.entity';
import { CreateScoreDto } from './dto/create-score.dto';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score)
    private readonly scoreRepo: Repository<Score>,
  ) { }

  async create(scoreDto: CreateScoreDto): Promise<Score> {
    const player = scoreDto.player.toUpperCase(); // convertir a mayúsculas

    const exists = await this.scoreRepo.findOne({ where: { player } });

    if (exists) {
      throw new BadRequestException(`El jugador ${player} ya existe`);
    }

    const newScore = this.scoreRepo.create({
      ...scoreDto,
      player,
    });

    return await this.scoreRepo.save(newScore);
  }

  async findAll(): Promise<Score[]> {
    return await this.scoreRepo.find({
      order: { points: 'DESC' }, // orden descendente
      take: 10, // solo los 10 primeros
    });
  }
}