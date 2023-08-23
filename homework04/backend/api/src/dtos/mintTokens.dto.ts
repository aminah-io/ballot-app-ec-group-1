import { ApiProperty } from "@nestjs/swagger";

export class MintTokensDto {
    @ApiProperty({ type: String, default: 'My Address' })
    address: string;
}