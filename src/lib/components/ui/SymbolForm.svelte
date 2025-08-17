<script lang="ts">
  import Input from './TextField.svelte'
  import Button from './Button.svelte'

  interface Props {
    onSubmit: (symbol: string) => Promise<void>
    isLoading?: boolean
  }

  let { onSubmit, isLoading = false }: Props = $props()

  let symbol = $state('')

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    if (symbol.trim() && !isLoading) {
      await onSubmit(symbol.trim().toUpperCase())
      symbol = ''
    }
  }
</script>

<form
  onsubmit={handleSubmit}
  class="symbol-form"
>
  <Input
    bind:value={symbol}
    placeholder="Enter a crypto symbol"
    required
    disabled={isLoading}
    class="symbol-input"
  />

  <Button
    type="submit"
    disabled={!symbol.trim() || isLoading}
    class="add-btn"
  >
    {isLoading ? 'Adding...' : 'Add'}
  </Button>
</form>

<style>
  .symbol-form {
    display: flex;
    gap: 6px;
    margin-bottom: 10px;
  }

  :global(.symbol-input) {
    flex: 1;
  }

  :global(.add-btn) {
    flex-shrink: 0;
  }
</style>
