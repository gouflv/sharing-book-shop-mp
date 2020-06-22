import { createContext } from '@tarojs/taro'
import { action, observable } from 'mobx'

class App {
  @observable loading = true
  @observable tabIndex = 0

  @action.bound
  setTab(index: number) {
    this.tabIndex = index
  }
}

export const AppStore = createContext(new App())
