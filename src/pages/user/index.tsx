import './index.scss'
import Taro, { FC, useContext, useDidShow, useState } from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import { useHeaderSize } from '../../hooks/useHeaderSize'
import { Banner } from './Banner'
import { UserActiveModal } from '../../components/Modals/UserActiveModal'
import { UserRuleModal } from './UserRuleModal'
import { AppStore } from '../../store/AppStore'
import { observer } from '@tarojs/mobx'
import { hideLoading, showLoading } from '../../utils'
import { POST } from '../../utils/ajax'
import { useNotification } from '../user-message/useNotification'

const Page: FC = () => {
  const { user, fetchUserInfo } = useContext(AppStore)
  const { statusHeight, headerHeight } = useHeaderSize()

  useDidShow(() => {
    async function init() {
      showLoading()
      !user && (await fetchUserInfo())
      await fetchCards()
      hideLoading()
    }
    init()
  })

  const [cardList, setCardList] = useState<any[]>([])
  async function fetchCards() {
    const data = await POST('wxMember/getMemberCard')
    setCardList(data)
  }

  // notification
  const { items, fetchList, fetchActiveRecord } = useNotification()
  useDidShow(() => {
    setTimeout(() => {
      fetchList()
      const active = fetchActiveRecord()
      console.log('active', active)
    }, 500)
  })

  // UserRuleModal
  const [userRuleVisible, setUserRuleVisible] = useState(false)

  return (
    <View className='page-user'>
      <PageHeaderWrapper
        title={'会员中心'}
        hideBackArrow
        bg={require('../../assets/vip_top_bg.jpg')}
        bgHeight={'650rpx'}
      >
        <PageHeaderExt
          absolute
          height={`${650 / 2 - statusHeight - headerHeight}px`}
          bg={require('../../assets/vip_top_bg.jpg')}
          bgHeight={'650rpx'}
        />

        <View className='page-space-wing'>
          <View className='user-header'>
            {user && (
              <View className='user-info'>
                <Image
                  className='avatar'
                  src={user.memberImage || 'http://placehold.it/80x80'}
                />
                <View className='content'>
                  <View className='title'>{user.nickName}</View>
                  <View
                    className='desc'
                    onClick={() =>
                      Taro.navigateTo({
                        url: '/pages/user-change-phone/index'
                      })
                    }
                  >
                    {user.tel}
                    <View className='unbind-phone'>解绑</View>
                  </View>
                </View>
              </View>
            )}
            <View className='action' onClick={() => setUserRuleVisible(true)}>
              收费规则
            </View>
          </View>
        </View>

        <Banner cardList={cardList} />

        <View className='page-space-wing'>
          <View
            className='baby-info'
            onClick={() =>
              Taro.navigateTo({ url: '/pages/baby-profile/index' })
            }
          >
            <Image
              className='bg'
              src={require('../../assets/vip_baby_bg.png')}
              mode={'aspectFill'}
            />
            <View className='title'>我的宝宝</View>
            <View className='desc text-second'>完善宝宝基本信息</View>
          </View>

          <View className='menu'>
            <View
              className='item'
              onClick={() =>
                Taro.navigateTo({ url: '/pages/user-content/index' })
              }
            >
              <Image
                src={require('../../assets/vip_ico_works@2x.png')}
                mode={'aspectFit'}
              />
              <View className='content'>我的作品</View>
              <Image
                className='link'
                src={require('../../assets/vip_ico_arrow@2x.png')}
              />
            </View>
            <View
              className='item'
              onClick={() =>
                Taro.navigateTo({ url: '/pages/user-order/index' })
              }
            >
              <Image
                src={require('../../assets/vip_ico_borrow@2x.png')}
                mode={'aspectFit'}
              />
              <View className='content'>借阅记录</View>
              <Image
                className='link'
                src={require('../../assets/vip_ico_arrow@2x.png')}
              />
            </View>
            <View
              className='item'
              onClick={() =>
                Taro.navigateTo({ url: '/pages/user-message/index' })
              }
            >
              <Image
                src={require('../../assets/vip_ico_message@2x.png')}
                mode={'aspectFit'}
              />
              <View className='content'>
                我的消息
                {items && items.length && (
                  <View className='badge'>{items.length}</View>
                )}
              </View>
              <Image
                className='link'
                src={require('../../assets/vip_ico_arrow@2x.png')}
              />
            </View>
            <View
              className='item'
              onClick={() =>
                Taro.navigateTo({ url: '/pages/user-payment-log/index' })
              }
            >
              <Image
                src={require('../../assets/vip_ico_pay@2x.png')}
                mode={'aspectFit'}
              />
              <View className='content'>支付记录</View>
              <Image
                className='link'
                src={require('../../assets/vip_ico_arrow@2x.png')}
              />
            </View>
            <View
              className='item'
              onClick={() => Taro.navigateTo({ url: '/pages/feed-back/index' })}
            >
              <Image
                src={require('../../assets/vip_ico_sug@2x.png')}
                mode={'aspectFit'}
              />
              <View className='content'>意见反馈</View>
              <Image
                className='link'
                src={require('../../assets/vip_ico_arrow@2x.png')}
              />
            </View>
          </View>
        </View>
      </PageHeaderWrapper>

      <UserRuleModal
        visible={userRuleVisible}
        onClose={() => setUserRuleVisible(false)}
      />

      <UserActiveModal />
    </View>
  )
}

export default observer(Page)
