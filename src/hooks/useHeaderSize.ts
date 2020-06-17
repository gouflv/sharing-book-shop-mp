import Taro, { useEffect, useState } from '@tarojs/taro'

export const useHeaderSize = () => {
  const [statusHeight, setStatusHeight] = useState(44)
  const [headerHeight, setHeaderHeight] = useState(44)

  useEffect(() => {
    const res = Taro.getSystemInfoSync()
    setStatusHeight(res.statusBarHeight)

    const menuBtn = Taro.getMenuButtonBoundingClientRect()
    setHeaderHeight(menuBtn.height + 6 * 2)
  }, [])

  return {
    statusHeight,
    headerHeight
  }
}
