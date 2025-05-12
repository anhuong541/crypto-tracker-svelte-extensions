import ApiClient from '$lib/utils/network'

const coinmarketcapApi = new ApiClient({
  baseURL: 'https://pro-api.coinmarketcap.com/v1',
  headers: {
    // 'X-CMC_PRO_API_KEY': 'COIN_MARKET_CAP_API_KEY', // TODO: move to env variable or hide it somewhere
    'X-CMC_PRO_API_KEY': '478b82e6-9b46-4792-90aa-305a7cb8e915',
    'Content-Type': 'application/json'
  }
})

export { coinmarketcapApi }
