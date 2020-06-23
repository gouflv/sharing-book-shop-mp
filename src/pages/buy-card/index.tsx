import './index.scss'
import Taro, { FC } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { PageHeaderExt } from '../../components/PageHeaderExt'

const Page: FC = () => {
  async function onSubmit() {
    //TODO showConfirm
    //会员卡有效时间30天，书位权益1个，购卡后自动激活。
  }

  return (
    <View className='page-buy-card'>
      <PageHeaderWrapper
        title={'购买会员卡'}
        bg={require('../../assets/vip_top_bg2.jpg')}
        bgHeight={'490rpx'}
      >
        <PageHeaderExt
          absolute
          height={'140rpx'}
          bg={require('../../assets/vip_top_bg2.jpg')}
          bgHeight={'490rpx'}
        />

        <View className='page-space-around'>
          <View className='box'>
            <View className='cards'>
              <View className='card active'>
                <View className='label'>月卡</View>
                <View className='value'>
                  <View className='yuan'>¥</View> 18
                </View>
                <View className='desc text-second'>原价18</View>
              </View>
              <View className='card'>
                <View className='label'>月卡</View>
                <View className='value'>
                  <View className='yuan'>¥</View> 18
                </View>
                <View className='desc text-second'>原价18</View>
              </View>
              <View className='card'>
                <View className='label'>月卡</View>
                <View className='value'>
                  <View className='yuan'>¥</View> 18
                </View>
                <View className='desc text-second'>原价18</View>
              </View>
            </View>

            <View className='summary'>
              <View className='label'>合计</View>
              <View className='value'>
                <View className='yuan'>¥</View> 18
              </View>
            </View>

            <Button className='btn-primary' onClick={onSubmit}>
              支付
            </Button>
          </View>
        </View>
      </PageHeaderWrapper>
    </View>
  )
}

export default Page
