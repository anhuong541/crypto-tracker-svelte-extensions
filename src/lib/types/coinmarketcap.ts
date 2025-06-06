export type CryptoListing = {
  status: {
    timestamp: string
    error_code: number
    error_message: string | null
    elapsed: number
    credit_count: number
    notice: string | null
  }
  data: {
    [symbol: string]: {
      id: number
      name: string
      symbol: string
      slug: string
      num_market_pairs: number
      date_added: string
      tags: string[]
      max_supply: number
      circulating_supply: number
      total_supply: number
      is_active: number
      infinite_supply: boolean
      platform: null // You can change this if you get data for it later
      cmc_rank: number
      is_fiat: number
      self_reported_circulating_supply: number | null
      self_reported_market_cap: number | null
      tvl_ratio: number | null
      last_updated: string
      quote: {
        [currency: string]: {
          price: number
          volume_24h: number
          volume_change_24h: number
          percent_change_1h: number
          percent_change_24h: number
          percent_change_7d: number
          percent_change_30d: number
          percent_change_60d: number
          percent_change_90d: number
          market_cap: number
          market_cap_dominance: number
          fully_diluted_market_cap: number
          tvl: number | null
          last_updated: string
        }
      }
    }
  }
}

export type Token = { price: number; img: string; symbol: string }
export type CacheToken = { token: Token; expireTime: number }
