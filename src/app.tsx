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
      'pages/user/index',
      'pages/home/index',
      'pages/subject/index',
      'pages/subject-detail/index',
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
      color: '#999999',
      selectedColor: '#1989ff',
      list: [
        {
          text: '首页',
          pagePath: 'pages/home/index',
          iconPath: './assets/ico_home@2x.png',
          selectedIconPath: './assets/ico_home_pre@2x.png'
        },
        {
          text: '借阅',
          pagePath: 'pages/order/index',
          iconPath: './assets/ico_borrow@2x.png',
          selectedIconPath: './assets/ico_borrow_pre@2x.png'
        },
        {
          text: '课程',
          pagePath: 'pages/subject/index',
          iconPath: './assets/ico_course@2x.png',
          selectedIconPath: './assets/ico_course_pre@2x.png'
        },
        {
          text: '会员',
          pagePath: 'pages/user/index',
          iconPath: './assets/ico_vip@2x.png',
          selectedIconPath: './assets/ico_vip_pre@2x.png'
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
