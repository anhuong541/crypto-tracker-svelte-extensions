/**
 * Format a number as currency with custom decimal places based on size.
 *
 * @param {number} value - The number to format.
 * @param {Object} [options] - Optional settings.
 * @param {string} [options.currencySymbol=''] - Currency symbol to prepend.
 * @param {string} [options.decimalSeparator='.'] - Decimal separator character.
 * @param {string} [options.thousandSeparator=','] - Thousand separator character.
 * @returns {string} - Formatted currency string.
 */
export function formatCurrency(
  value: number,
  { currencySymbol = '', decimalSeparator = '.', thousandSeparator = ',' } = {},
) {
  if (typeof value !== 'number' || isNaN(value)) {
    return ''
  }

  const absValue = Math.abs(value)
  const sign = value < 0 ? '-' : ''

  // Determine decimals based on value size
  let decimals
  if (absValue >= 1_000_000) {
    decimals = 2 // large number
  } else if (absValue > 0 && absValue < 1) {
    decimals = 4 // small number
  } else {
    decimals = 2 // medium number
  }

  // Format number with fixed decimals
  const fixedNumber = absValue.toFixed(decimals)

  // Split integer and decimal parts
  const [integerPart, decimalPart] = fixedNumber.split('.')

  // Add thousand separators to integer part
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator)

  // Rebuild the number with decimal separator
  const formattedNumber = decimalPart
    ? formattedIntegerPart + decimalSeparator + decimalPart
    : formattedIntegerPart

  return `${sign}${currencySymbol}${formattedNumber}`
}

export function isValidCMCKey(apiKey: string): boolean {
  const hex32 = /^[a-fA-F0-9]{32}$/
  const uuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

  return hex32.test(apiKey) || uuid.test(apiKey)
}
