<script lang="ts">
  import Button from './Button.svelte'
  import type { Token } from '$lib/types/coinmarketcap'
  import { formatCurrency } from '$lib/utils/currency'
  import { getTokenLinkToCmc } from '$lib/services/coinmarketcap'

  interface Props {
    token: Token
    onDelete: (symbol: string) => void
  }

  let { token, onDelete }: Props = $props()

  const handleDelete = () => {
    onDelete(token.symbol)
  }
</script>

<li class="crypto-item">
  <a
    href={getTokenLinkToCmc(token)}
    target="_blank"
    class="crypto-item-content"
  >
    <img
      src={token.img}
      alt={token.symbol}
      class="crypto-icon"
    />
    <h3 class="crypto-symbol">{token.symbol}</h3>
    <p class="crypto-price">
      ${formatCurrency(token.price)}
    </p>
  </a>

  <Button
    variant="danger"
    size="small"
    class="delete-btn"
    onclick={handleDelete}
  >
    ×
  </Button>
</li>

<style>
  .crypto-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 10px;
    background-color: white;
    border-radius: 6px;
    margin-bottom: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition:
      transform 0.2s,
      box-shadow 0.2s;
  }

  .crypto-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .crypto-item-content {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    flex: 1;
  }

  .crypto-icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
  }

  .crypto-symbol {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: #212529;
  }

  .crypto-price {
    margin: 0;
    font-size: 14px;
    font-weight: 500;
    color: #3861fb;
  }

  :global(.delete-btn) {
    border-radius: 50% !important;
    width: 24px;
    height: 24px;
    padding: 0 !important;
    font-size: 16px;
  }
</style>
