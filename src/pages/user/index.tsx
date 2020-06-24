import './index.scss'
import Taro, { FC } from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import { useHeaderSize } from '../../hooks/useHeaderSize'
import { Banner } from './Banner'
import { UserActiveModal } from '../../components/Modals/UserActiveModal'
import { UserRuleModal } from '../../components/Modals/UserRuleModal'

const Page: FC = () => {
  const { statusHeight, headerHeight } = useHeaderSize()

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
            <View className='user-info'>
              <Image className='avatar' src={'http://placehold.it/80x80'} />
              <View className='content'>
                <View className='title'>Lorem ipsum.</View>
                <View className='desc'>
                  138 0000 9999
                  <View
                    className='unbind-phone'
                    onClick={() =>
                      Taro.navigateTo({ url: '/pages/user-change-phone/index' })
                    }
                  >
                    解绑
                  </View>
                </View>
              </View>
            </View>
            <View className='action'>收费规则</View>
          </View>
        </View>

        <Banner />

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
                <View className='badge'>1</View>
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

      <UserRuleModal />
      <UserActiveModal />
    </View>
  )
}

export default Page
