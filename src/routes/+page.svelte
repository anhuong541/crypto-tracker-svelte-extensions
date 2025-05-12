<script lang="ts">
  import { chromeStorage } from '$lib/utils/chrome'
  import '$lib/styles/home.css'
  import { cacheTokenTime, CHROME_STORAGE_KEYS } from '$lib/constants/chrome.storage'
  import { onMount } from 'svelte'
  import { getCmcImg, getCryptoPrice } from '$lib/services/coinmarketcap'

  // TODO: add loading skeleton
  // TODO: add cache for list token
  // TODO: check and optimize UI performance
  // FIXME: fix the error still show old data when remove token

  type Token = { price: number; img: string; symbol: string }
  type CacheToken = { token: Token; expireTime: number }

  let haveApiKey = $state(true)
  let apiKey = $state('')
  let selectedSymbol = $state('')
  let listToken = $state<{ price: number; img: string; symbol: string }[]>([])
  let listSymbol = $state<string[]>([])

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
    listSymbol = [...listSymbol, selectedSymbol]
    updateListSymbolStorage()
    await updateListToken(selectedSymbol)
    selectedSymbol = ''
  }

  const submitApiKey = async (e: Event) => {
    e.preventDefault()
    await chromeStorage.set({ [CHROME_STORAGE_KEYS.API_KEY]: apiKey })
    haveApiKey = true
    apiKey = ''
  }

  const deleteToken = (index: number) => {
    listSymbol = listSymbol.filter((_, i) => i !== index)
    listToken = listToken.filter((_, i) => i !== index)
    updateListSymbolStorage()
  }

  const logout = async () => {
    await chromeStorage.set({ [CHROME_STORAGE_KEYS.API_KEY]: '' })
    haveApiKey = false
  }

  onMount(async () => {
    haveApiKey = await getAPIKey()
    // console.log({ haveApiKey })
    if (!haveApiKey) {
      return
    }
    // console.log('it trigger true!!!')
    const store = await chromeStorage.get<string[]>(CHROME_STORAGE_KEYS.LIST_SYMBOL)
    listSymbol = Object.values(store)
    // check cache token and update by list symbol
    listSymbol.forEach(async symbol => {
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
  })
</script>

<div class="container">
  {#if !haveApiKey}
    <form
      onsubmit={submitApiKey}
      class="form-container-api-key"
    >
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
        Logout
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
        Submit
      </button>
    </form>

    <!-- this div is for error message or some notification -->
    <!-- <div class="notification-ui">{debug && JSON.stringify(debug)}</div> -->

    <div class="crypto-listings-container">
      <ul>
        {#each listToken as token, tokenIndex}
          <li class="crypto-listing-item">
            <div class="crypto-listing-item-content">
              <img
                src={token?.img}
                alt={token?.symbol}
              />
              <h3>{token?.symbol}</h3>
              <p class="crypto-listing-item-price">${token?.price.toFixed(4)}</p>
            </div>
            <button
              class="delete-token-btn"
              onclick={() => deleteToken(tokenIndex)}>x</button
            >
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style>
</style>
