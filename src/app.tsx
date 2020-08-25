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
      'pages/home/index',
      'pages/order/index',
      'pages/subject/index',
      'pages/user/index',

      'pages/auth/index',
      'pages/shelf-books/index',
      'pages/user-bind-phone/index'
    ],
    subPackages: [
      {
        root: 'pages-subject',
        pages: ['subject-search/index', 'subject-detail/index']
      },
      {
        root: 'pages-user',
        pages: [
          'user-change-phone/index',
          'buy-card/index',
          'buy-card/result',
          'baby-profile/index',
          'user-content/index',
          'user-order/index',
          'user-order/detail',
          'user-borrow-log/index',
          'user-message/index',
          'user-payment-log/index',
          'feed-back/index',
          'user-rules/index'
        ]
      }
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
    console.log('[getSystemInfoSync]', sys)
    await app.refreshToken()
    await app.checkAuth()

    const { scene, query } = Taro.getApp().$router.params
    console.log('[componentDidShow]', { scene, query })
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
