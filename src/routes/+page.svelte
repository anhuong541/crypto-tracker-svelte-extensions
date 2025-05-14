<script lang="ts">
  import '$lib/styles/home.css'
  import { chromeStorage } from '$lib/utils/chrome'
  import { cacheTokenTime, CHROME_STORAGE_KEYS } from '$lib/constants/chrome.storage'
  import { onMount } from 'svelte'
  import { getCmcImg, getCryptoPrice } from '$lib/services/coinmarketcap'
  import type { CacheToken, Token } from '$lib/types/coinmarketcap'
  import { formatCurrency } from '$lib/utils/currency'

  let haveApiKey = $state(true)
  let apiKey = $state('')
  let selectedSymbol = $state('')
  let listToken = $state<{ price: number; img: string; symbol: string }[]>([])
  let listSymbol = $state<string[]>([])
  let error = $state('')

  const updateListToken = async (symbol: string) => {
    const crypto = await getCryptoPrice(symbol)
    if (!crypto) return
    const price = crypto.data?.[symbol].quote.USD.price
    const cryptoId = crypto.data?.[symbol].id
    const cryptoImg = getCmcImg(cryptoId.toString())
    const token = {
      price,
      img: cryptoImg,
      symbol
    }
    listToken.push(token)
    updateListTokenStorage(symbol, token)
  }

  const getAPIKey = async () => {
    try {
      const apiKey = await chromeStorage.get<string>(CHROME_STORAGE_KEYS.API_KEY)
      return !!apiKey
    } catch {
      return false
    }
  }

  const updateListSymbolStorage = async () => {
    await chromeStorage.set({ [CHROME_STORAGE_KEYS.LIST_SYMBOL]: listSymbol })
  }

  const updateListTokenStorage = async (symbol: string, token: Token) => {
    const expireTime = Date.now() + cacheTokenTime
    await chromeStorage.set({
      [`${CHROME_STORAGE_KEYS.CACHE_TOKEN_}${symbol}`]: { token, expireTime }
    })
  }

  const submitSelectedSymbol = async (e: Event) => {
    e.preventDefault()
    const symbol = selectedSymbol.trim().toUpperCase()
    listSymbol = [...listSymbol, symbol]
    await updateListToken(symbol)
      .then(() => {
        updateListSymbolStorage()
        selectedSymbol = ''
      })
      .catch(() => {
        error = 'Invalid symbol'
        listSymbol.pop()
      })
  }

  const submitApiKey = async (e: Event) => {
    e.preventDefault()
    await chromeStorage.set({ [CHROME_STORAGE_KEYS.API_KEY]: apiKey })
    haveApiKey = true
    apiKey = ''
  }

  const deleteToken = (symbol: string) => {
    listSymbol = listSymbol.filter(s => s !== symbol)
    listToken = listToken.filter(t => t.symbol !== symbol)
    updateListSymbolStorage()
  }

  const logout = async () => {
    await chromeStorage.set({ [CHROME_STORAGE_KEYS.API_KEY]: '' })
    haveApiKey = false
  }

  onMount(async () => {
    haveApiKey = await getAPIKey()
    if (!haveApiKey) {
      return
    }
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
      })
    )
  })
</script>

<div class="container">
  {#if !haveApiKey}
    <form
      onsubmit={submitApiKey}
      class="form-container-api-key"
    >
      <h2>Coinmarketcap Tracker</h2>
      <input
        type="text"
        bind:value={apiKey}
        placeholder="Enter your Coinmarketcap API Key"
      />
      <button
        type="submit"
        id="submit-selected-symbol-btn"
      >
        Add Coinmarketcap API Key
      </button>
    </form>
  {:else}
    <div class="header-container">
      <h1>Coinmarketcap</h1>

      <button
        onclick={logout}
        class="logout-btn"
      >
        <span>×</span>
      </button>
    </div>

    <form
      onsubmit={submitSelectedSymbol}
      class="form-container"
    >
      <input
        type="text"
        bind:value={selectedSymbol}
        placeholder="Enter a crypto symbol"
      />
      <button
        type="submit"
        id="submit-selected-symbol-btn"
      >
        Add
      </button>
    </form>

    {#if !!error}
      <div class="notification-ui">{error}</div>
    {/if}

    <div class="crypto-listings-container">
      {#if listToken.length === 0}
        <div class="empty-state">No cryptocurrencies added yet. Add your first one above!</div>
      {:else}
        <ul>
          {#each listToken as token}
            <li class="crypto-listing-item">
              <div class="crypto-listing-item-content">
                <img
                  src={token?.img}
                  alt={token?.symbol}
                />
                <h3>{token?.symbol}</h3>
                <p class="crypto-listing-item-price">
                  ${formatCurrency(token?.price)}
                </p>
              </div>
              <button
                class="delete-token-btn"
                onclick={() => deleteToken(token.symbol)}>×</button
              >
            </li>
          {/each}
        </ul>
      {/if}
    </div>
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
</style>
