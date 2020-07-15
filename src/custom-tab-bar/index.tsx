import './index.scss'
import Taro, { FC, useContext } from '@tarojs/taro'
import { CoverImage, CoverView, View } from '@tarojs/components'
import classNames from 'classnames'
import { observer } from '@tarojs/mobx'
import { AppStore } from '../store/AppStore'
import { useAuthGuard } from '../hooks/useAuthGuard'

type TabBar = {
  text: string
  pagePath: string
  width: number
  height: number
  iconPath: string
  selectedIconPath: string
}

const tabList: TabBar[] = [
  {
    text: '首页',
    pagePath: 'pages/home/index',
    width: 37,
    height: 33,
    iconPath: require('../assets/ico_home@2x.png'),
    selectedIconPath: require('../assets/ico_home_pre@2x.png')
  },
  {
    text: '借阅',
    pagePath: 'pages/order/index',
    width: 28,
    height: 40,
    iconPath: require('../assets/ico_borrow@2x.png'),
    selectedIconPath: require('../assets/ico_borrow_pre@2x.png')
  },
  {
    text: '课程',
    pagePath: 'pages/subject/index',
    width: 34,
    height: 36,
    iconPath: require('../assets/ico_course@2x.png'),
    selectedIconPath: require('../assets/ico_course_pre@2x.png')
  },
  {
    text: '会员',
    pagePath: 'pages/user/index',
    width: 38,
    height: 32,
    iconPath: require('../assets/ico_vip@2x.png'),
    selectedIconPath: require('../assets/ico_vip_pre@2x.png')
  }
]

const Tabbar: FC = () => {
  const { tabBarIndex, setTabIndex } = useContext(AppStore)
  const { withAuth } = useAuthGuard()

  function onClick(item: TabBar, index: number) {
    withAuth(() => {
      Taro.switchTab({ url: `/${item.pagePath}` })
      setTabIndex(index)
    })
  }

  return (
    <CoverView className='tabbar'>
      {tabList.map((tab, i) => (
        <CoverView
          className={classNames('item', {
            active: i === tabBarIndex
          })}
          key={i}
          onClick={() => onClick(tab, i)}
        >
          <CoverImage
            src={i === tabBarIndex ? tab.selectedIconPath : tab.iconPath}
            style={{
              width: `${tab.width}rpx`,
              height: `${tab.height}rpx`
            }}
          />
          <CoverView className='text'>{tab.text}</CoverView>
        </CoverView>
      ))}
    </CoverView>
  )
}

export default observer(Tabbar)
