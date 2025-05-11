// storage.ts
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StorageValue = Record<string, any>

export const chromeStorage = {
  set: (data: StorageValue, callback?: () => void): Promise<void> => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set(data, () => {
        if (chrome.runtime.lastError) return reject(chrome.runtime.lastError)
        resolve()
        callback?.()
      })
    })
  },

  get: <T>(keys?: string[] | string | null, callback?: (result) => void): Promise<T> => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(keys, items => {
        if (chrome.runtime.lastError) return reject(chrome.runtime.lastError)
        if (items[keys]) {
          resolve(items[keys] as T)
        } else {
          return reject('No items found')
        }
        callback?.(items)
      })
    })
  },

  getAll: (callback?: (results: Record<string, T>) => void): Promise<Record<string, T>> => {
    return new Promise(resolve => {
      chrome.storage.local.get(null, items => {
        callback?.(items)
        resolve(items)
      })
    })
  },

  remove: (keys: string | string[], callback?: () => void): Promise<void> => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.remove(keys, () => {
        if (chrome.runtime.lastError) return reject(chrome.runtime.lastError)
        resolve()
        callback?.()
      })
    })
  },

  clear: (callback?: () => void): Promise<void> => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.clear(() => {
        if (chrome.runtime.lastError) return reject(chrome.runtime.lastError)
        resolve()
        callback?.()
      })
    })
  },

  getBytesInUse: (keys?: string | string[] | null): Promise<number> => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.getBytesInUse(keys, bytesInUse => {
        if (chrome.runtime.lastError) return reject(chrome.runtime.lastError)
        resolve(bytesInUse)
      })
    })
  },

  listen: (
    callback: (changes: { [key: string]: chrome.storage.StorageChange }, areaName: string) => void
  ): void => {
    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === 'local') {
        callback(changes, areaName)
      }
    })
  }
}
