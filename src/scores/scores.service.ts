import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Score } from './entities/score.entity';
import { CreateScoreDto } from './dto/create-score.dto';
import { ScoreResponseDto } from './dto/score-response.dto';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score)
    private readonly scoreRepo: Repository<Score>,
  ) { }

  async create(scoreDto: CreateScoreDto): Promise<ScoreResponseDto> {
    const player = scoreDto.player.toUpperCase();

    // Validación de longitud del nombre
    if (player.length > 10) {
      throw new BadRequestException(`El nombre del jugador no debe superar los 10 caracteres`);
    }

    const exists = await this.scoreRepo.findOne({ where: { player } });
    if (exists) {
      throw new BadRequestException(`El jugador ${player} ya existe`);
    }

    // Validación de puntos
    if (scoreDto.points <= 0) {
      throw new BadRequestException(`Los puntos deben ser mayores a 0`);
    }

    const newScore = this.scoreRepo.create({ ...scoreDto, player, createdAt: new Date() });
    const saved = await this.scoreRepo.save(newScore);

    // Calcular posición del nuevo jugador
    const betterScores = await this.scoreRepo.count({
      where: { points: MoreThan(saved.points) },
    });

    const position = betterScores + 1;

    const response: ScoreResponseDto = {
      id: saved.id,
      player: saved.player,
      points: saved.points,
      position,
      createdAt: saved.createdAt,
    };

    return response;
  }

  async findAll(): Promise<ScoreResponseDto[]> {
    const scores = await this.scoreRepo.find({
      order: { points: 'DESC' },
      take: 10,
    });

    return scores.map((score, index) => ({
      id: score.id,
      player: score.player,
      points: score.points,
      position: index + 1, // posición según el orden
      createdAt: score.createdAt,
    }));
  }

}