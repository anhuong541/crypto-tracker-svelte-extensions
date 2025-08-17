<script lang="ts">
  interface Props {
    value: string
    placeholder?: string
    type?: 'text' | 'password' | 'email'
    required?: boolean
    disabled?: boolean
    class?: string
  }

  let {
    value = $bindable(),
    placeholder = '',
    type = 'text',
    required = false,
    disabled = false,
    class: className = '',
  }: Props = $props()
</script>

<input
  bind:value
  {placeholder}
  {type}
  {required}
  {disabled}
  class={`base-input ${className}`}
/>

<style>
  .base-input {
    flex: 1;
    padding: 8px 10px;
    border: 1px solid #d1d9e6;
    border-radius: 4px;
    font-size: 13px;
    outline: none;
    transition: border-color 0.2s;
    width: 100%;
    box-sizing: border-box;
  }

  .base-input:focus {
    border-color: #3861fb;
  }

  .base-input:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
  }
</style>
