import Taro, { createContext } from '@tarojs/taro'
import { action, observable } from 'mobx'
import { defaultErrorHandler, POST } from '../utils/ajax'
import { hideLoading, showLoading } from '../utils'

class App {
  @observable platform: 'ios' | 'android' = 'android'
  @observable loading = true
  @observable tabBarIndex = 0

  @observable token = ''
  @observable user: { nickName; memberImage; tel } | null = null

  constructor() {
    const res = Taro.getSystemInfoSync()
    this.platform = res.platform as any
    console.log('platform', res.platform)

    this.token = Taro.getStorageSync('token') || ''
  }

  @action.bound
  setToken(val: string) {
    this.token = val
    Taro.setStorageSync('token', val)
  }

  @action.bound
  setTabIndex(index: number) {
    this.tabBarIndex = index
  }

  @action.bound
  async authLogin({ encryptedData, iv, code }) {
    showLoading()
    try {
      // const { code, errMsg } = await Taro.login()
      // if (!code) {
      //   showToast({ title: errMsg })
      //   return
      // }
      const res = await POST('auth/wxApplet', {
        data: { encryptedData, iv, code }
      })
      this.setToken(res.token)
    } catch (e) {
      defaultErrorHandler(e)
      throw e
    } finally {
      hideLoading()
    }
  }

  @action.bound
  async authLoginWithPhone({ encryptedData, iv, code }) {
    showLoading()
    try {
      // const { code, errMsg } = await Taro.login()
      // if (!code) {
      //   showToast({ title: errMsg })
      //   return
      // }
      const res = await POST('common/phoneBindingWx', {
        data: { encryptedData, iv, code }
      })
      // TODO refresh token
      // this.setToken(res.token)
    } catch (e) {
      defaultErrorHandler(e)
      throw e
    } finally {
      hideLoading()
    }
  }

  @action.bound
  async fetchUserInfo() {
    const data = await POST('wxMember/getMemberInfo')
    this.user = { ...data, nickName: decodeURIComponent(data.nickName) }
  }
}

export const app = new App()

export const AppStore = createContext(app)
