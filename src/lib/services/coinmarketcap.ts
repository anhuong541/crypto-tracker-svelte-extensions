import { coinmarketcapApi } from '$lib/apis'
import { getAPIKey } from '$lib/chrome'
import type { CryptoListing, Token } from '$lib/types/coinmarketcap'

export const getCryptoPrice = async (symbol: string): Promise<CryptoListing> => {
  const apiKey = await getAPIKey()
  console.log({ apiKey })
  return await coinmarketcapApi.get('/cryptocurrency/quotes/latest', {
    params: { symbol },
    headers: {
      'X-CMC_PRO_API_KEY': apiKey,
    },
  })
}

// crypto into look no need to take
export const getCryptoInfo = async (symbol: string) => {
  return await coinmarketcapApi.get('/cryptocurrency/info', {
    params: { symbol },
  })
}

export const getCmcImg = (id: string) => {
  return `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`
}

export const getTokenLinkToCmc = (token: Token) => {
  return `https://coinmarketcap.com/currencies/${token?.slug}/`
}
