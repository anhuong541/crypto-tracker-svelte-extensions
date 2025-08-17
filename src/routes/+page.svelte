<script lang="ts">
  import { tick } from 'svelte'
  import { chromeStorage } from '$lib/utils/chrome'
  import { cacheTokenTime, CHROME_STORAGE_KEYS } from '$lib/constants/chrome.storage'
  import { getCmcImg, getCryptoPrice } from '$lib/services/coinmarketcap'
  import type { CacheToken, Token } from '$lib/types/coinmarketcap'
  import { isValidCMCKey } from '$lib/utils/currency'
  import { getAPIKey } from '$lib/chrome'
  import { Header, ApiKeyForm, SymbolForm, CryptoList, Notification } from '$lib/components/ui'

  let haveApiKey = $state(true)
  let listToken = $state<Token[]>([])
  let listSymbol = $state<string[]>([])
  let error = $state('')
  let isLoading = $state(false)

  tick().then(async () => {
    let key = ''
    try {
      key = await getAPIKey()
      haveApiKey = !!key
    } catch (error) {
      console.log('debug', error)
      haveApiKey = false
    }
    if (haveApiKey) {
      await startFetchListTokens()
    }
  })

  const updateListToken = async (symbol: string) => {
    const crypto = await getCryptoPrice(symbol)
    if (!crypto) return
    const price = crypto.data?.[symbol].quote.USD.price
    const cryptoId = crypto.data?.[symbol].id
    const cryptoImg = getCmcImg(cryptoId.toString())
    const token = {
      price,
      symbol,
      img: cryptoImg,
      slug: crypto.data?.[symbol].slug,
    }

    listToken = [...listToken, token]
    updateListTokenStorage(symbol, token)
  }

  const updateListSymbolStorage = async () => {
    await chromeStorage.set({ [CHROME_STORAGE_KEYS.LIST_SYMBOL]: listSymbol })
  }

  const updateListTokenStorage = async (symbol: string, token: Token) => {
    const expireTime = Date.now() + cacheTokenTime
    await chromeStorage.set({
      [`${CHROME_STORAGE_KEYS.CACHE_TOKEN_}${symbol}`]: { token, expireTime },
    })
  }

  const handleSymbolSubmit = async (symbol: string) => {
    error = ''
    isLoading = true
    try {
      listSymbol = [...listSymbol, symbol]
      await updateListToken(symbol)
      await updateListSymbolStorage()
    } catch (err) {
      error = 'Invalid symbol'
      listSymbol = listSymbol.filter(s => s !== symbol)
    } finally {
      isLoading = false
    }
  }

  const handleApiKeySubmit = async (apiKey: string) => {
    error = ''
    isLoading = true
    try {
      if (isValidCMCKey(apiKey)) {
        await chromeStorage.set({ [CHROME_STORAGE_KEYS.API_KEY]: apiKey })
        haveApiKey = true
        await startFetchListTokens()
      } else {
        error = 'Invalid API key'
      }
    } catch (err) {
      error = 'Failed to save API key'
    } finally {
      isLoading = false
    }
  }

  const handleDeleteToken = (symbol: string) => {
    listSymbol = listSymbol.filter(s => s !== symbol)
    listToken = listToken.filter(t => t.symbol !== symbol)
    updateListSymbolStorage()
  }

  const handleLogout = async () => {
    await chromeStorage.set({ [CHROME_STORAGE_KEYS.API_KEY]: '' })
    haveApiKey = false
    listToken = []
    listSymbol = []
  }

  const startFetchListTokens = async () => {
    try {
      const store = await chromeStorage.get<string[]>(CHROME_STORAGE_KEYS.LIST_SYMBOL)
      listSymbol = Object.values(store)
      // check cache token and update by list symbol
      await Promise.all(
        listSymbol.map(async symbol => {
          const key = `${CHROME_STORAGE_KEYS.CACHE_TOKEN_}${symbol}`
          const { token, expireTime } = await chromeStorage.get<CacheToken>(key)
          if (token && expireTime) {
            if (expireTime < Date.now()) {
              await updateListToken(symbol)
            } else {
              listToken.push(token)
            }
          } else {
            await updateListToken(symbol)
          }
        }),
      )
    } catch (error) {
      console.log('error when fetch list token: ', error)
    }
  }
</script>

<div class="container">
  {#if !haveApiKey}
    <ApiKeyForm
      title="Coinmarketcap Tracker"
      onSubmit={handleApiKeySubmit}
      {error}
      {isLoading}
    />
  {:else}
    <Header
      title="Coinmarketcap"
      onLogout={handleLogout}
      showLogout={true}
    />

    <SymbolForm
      onSubmit={handleSymbolSubmit}
      {isLoading}
    />

    <Notification
      message={error}
      show={!!error}
    />

    <CryptoList
      tokens={listToken}
      onDeleteToken={handleDeleteToken}
    />
  {/if}
</div>

<style>
  /* Extension-specific styles */
  :global(body) {
    margin: 0;
    padding: 0;
    width: 320px; /* Standard width for extension popups */
    max-height: 600px; /* Maximum height for extension popups */
    overflow-x: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .container {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    background-color: #f8f9fa;
  }
</style>
