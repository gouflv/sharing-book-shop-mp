import Taro, { useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'

export default () => {
  useEffect(() => {
    // Taro.redirectTo({ url: '/pages/auth/index?hideBack=1' })
    // Taro.redirectTo({ url: '/pages/user-bind-phone/index' })
    Taro.redirectTo({ url: '/pages/feed-back/index' })

    // Taro.switchTab({ url: '/pages/home/index' })
  }, [])

  return <View />
}
