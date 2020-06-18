import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Index from './pages/index'

import counterStore from './store/counter'

import './app.scss'

const store = {
  counterStore
}

class App extends Component {
  config: Config = {
    pages: [
      'pages/subject-detail/index',
      'pages/order/index',
      'pages/home/index',
      'pages/subject/index',
      'pages/user-bind-phone/index',
      'pages/index/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#1989ff',
      navigationBarTitleText: '共享图书',
      navigationBarTextStyle: 'white',
      navigationStyle: 'custom'
    }
  }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
