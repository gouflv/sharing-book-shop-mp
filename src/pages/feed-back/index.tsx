import './index.scss'
import Taro, { FC } from '@tarojs/taro'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { View, Image, Button, Input, Picker } from '@tarojs/components'

const Page: FC = () => {
  return (
    <View className='page-feed-back'>
      <PageHeaderWrapper
        title={'我的宝宝'}
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
          <View className='box'></View>
        </View>
      </PageHeaderWrapper>
    </View>
  )
}

export default Page
