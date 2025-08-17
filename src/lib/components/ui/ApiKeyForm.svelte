<script lang="ts">
  import Input from './TextField.svelte'
  import Button from './Button.svelte'
  import Notification from './Notification.svelte'

  interface Props {
    title: string
    onSubmit: (apiKey: string) => Promise<void>
    error?: string
    isLoading?: boolean
  }

  let { title, onSubmit, error = '', isLoading = false }: Props = $props()

  let apiKey = $state('')

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    if (apiKey.trim() && !isLoading) {
      await onSubmit(apiKey.trim())
      apiKey = ''
    }
  }
</script>

<form
  onsubmit={handleSubmit}
  class="api-key-form"
>
  <a
    href="https://coinmarketcap.com/"
    target="_blank"
    class="form-title-link"
  >
    <h2 class="form-title">{title}</h2>
  </a>

  <Input
    bind:value={apiKey}
    placeholder="Enter your Coinmarketcap API Key"
    required
    disabled={isLoading}
  />

  <Notification
    message={error}
    show={!!error}
  />

  <Button
    type="submit"
    disabled={!apiKey.trim() || isLoading}
    class="submit-btn"
  >
    {isLoading ? 'Adding...' : 'Add Coinmarketcap API Key'}
  </Button>
</form>

<style>
  .api-key-form {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .form-title-link {
    text-decoration: none;
  }

  .form-title {
    color: #3861fb;
    text-align: center;
    margin: 0 0 10px 0;
    font-size: 18px;
  }

  :global(.submit-btn) {
    width: 100%;
  }
</style>
