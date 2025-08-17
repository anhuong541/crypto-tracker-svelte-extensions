<script lang="ts">
  import Button from './Button.svelte'

  interface Props {
    title: string
    onLogout?: () => void
    showLogout?: boolean
  }

  let { title, onLogout, showLogout = false }: Props = $props()
</script>

<div class="header-container">
  <a
    href="https://coinmarketcap.com/"
    target="_blank"
    class="header-link"
  >
    <h1 class="header-title">{title}</h1>
  </a>

  {#if showLogout && onLogout}
    <Button
      variant="secondary"
      size="small"
      class="logout-btn"
      onclick={onLogout}
    >
      ×
    </Button>
  {/if}
</div>

<style>
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding-bottom: 8px;
    border-bottom: 1px solid #e1e5ea;
  }

  .header-link {
    text-decoration: none;
  }

  .header-title {
    color: #3861fb;
    margin: 0;
    font-size: 18px;
    font-weight: 700;
  }

  :global(.logout-btn) {
    border-radius: 50% !important;
    width: 24px;
    height: 24px;
    padding: 0 !important;
    font-size: 16px;
  }
</style>
