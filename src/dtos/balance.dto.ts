import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';

export class GetTokenPriceDto {
  @IsString({ message: 'accountId must be a string' })
  @IsNotEmpty()
  accountId: string;
}

export class GetTokenReserveDto {
  @IsString({ message: 'accountId must be a string' })
  @IsNotEmpty()
  accountId: string;
}

export class GetTokenPriceChangeDto {
  @IsString({ message: 'accountId must be a string' })
  @IsNotEmpty()
  accountId: string;
}
export class GetLiquidityAddRemoveInPoolDto {
  @IsString({ message: 'poolAddress must be a string' })
  @IsNotEmpty()
  poolAddress: string;

  @IsOptional()
  @IsNumber()
  limit: number;
}

export class GetMostTradedTokenDto {
  @IsOptional()
  @IsNumber()
  limit: number;
}

export class GetWhaleBuySellDto {
  @IsString({ message: 'accountId must be a string' })
  @IsNotEmpty()
  accountId: string;

  @IsOptional()
  @IsNumber()
  limit: number;

  @IsOptional()
  @IsNumber()
  timeInterval: number;
}

export class GetMostProfitableTradesDto {
  @IsOptional()
  @IsNumber()
  limit: number;
}
export class GetTradingVolumeDto {
  @IsOptional()
  @IsNumber()
  limit: number;

  @IsOptional()
  @IsNumber()
  timeInterval: number;
}
export class GetMostProfitableTradersDto {
  @IsOptional()
  @IsNumber()
  limit: number;
}
