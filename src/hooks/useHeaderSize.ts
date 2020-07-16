import Taro, { useEffect, useState } from '@tarojs/taro'

export const useHeaderSize = () => {
  const [statusHeight, setStatusHeight] = useState(20)
  const [headerHeight, setHeaderHeight] = useState(44)

  useEffect(() => {
    const res = Taro.getSystemInfoSync()
    setStatusHeight(res.statusBarHeight)
    console.log('getSystemInfoSync', res)
    console.log('statusBarHeight', res.statusBarHeight)

    const menuBtn = Taro.getMenuButtonBoundingClientRect()
    setHeaderHeight(menuBtn.height + 6 * 2)
    console.log('menuBtn', menuBtn)
  }, [])

  return {
    statusHeight,
    headerHeight
  }
}
