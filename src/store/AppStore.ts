import Taro, { createContext } from '@tarojs/taro'
import { action, observable } from 'mobx'
import { defaultErrorHandler, POST } from '../utils/ajax'
import { hideLoading, showLoading } from '../utils'

export interface AuthCallback {
  authType: 'useInfo' | 'phoneNumber'
  func: (params?: { redirect: boolean }) => void
}

interface User {
  nickName: string
  memberImage: string
  tel: string
  notReadNum: number
  posFlag: boolean
  totalPositionNum: number
}

class App {
  @observable loading = true
  @observable tabBarIndex = 0

  @observable token = ''
  @observable user: User | null = null

  @observable authCallback: AuthCallback | null = null

  constructor() {
    console.log('storage', Taro.getStorageInfoSync())
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
      const res = await POST('auth/wxApplet', {
        data: { encryptedData, iv, code }
      })
      this.setToken(res.token)
      this.setOpenId(res.openId)
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
    this.user = {
      ...data,
      nickName: decodeURIComponent(data.nickName)
    }
    return this.user
  }

  @action.bound
  async checkAuth() {
    if (!this.token) {
      throw { code: 1001, message: '[checkAuth] no token' }
    }
    if (!this.user) {
      const data = await POST('wxMember/getMemberInfo', {
        preventAuthErrorHandler: true
      })
      this.user = {
        ...data,
        nickName: decodeURIComponent(data.nickName)
      }
    }
    return this.user
  }

  @action.bound
  setAuthCallback(callback: AuthCallback | null) {
    this.authCallback = callback
  }

  @action.bound
  setOpenId(val: string) {
    Taro.setStorageSync('open_id', val)
  }

  @action.bound
  async refreshToken() {
    const openId = Taro.getStorageSync('open_id')
    if (!openId) {
      return
    }
    try {
      const res = await POST('auth/wxAppletByOpenId', {
        data: { openId },
        withoutToken: true
      })
      this.setToken(res.token)
    } catch (e) {
      console.error(e)
    }
  }

  // token无效处理
  @action.bound
  async refreshTokenAndRelaunch() {
    const openId = Taro.getStorageSync('open_id')
    if (!openId) {
      Taro.reLaunch({ url: '/pages/home/index' })
      return
    }
    showLoading()
    try {
      const res = await POST('auth/wxAppletByOpenId', {
        data: { openId },
        withoutToken: true
      })
      this.setToken(res.token)
    } catch (e) {
      console.error(e)
      this.setToken('')
      this.setOpenId('')
    } finally {
      Taro.reLaunch({ url: '/pages/home/index' })
    }
  }

  @action.bound
  async bindUserDevice(eqCode: string) {
    await POST('wxMember/setMemberEqCode', {
      data: { eqCode }
    })
  }
}

export const app = new App()

export const AppStore = createContext(app)
