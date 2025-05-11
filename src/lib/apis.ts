import ApiClient from '$lib/utils/network'

const coinmarketcapApi = new ApiClient({
  baseURL: 'https://pro-api.coinmarketcap.com/v1',
  headers: {
    'X-CMC_PRO_API_KEY': 'COINMARKETCAP_API_KEY', // TODO: move to env variable or hide it somewhere
    'Content-Type': 'application/json'
  }
})

export { coinmarketcapApi }
