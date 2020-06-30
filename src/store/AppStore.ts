import Taro, { createContext } from '@tarojs/taro'
import { action, observable } from 'mobx'

class App {
  @observable platform: 'ios' | 'android' = 'android'
  @observable loading = true
  @observable tabIndex = 0

  constructor() {
    const res = Taro.getSystemInfoSync()
    this.platform = res.platform as any
    console.log('platform', res.platform)
  }

  @action.bound
  setTab(index: number) {
    this.tabIndex = index
  }
}

export const AppStore = createContext(new App())
