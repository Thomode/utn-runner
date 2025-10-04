import { ApiProperty } from "@nestjs/swagger";

export class CreateScoreDto {
    @ApiProperty()
    player: string;

    @ApiProperty()
    points: number;
}
