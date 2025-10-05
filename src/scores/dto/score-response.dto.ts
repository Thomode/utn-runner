import { ApiProperty } from '@nestjs/swagger';

export class ScoreResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    player: string;

    @ApiProperty()
    points: number;

    @ApiProperty()
    position: number;

    @ApiProperty()
    createdAt: Date;
}
