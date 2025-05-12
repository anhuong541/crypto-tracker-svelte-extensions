import { coinmarketcapApi } from '$lib/apis'
import type { CryptoListing } from '$lib/types/coinmarketcap'

export const getCryptoPrice = async (symbol: string): Promise<CryptoListing> => {
  return await coinmarketcapApi.get('/cryptocurrency/quotes/latest', {
    params: { symbol }
  })
}

// crypto into look no need to take
export const getCryptoInfo = async (symbol: string) => {
  return await coinmarketcapApi.get('/cryptocurrency/info', {
    params: { symbol }
  })
}

export const getCmcImg = (id: string) => {
  return `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`
}
