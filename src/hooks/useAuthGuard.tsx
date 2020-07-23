import Taro, { useContext } from '@tarojs/taro'
import { AppStore, AuthCallback } from '../store/AppStore'
import { hideLoading, showLoading } from '../utils'

export const useAuthGuard = () => {
  const { checkAuth, setAuthCallback } = useContext(AppStore)

  async function withAuth(callback: AuthCallback['func']) {
    try {
      showLoading()
      const user = await checkAuth()
      if (user && !user.tel) {
        setAuthCallback({
          authType: 'phoneNumber',
          func: callback
        })
        Taro.navigateTo({
          url: '/pages/auth/index'
        })
      } else {
        setAuthCallback(null)
        callback()
      }
    } catch (e) {
      console.error('[useAuthGuard] error', e)
      if (e.code === 1001) {
        setAuthCallback({
          authType: 'useInfo',
          func: callback
        })
        Taro.navigateTo({
          url: '/pages/auth/index'
        })
      }
    } finally {
      hideLoading()
    }
  }

  return {
    withAuth
  }
}
