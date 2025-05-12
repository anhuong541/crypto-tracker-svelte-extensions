import { coinmarketcapApi } from '$lib/apis'
import { CHROME_STORAGE_KEYS } from '$lib/constants/chrome.storage'
import type { CryptoListing } from '$lib/types/coinmarketcap'
import { chromeStorage } from '$lib/utils/chrome'

export const getCryptoPrice = async (symbol: string): Promise<CryptoListing> => {
  const apiKey = await chromeStorage.get<string>(CHROME_STORAGE_KEYS.API_KEY)
  if (!apiKey) {
    throw new Error('No API key found')
  }
  return await coinmarketcapApi.get('/cryptocurrency/quotes/latest', {
    params: { symbol },
    headers: {
      'X-CMC_PRO_API_KEY': apiKey
    }
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
