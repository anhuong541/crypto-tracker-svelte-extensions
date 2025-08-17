<script lang="ts">
  import CryptoItem from './CryptoItem.svelte'
  import type { Token } from '$lib/types/coinmarketcap'

  interface Props {
    tokens: Token[]
    onDeleteToken: (symbol: string) => void
  }

  let { tokens, onDeleteToken }: Props = $props()
</script>

<div class="crypto-list-container">
  {#if tokens.length === 0}
    <div class="empty-state">No cryptocurrencies added yet. Add your first one above!</div>
  {:else}
    <ul class="crypto-list">
      {#each tokens as token (token.symbol)}
        <CryptoItem
          {token}
          onDelete={onDeleteToken}
        />
      {/each}
    </ul>
  {/if}
</div>

<style>
  .crypto-list-container {
    margin-top: 8px;
    max-height: 400px;
    overflow-y: auto;
  }

  .empty-state {
    text-align: center;
    color: #6c757d;
    padding: 15px 0;
    font-size: 13px;
  }

  .crypto-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  /* Scrollbar styling */
  .crypto-list-container::-webkit-scrollbar {
    width: 6px;
  }

  .crypto-list-container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  .crypto-list-container::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 10px;
  }

  .crypto-list-container::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
</style>
