<script lang="ts">
  interface Props {
    message: string
    type?: 'error' | 'success' | 'warning' | 'info'
    show?: boolean
  }

  let { message, type = 'error', show = true }: Props = $props()
</script>

{#if show && message}
  <div class={`notification notification--${type}`}>
    {message}
  </div>
{/if}

<style>
  .notification {
    padding: 6px 8px;
    border-radius: 4px;
    margin-bottom: 8px;
    text-align: center;
    font-size: 12px;
    font-weight: 500;
    animation: fadeIn 0.3s;
  }

  .notification--error {
    background-color: #ff6b6b;
    color: white;
  }

  .notification--success {
    background-color: #28a745;
    color: white;
  }

  .notification--warning {
    background-color: #ffc107;
    color: #212529;
  }

  .notification--info {
    background-color: #17a2b8;
    color: white;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
