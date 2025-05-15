import {
  GetLiquidityAddRemoveInPoolDto,
  GetMostProfitableTradersDto,
  GetMostProfitableTradesDto,
  GetMostTradedTokenDto,
  GetTokenPriceChangeDto,
  GetTokenPriceDto,
  GetTokenReserveDto,
  GetTradingVolumeDto,
  GetWhaleBuySellDto,
} from '../dtos/balance.dto';
import { Type } from '@nestjs/common';

// Map of method names to their respective DTOs
export const methodToDtoMap: Record<string, Type<any>> = {
  getTokenPrice: GetTokenPriceDto,
  getTokenReserve: GetTokenReserveDto,
  getTokenPriceChange: GetTokenPriceChangeDto,
  getLiquidityAddRemoveInPool: GetLiquidityAddRemoveInPoolDto,
  getMostTradedToken: GetMostTradedTokenDto,
  getWhaleBuySell: GetWhaleBuySellDto,
  getMostProfitableTrades: GetMostProfitableTradesDto,
  getTradingVolume: GetTradingVolumeDto,
  getMostProfitableTraders: GetMostProfitableTradersDto,
};

// Function to get DTO class for a method
export const getDtoForMethod = (method: string): Type<any> | null => {
  return methodToDtoMap[method] || null;
};
