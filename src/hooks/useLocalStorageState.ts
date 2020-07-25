import Taro, { useEffect, useState } from '@tarojs/taro'

export function useLocalStorageState<T>(
  key,
  defaultValue: T
): [T | undefined, (val: T) => void] {
  const [value, setValue] = useState<T>(() => {
    const ls = Taro.getStorageSync(key)
    return ls || defaultValue
  })

  useEffect(() => {
    Taro.setStorageSync(key, value)
  }, [value])

  return [value, setValue]
}
