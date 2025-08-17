import { CHROME_STORAGE_KEYS } from './constants/chrome.storage'
import { chromeStorage } from './utils/chrome'

export const getAPIKey = async () => {
  const apiKey = await chromeStorage.get<string>(CHROME_STORAGE_KEYS.API_KEY)
  if (!apiKey) {
    throw new Error('No API key found')
  }
  return apiKey
}
