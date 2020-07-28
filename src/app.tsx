import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Index from './pages/index'
import { APP_NAME } from './config'
import { app } from './store/AppStore'

import './app.scss'

const store = {}

class App extends Component {
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/shelf-books/index',
      'pages/home/index',
      'pages/order/index',

      'pages/subject-search/index',
      'pages/subject/index',
      'pages/subject-detail/index',

      'pages/user/index',
      'pages/user-change-phone/index',
      'pages/buy-card/index',
      'pages/buy-card/result',
      'pages/baby-profile/index',
      'pages/user-content/index',
      'pages/user-order/index',
      'pages/user-order/detail',
      'pages/user-message/index',
      'pages/user-payment-log/index',
      'pages/feed-back/index',

      'pages/auth/index',
      'pages/user-bind-phone/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#1989ff',
      navigationBarTitleText: APP_NAME,
      navigationBarTextStyle: 'white',
      navigationStyle: 'custom'
    },
    tabBar: {
      custom: true,
      list: [
        {
          text: '首页',
          pagePath: 'pages/home/index'
        },
        {
          text: '借阅',
          pagePath: 'pages/order/index'
        },
        {
          text: '课程',
          pagePath: 'pages/subject/index'
        },
        {
          text: '会员',
          pagePath: 'pages/user/index'
        }
      ]
    }
  }

  componentDidMount() {}

  async componentDidShow() {
    const sys = Taro.getSystemInfoSync()
    console.log(sys)
    await app.refreshToken()
    await app.checkAuth()
  }

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
