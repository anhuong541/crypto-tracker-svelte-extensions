<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'secondary' | 'danger'
    size?: 'small' | 'medium' | 'large'
    disabled?: boolean
    class?: string
    onclick?: () => void
    children: Snippet
  }

  let {
    type = 'button',
    variant = 'primary',
    size = 'medium',
    disabled = false,
    class: className = '',
    onclick,
    children,
  }: Props = $props()

  const handleClick = () => {
    if (!disabled && onclick) {
      onclick()
    }
  }
</script>

<button
  {type}
  {disabled}
  class={`base-button base-button--${variant} base-button--${size} ${className}`}
  onclick={handleClick}
>
  {@render children()}
</button>

<style>
  .base-button {
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }

  .base-button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Variants */
  .base-button--primary {
    background-color: #1877f2;
    color: white;
  }

  .base-button--primary:hover:not(:disabled) {
    background-color: #0d6efd;
  }

  .base-button--secondary {
    background-color: transparent;
    color: #6c757d;
    border: 1px solid #d1d9e6;
  }

  .base-button--secondary:hover:not(:disabled) {
    background-color: #e1e5ea;
    color: #3861fb;
  }

  .base-button--danger {
    background-color: transparent;
    color: #6c757d;
  }

  .base-button--danger:hover:not(:disabled) {
    color: #dc3545;
    background-color: #fff5f5;
  }

  /* Sizes */
  .base-button--small {
    padding: 4px 8px;
    font-size: 11px;
  }

  .base-button--medium {
    padding: 8px 10px;
    font-size: 13px;
  }

  .base-button--large {
    padding: 12px 16px;
    font-size: 14px;
  }
</style>
