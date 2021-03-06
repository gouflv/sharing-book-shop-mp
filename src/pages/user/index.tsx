import './index.scss'
import Taro, { FC, useContext, useDidShow, useState } from '@tarojs/taro'
import { Button, Image, View } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import { useHeaderSize } from '../../hooks/useHeaderSize'
import { Banner } from './Banner'
import { UserRuleModal } from './UserRuleModal'
import { AppStore } from '../../store/AppStore'
import { observer } from '@tarojs/mobx'
import { encodePhone, hideLoading, showLoading, showToast } from '../../utils'
import { defaultErrorHandler, POST } from '../../utils/ajax'
import { Card } from './CardItem'
import BasicPageView from '../../components/BasicPageWrapper'
import { MessageService } from '../../store/MessageService'
import { NotificationService } from '../../store/NotificationService'
import dayjs from 'dayjs'

const Page: FC = () => {
  const { user, fetchUserInfo } = useContext(AppStore)
  const { showConfirm } = useContext(MessageService)
  const { checkNotify } = useContext(NotificationService)
  const { statusHeight, headerHeight } = useHeaderSize()

  useDidShow(() => {
    async function init() {
      !user && showLoading()
      await fetchUserInfo()
      await fetchCards()
      hideLoading()
    }
    init()
  })

  const [cardList, setCardList] = useState<any[]>()
  async function fetchCards() {
    const data = await POST('wxMember/getMemberCard')
    setCardList(data)
    // setCardList([])
  }
  async function onBuyCard(card: Card) {
    try {
      showLoading()
      const orderData = await POST('wxMember/buyActivityConfigCard', {
        data: { memLeId: card.memLeId }
      })
      if (orderData) {
        showLoading()
        Taro.requestPayment({
          ...orderData,
          success: res => {
            showToast({ title: '购买成功', icon: 'success' })
            fetchCards()
          },
          fail: res => {
            showToast({ title: '支付失败' })
          },
          complete: () => {
            hideLoading()
          }
        })
      } else {
        hideLoading()
        showToast({ title: '购买成功', icon: 'success' })
        fetchCards()
      }
    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      hideLoading()
    }
  }
  async function onActiveCard(card: Card) {
    try {
      await showConfirm({ content: '确认激活会员卡' })
      showLoading()
      await POST('wxMember/activeMemberCard', {
        data: { memLeId: card.memLeId }
      })
      showToast({ title: '激活成功', icon: 'success' })
      fetchCards()
    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      hideLoading()
    }
  }

  // notification
  useDidShow(() => {
    setTimeout(() => {
      checkNotify()
    }, 500)
  })

  // UserRuleModal
  const [userRuleVisible, setUserRuleVisible] = useState(false)

  return (
    <BasicPageView>
      <View className='page-user'>
        <PageHeaderWrapper
          title={'会员中心'}
          hideBackArrow
          bg={require('../../assets/vip_top_bg_xl.jpg')}
          bgHeight={'690rpx'}
          bgOffset={690 / 2 - statusHeight - headerHeight - 550 / 2 + 10}
        >
          <PageHeaderExt
            absolute
            height={'550rpx'}
            bg={require('../../assets/vip_top_bg_xl.jpg')}
            bgHeight={'690rpx'}
            bgOffset={690 / 2 - statusHeight - headerHeight - 550 / 2 + 10}
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
                      onClick={
                        () => {}
                        // Taro.navigateTo({
                        //   url: '/pages-user/user-change-phone/index'
                        // })
                      }
                    >
                      {encodePhone(user.tel)}
                      {/*<View className='unbind-phone'>解绑</View>*/}
                    </View>
                    <View className='desc desc2'>
                      <View>{dayjs().format('YYYY/MM/DD')}</View>
                      <View>当前书位权益: {user.totalPositionNum}</View>
                    </View>
                  </View>
                </View>
              )}
              <View className='action' onClick={() => setUserRuleVisible(true)}>
                收费规则
              </View>
            </View>
          </View>

          <Banner
            cardList={cardList}
            onBuyCard={onBuyCard}
            onActiveCard={onActiveCard}
          />
        </PageHeaderWrapper>

        <View className='page-space-wing'>
          <View
            className='baby-info'
            onClick={() =>
              Taro.navigateTo({ url: '/pages-user/baby-profile/index' })
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
                Taro.navigateTo({ url: '/pages-user/buy-card/index' })
              }
            >
              <Image
                src={require('../../assets/ico_vip_pre@2x.png')}
                mode={'aspectFit'}
              />
              <View className='content'>购买会员</View>
              <Image
                className='link'
                src={require('../../assets/vip_ico_arrow@2x.png')}
              />
            </View>
            {user && user.posFlag && (
              <View
                className='item'
                onClick={() =>
                  Taro.navigateTo({ url: '/pages-user/buy-card/index?gift=1' })
                }
              >
                <Image
                  src={require('../../assets/vip_ico_Merchant@2x.png')}
                  mode={'aspectFit'}
                />
                <View className='content'>商户购卡</View>
                <Image
                  className='link'
                  src={require('../../assets/vip_ico_arrow@2x.png')}
                />
              </View>
            )}
            <View
              className='item'
              onClick={() =>
                Taro.navigateTo({ url: '/pages-user/user-content/index' })
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
                Taro.navigateTo({ url: '/pages-user/user-order/index' })
              }
            >
              <Image
                src={require('../../assets/vip_ico_borrow@2x.png')}
                mode={'aspectFit'}
              />
              <View className='content'>账单记录</View>
              <Image
                className='link'
                src={require('../../assets/vip_ico_arrow@2x.png')}
              />
            </View>
            <View
              className='item'
              onClick={() =>
                Taro.navigateTo({ url: '/pages-user/user-borrow-log/index' })
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
                Taro.navigateTo({ url: '/pages-user/user-rules/index' })
              }
            >
              <Image
                src={require('../../assets/vip_ico_borrow@2x.png')}
                mode={'aspectFit'}
              />
              <View className='content'>借阅规则</View>
              <Image
                className='link'
                src={require('../../assets/vip_ico_arrow@2x.png')}
              />
            </View>
            <View
              className='item'
              onClick={() =>
                Taro.navigateTo({ url: '/pages-user/user-message/index' })
              }
            >
              <Image
                src={require('../../assets/vip_ico_message@2x.png')}
                mode={'aspectFit'}
              />
              <View className='content'>
                我的消息
                {user && user.notReadNum && (
                  <View className='badge'>
                    {user.notReadNum > 99 ? '99+' : user.notReadNum}
                  </View>
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
                Taro.navigateTo({ url: '/pages-user/user-payment-log/index' })
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
              onClick={() =>
                Taro.navigateTo({ url: '/pages-user/feed-back/index' })
              }
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

        <UserRuleModal
          visible={userRuleVisible}
          onClose={() => setUserRuleVisible(false)}
        />

        <Button openType={'contact'} className={'contact-btn'}>
          <Image src={'../../assets/home_icon_surve.png'} />
        </Button>
      </View>
    </BasicPageView>
  )
}

export default observer(Page)
