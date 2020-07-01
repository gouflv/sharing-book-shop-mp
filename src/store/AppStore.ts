import Taro, { createContext } from '@tarojs/taro'
import { action, observable } from 'mobx'

class App {
  @observable platform: 'ios' | 'android' = 'android'
  @observable loading = true
  @observable tabBarIndex = 0

  constructor() {
    const res = Taro.getSystemInfoSync()
    this.platform = res.platform as any
    console.log('platform', res.platform)
  }

  @action.bound
  setTabIndex(index: number) {
    this.tabBarIndex = index
  }
}

export const AppStore = createContext(new App())
