import { getJarvisServerData } from '../../utils/jarvisServer';

export const getTokenReserve = async (args: { accountId: string }) => {
  try {
    const { accountId } = args;
    const data = await getJarvisServerData('getTokenReserve', {
      accountId,
    });
    console.log('jarvis-server reserve data', data);
    if (data?.status === 429) {
      return {
        content: [
          {
            type: 'text' as const,
            text: data.error,
          },
        ],
      };
    }

    if (!data || !data.rows || data.rows.length === 0) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `No reserve data found for token ${accountId}`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(data),
        },
      ],
    };
  } catch (error) {
    console.error('Error in getTokenReserve', error);
    return {
      content: [
        {
          type: 'text' as const,
          text: 'The service is temporarily unavailable. Please try again later.',
        },
      ],
    };
  }
};

export const getTokenPrice = async (args: { accountId: string }) => {
  try {
    const { accountId } = args;
    const data = await getJarvisServerData('getTokenPrice', {
      accountId,
    });
    console.log('jarvis-server price data', data);

    if (data?.status === 429) {
      return {
        content: [
          {
            type: 'text' as const,
            text: data.error,
          },
        ],
      };
    }

    if (!data || !data.rows || data.rows.length === 0) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `No price data found for token ${accountId}`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(data),
        },
      ],
    };
  } catch (error) {
    console.error('Error in getTokenPrice', error);
    return {
      content: [
        {
          type: 'text' as const,
          text: 'The service is temporarily unavailable. Please try again later.',
        },
      ],
    };
  }
};

export const getTokenPriceChange = async (args: { accountId: string }) => {
  try {
    const { accountId } = args;
    const data = await getJarvisServerData('getTokenPriceChange', {
      accountId,
    });
    console.log('jarvis-server price change data', data);
    if (data?.status === 429) {
      return {
        content: [
          {
            type: 'text' as const,
            text: data.error,
          },
        ],
      };
    }

    if (!data || !data.rows || data.rows.length === 0) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `No price change data found for token ${accountId}`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(data),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text' as const,
          text: 'The service is temporarily unavailable. Please try again later.',
        },
      ],
    };
  }
};

export const getLiquidityAddRemoveInPool = async (args: {
  accountId: string;
  limit?: number;
}) => {
  try {
    const { accountId, limit } = args;
    const data = await getJarvisServerData('getLiquidityAddRemoveInPool', {
      accountId,
      limit,
    });
    console.log('jarvis-server liquidity add remove in pool data', data);
    if (data?.status === 429) {
      return {
        content: [
          {
            type: 'text' as const,
            text: data.error,
          },
        ],
      };
    }

    if (!data || !data.rows || data.rows.length === 0) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `No liquidity add remove in pool data found for token ${accountId}`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(data),
        },
      ],
    };
  } catch (error) {
    console.error('Error in getLiquidityAddRemoveInPool', error);
    return {
      content: [
        {
          type: 'text' as const,
          text: 'The service is temporarily unavailable. Please try again later.',
        },
      ],
    };
  }
};

export const getMostTradedToken = async (args: { limit?: number }) => {
  try {
    const { limit } = args;
    const data = await getJarvisServerData('getMostTradedToken', {
      limit,
    });
    if (data?.status === 429) {
      return {
        content: [
          {
            type: 'text' as const,
            text: data.error,
          },
        ],
      };
    }

    console.log('jarvis-server most traded token data', data);
    if (!data || !data.rows || data.rows.length === 0) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `No most traded token data found`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(data),
        },
      ],
    };
  } catch (error) {
    console.error('Error in getMostTradedToken', error);
    return {
      content: [
        {
          type: 'text' as const,
          text: 'The service is temporarily unavailable. Please try again later.',
        },
      ],
    };
  }
};

export const getWhaleBuySell = async (args: {
  accountId: string;
  limit?: number;
  timeInterval?: number;
}) => {
  try {
    const { accountId, limit, timeInterval } = args;
    const data = await getJarvisServerData('getWhaleBuySell', {
      accountId,
      limit,
      timeInterval,
    });
    console.log('jarvis-server whale buy sell data', data);
    if (data?.status === 429) {
      return {
        content: [
          {
            type: 'text' as const,
            text: data.error,
          },
        ],
      };
    }

    if (!data || !data.rows || data.rows.length === 0) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `No whale buy sell data found for token ${accountId}`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(data),
        },
      ],
    };
  } catch (error) {
    console.error('Error in getWhaleBuySell', error);
    return {
      content: [
        {
          type: 'text' as const,
          text: 'The service is temporarily unavailable. Please try again later.',
        },
      ],
    };
  }
};

export const getMostProfitableTrades = async (args: { limit?: number }) => {
  try {
    const { limit } = args;
    const data = await getJarvisServerData('getMostProfitableTrades', {
      limit,
    });
    console.log('jarvis-server most profitable trades data', data);
    if (data?.status === 429) {
      return {
        content: [
          {
            type: 'text' as const,
            text: data.error,
          },
        ],
      };
    }

    if (!data || !data.rows || data.rows.length === 0) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `No most profitable trades data found`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(data),
        },
      ],
    };
  } catch (error) {
    console.error('Error in getMostProfitableTrades', error);
    return {
      content: [
        {
          type: 'text' as const,
          text: 'The service is temporarily unavailable. Please try again later.',
        },
      ],
    };
  }
};

export const getTradingVolume = async (args: {
  limit?: number;
  timeInterval?: number;
}) => {
  try {
    const { limit, timeInterval } = args;
    const data = await getJarvisServerData('getTradingVolume', {
      limit,
      timeInterval,
    });
    console.log('jarvis-server trading volume data', data);
    if (data?.status === 429) {
      return {
        content: [
          {
            type: 'text' as const,
            text: data.error,
          },
        ],
      };
    }

    if (!data || !data.rows || data.rows.length === 0) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `No trading volume data found`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(data),
        },
      ],
    };
  } catch (error) {
    console.error('Error in getTradingVolume', error);
    return {
      content: [
        {
          type: 'text' as const,
          text: 'The service is temporarily unavailable. Please try again later.',
        },
      ],
    };
  }
};
