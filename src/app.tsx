import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Index from './pages/index'

import './app.scss'

const store = {}

class App extends Component {
  config: Config = {
    pages: [
      'pages/user-order/index',
      'pages/user/index',
      'pages/user-change-phone/index',
      'pages/baby-profile/index',
      'pages/user-content/index',
      'pages/buy-card/index',
      'pages/buy-card/result',

      'pages/subject/index',
      'pages/subject-detail/index',

      'pages/home/index',
      'pages/order/index',
      'pages/user-bind-phone/index',
      'pages/index/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#1989ff',
      navigationBarTitleText: '共享图书',
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
