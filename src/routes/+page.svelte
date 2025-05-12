<script lang="ts">
  import { chromeStorage } from '$lib/utils/chrome'
  import '$lib/styles/home.css'
  import { CHROME_STORAGE_KEYS } from '$lib/constants/chrome.storage'
  import { onMount } from 'svelte'
  import { getCmcImg, getCryptoPrice } from '$lib/services/coinmarketcap'

  // TODO: add loading skeleton
  // TODO: add cache for list token
  // TODO: check and optimize UI performance
  // FIXME: fix the error still show old data when remove token

  let resData = $state<any | null>(null)

  let selectedSymbol = $state('')
  let listToken = $state<{ price: number; img: string; symbol: string }[]>([])
  let listSymbol = $state<string[]>([])

  const updateListToken = async (symbol: string) => {
    const crypto = await getCryptoPrice(symbol)
    if (!crypto) return
    const price = crypto.data?.[symbol].quote.USD.price
    const cryptoId = crypto.data?.[symbol].id
    const cryptoImg = getCmcImg(cryptoId.toString())
    listToken.push({
      price,
      img: cryptoImg,
      symbol
    })
  }

  const updateListSymbolStorage = () => {
    chromeStorage.set({ [CHROME_STORAGE_KEYS.LIST_TOKEN]: listSymbol })
  }

  const submitSelectedSymbol = async (e: Event) => {
    e.preventDefault()
    listSymbol = [...listSymbol, selectedSymbol]
    updateListSymbolStorage()
    await updateListToken(selectedSymbol)
    selectedSymbol = ''
  }

  const addToken = async () => {
    // Save a key-value pair
    const store = await chromeStorage.get<string[]>(CHROME_STORAGE_KEYS.LIST_TOKEN)
    chromeStorage.set({ [CHROME_STORAGE_KEYS.LIST_TOKEN]: [...store, 'selectedSymbol'] })
  }

  const deleteToken = (index: number) => {
    listSymbol = listSymbol.filter((_, i) => i !== index)
    listToken = listToken.filter((_, i) => i !== index)
    updateListSymbolStorage()
  }

  onMount(async () => {
    const store = await chromeStorage.get<string[]>(CHROME_STORAGE_KEYS.LIST_TOKEN)
    listSymbol = Object.values(store)
    listSymbol.forEach(async symbol => {
      await updateListToken(symbol)
    })
  })
</script>

<div class="container">
  <h1>Crypto Tracker</h1>

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

  <button onclick={() => chromeStorage.remove(CHROME_STORAGE_KEYS.LIST_TOKEN)}>Remove</button>

  <!-- this div is for error message or some notification -->
  <div class="notification-ui">{resData && JSON.stringify(resData)}</div>

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
</div>

<style>
</style>
