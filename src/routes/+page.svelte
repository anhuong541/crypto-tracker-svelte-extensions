<script lang="ts">
  let resData = $state<any | null>(null)

  let selectedSymbol = $state('')
  let listToken = $state<string[]>([])
  let err = $state<any | null>(null)

  // onMount(async () => {
  //   listToken = await chromeStorage.get('myKey')
  // })

  $effect(() => {
    console.log(selectedSymbol)
  })

  const fetchCryptoListings = async () => {
    // const res = await coinmarketcapApi.get('/cryptocurrency/quotes/latest', {
    //   params: {
    //     symbol: 'DEEP'
    //   }
    // })
    // resData = res
  }

  const submitSelectedSymbol = (e: Event) => {
    e.preventDefault()
    listToken = [...listToken, selectedSymbol]
    selectedSymbol = ''
  }

  const addToken = async () => {}

  const deleteToken = async () => {
    // await chromeStorage.clear()
  }
</script>

<div class="container">hello World</div>

<!-- <button onclick={fetchCryptoListings}>Fetch Crypto Listings</button> -->
<!-- <pre>{JSON.stringify(resData, null, 2)}</pre> -->
