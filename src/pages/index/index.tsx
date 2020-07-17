import Taro, { useContext, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AppStore } from '../../store/AppStore'

export default () => {
  const { refreshToken } = useContext(AppStore)

  useEffect(() => {
    // Taro.redirectTo({ url: '/pages/buy-card/index' })
    // Taro.redirectTo({ url: '/pages/auth/index?hideBack=1' })
    // Taro.redirectTo({ url: '/pages/user-bind-phone/index' })
    // Taro.redirectTo({ url: '/pages/feed-back/index' })
    // Taro.redirectTo({ url: '/pages/baby-profile/index' })
    // Taro.redirectTo({ url: '/pages/user-order/index' })
    // Taro.redirectTo({ url: '/pages/user-message/index' })
    // Taro.redirectTo({
    //   url: '/pages/subject-detail/index?id=202007171018176257'
    // })

    Taro.switchTab({ url: '/pages/home/index' })
    // Taro.switchTab({ url: '/pages/user/index' })
    // Taro.switchTab({ url: '/pages/subject/index' })
  }, [])

  return <View />
}
