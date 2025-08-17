import ApiClient from '$lib/utils/network'

const coinmarketcapApi = new ApiClient({
  baseURL: 'https://pro-api.coinmarketcap.com/v1',
  headers: {
    // 'X-CMC_PRO_API_KEY': 'COIN_MARKET_CAP_API_KEY',
    'Content-Type': 'application/json',
  },
})

export { coinmarketcapApi }
