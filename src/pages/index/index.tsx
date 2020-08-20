import Taro, { useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useAuthGuard } from '../../hooks/useAuthGuard'
import { isDev } from '../../config'
import useDidShow = Taro.useDidShow

export default () => {
  const { withAuth } = useAuthGuard()

  useDidShow(() => {
    const { scene, query } = Taro.getApp().$router.params
    console.log('[App useDidShow] scene', scene, query)

    if (scene === 1047 && query.id) {
      withAuth(() => {
        Taro.redirectTo({
          url: `/pages/shelf-books/index?id=${query.id}&eqCode=${query.scene}&from=weChatScan`
        })
      })
      return
    }

    if (query.landPage) {
      withAuth(() => {
        Taro.redirectTo({
          url: decodeURIComponent(query.landPage)
        })
      })
      return
    }

    redirect()
  })

  function redirect() {
    if (!isDev) {
      Taro.switchTab({ url: '/pages/home/index' })
      return
    }
    // Taro.redirectTo({ url: '/pages/subject-search/index' })
    // Taro.redirectTo({ url: '/pages/user-payment-log/index' })
    // Taro.redirectTo({ url: '/pages/buy-card/index' })
    // Taro.redirectTo({ url: '/pages/buy-card/index?gift=1' })
    // Taro.redirectTo({ url: '/pages/buy-card/result' })
    // Taro.redirectTo({ url: '/pages/auth/index?hideBack=1' })
    // Taro.redirectTo({ url: '/pages/user-bind-phone/index' })
    // Taro.redirectTo({ url: '/pages/feed-back/index' })
    // Taro.redirectTo({ url: '/pages/baby-profile/index' })
    // Taro.redirectTo({ url: '/pages/user-order/index' })
    // Taro.redirectTo({ url: '/pages/user-message/index' })
    // Taro.redirectTo({ url: '/pages/user-rules/index' })
    // Taro.redirectTo({
    //   url: '/pages/subject-detail/index?id=202007171018176257'
    // })
    Taro.redirectTo({
      url: '/pages/subject-detail/index?id=202008141010362137'
    })

    Taro.switchTab({ url: '/pages/home/index' })
    // Taro.switchTab({ url: '/pages/order/index' })
    // Taro.switchTab({ url: '/pages/subject/index' })
    // Taro.switchTab({ url: '/pages/user/index' })
  }

  return <View />
}
