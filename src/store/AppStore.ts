import Taro, { createContext } from '@tarojs/taro'
import { action, observable } from 'mobx'
import { defaultErrorHandler, POST } from '../utils/ajax'
import { hideLoading, showLoading, showToast } from '../utils'

class App {
  @observable token = ''
  @observable platform: 'ios' | 'android' = 'android'
  @observable loading = true
  @observable tabBarIndex = 0

  constructor() {
    const res = Taro.getSystemInfoSync()
    this.platform = res.platform as any
    console.log('platform', res.platform)
  }

  @action.bound
  setToken(val: string) {
    this.token = val
  }

  @action.bound
  setTabIndex(index: number) {
    this.tabBarIndex = index
  }

  @action.bound
  async loginWithData({ encryptedData, iv }) {
    showLoading()
    try {
      const { code, errMsg } = await Taro.login()
      if (!code) {
        showToast({ title: errMsg })
        return
      }
      const res = await POST('auth/wxApplet', {
        data: { encryptedData, iv, code }
      })
      this.setToken(res.token)
    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      hideLoading()
    }
  }
}

export const app = new App()

export const AppStore = createContext(app)
