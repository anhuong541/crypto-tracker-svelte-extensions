<script lang="ts">
  import { coinmarketcapApi } from '$lib/apis'

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
    // listToken = await chromeStorage.get('myKey')
  }
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

  <button
    id="submit-selected-symbol-btn"
    onclick={addToken}
  >
    Add
  </button>
  <button
    id="submit-selected-symbol-btn"
    onclick={deleteToken}
  >
    Delete
  </button>

  <!-- this div is for error message or some notification -->
  <div class="notification-ui">{JSON.stringify(listToken)}</div>

  <div class="notification-ui">{JSON.stringify(err)}</div>

  <div class="crypto-listings-container">
    <ul>
      {#each listToken as token}
        <li class="crypto-listing-item">
          <div class="crypto-listing-item-content">
            <img
              src="https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png"
              alt="DEEP"
            />
            <h3>{token}</h3>
          </div>
          <p class="crypto-listing-item-price">$100</p>
        </li>
      {/each}
    </ul>
  </div>
</div>

<!-- <button onclick={fetchCryptoListings}>Fetch Crypto Listings</button> -->
<!-- <pre>{JSON.stringify(resData, null, 2)}</pre> -->

<style>
  /* Container styling */
  .container {
    max-width: 480px;
    padding: 1rem 1.5rem;
    background: #ebf5fb; /* light background */
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(52, 152, 219, 0.2);
    color: #2c3e50; /* dark text */
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  /* Heading */
  .container h1 {
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #3498db; /* primary blue */
    text-align: center;
    letter-spacing: 1.2px;
  }

  /* Form container */
  .form-container {
    display: flex;
    gap: 0.8rem;
    margin-bottom: 1rem;
  }

  /* Input text */
  .form-container input[type='text'] {
    flex-grow: 1;
    padding: 0.6rem 1rem;
    font-size: 1rem;
    border: 2px solid #3498db; /* primary blue border */
    border-radius: 6px;
    background: white;
    color: #2c3e50;
    transition: border-color 0.3s ease;
  }

  .form-container input[type='text']:focus {
    outline: none;
    border-color: #85929e; /* secondary green on focus */
    box-shadow: 0 0 6px #85929e;
  }

  /* Submit button */
  #submit-selected-symbol-btn {
    background-color: #3498db; /* primary blue */
    border: none;
    color: white;
    font-weight: 600;
    padding: 0 1rem;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 1rem;
  }

  #submit-selected-symbol-btn:hover {
    background-color: #2980b9; /* darker blue on hover */
  }

  /* Notification UI */
  .notification-ui {
    min-height: 1.5rem;
    margin-bottom: 1rem;
    font-size: 16px;
    color: #e74c3c; /* red for errors */
    text-align: center;
    font-weight: 500;
  }

  /* Crypto listings container */
  .crypto-listings-container {
    background: white;
    border-radius: 10px;
    overflow-y: auto;
    box-shadow: 0 2px 8px rgba(52, 152, 219, 0.15);
  }

  /* List styling */
  .crypto-listings-container ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  /* Crypto list item */
  .crypto-listing-item {
    display: flex;
    height: 40px;
    justify-content: space-between;
    align-items: center;
    padding: 0rem 1rem;
    border-bottom: 1px solid #d6eaf8;
    cursor: pointer;
    border-radius: 6px;
    transition: background-color 0.2s ease;
  }

  .crypto-listing-item:last-child {
    border-bottom: none;
  }

  .crypto-listing-item:hover {
    background-color: #85929e; /* secondary green */
    color: white;
  }

  /* Content inside list item */
  .crypto-listing-item-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  /* Crypto image */
  .crypto-listing-item-content img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 0 6px rgba(52, 152, 219, 0.3);
  }

  /* Crypto name */
  .crypto-listing-item-content h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
  }

  /* Crypto price */
  .crypto-listing-item-price {
    font-weight: 500;
    font-size: 14px;
    text-align: right;
    user-select: none;
  }

  .crypto-listing-item:hover .crypto-listing-item-price {
    color: white;
  }
</style>
