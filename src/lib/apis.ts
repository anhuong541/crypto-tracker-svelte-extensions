import ApiClient from '$lib/utils/network'

const coinmarketcapApi = new ApiClient({
  baseURL: 'https://pro-api.coinmarketcap.com/v1',
  headers: {
    'X-CMC_PRO_API_KEY': 'COIN_MARKET_CAP_API_KEY', // TODO: move to env variable or hide it somewhere
    'Content-Type': 'application/json'
  }
})

export { coinmarketcapApi }
