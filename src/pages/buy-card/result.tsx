import './index.scss'
import Taro, { FC } from '@tarojs/taro'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { View, Image, Button } from '@tarojs/components'

const Page: FC = () => {
  return (
    <View className='page-result'>
      <PageHeaderWrapper
        title={'购买会员卡'}
        bg={require('../../assets/vip_top_bg2.jpg')}
        bgHeight={'490rpx'}
      >
        <PageHeaderExt
          height={'350rpx'}
          bg={require('../../assets/vip_top_bg2.jpg')}
          bgHeight={'490rpx'}
        >
          <View className='info'>
            <Image src={require('../../assets/vip_buy_sus_pic@2x.png')} />
          </View>
        </PageHeaderExt>

        <View className='page-space-around'>
          <View className='title primary'>恭喜您! 购买成功</View>
          <View className='action'>
            <Button className='btn-primary btn-primary--plain'>
              查看支付记录
            </Button>
            <Button className='btn-primary'>立即激活会员卡</Button>
          </View>
          <View className='tip text-second'>
            激活说明：若未立即激活会员卡，您可在会员中心的对应会员卡上手动激活待激活的会员卡。
          </View>
        </View>
      </PageHeaderWrapper>
    </View>
  )
}

export default Page
