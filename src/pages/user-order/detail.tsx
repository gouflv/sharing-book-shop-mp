import Taro, { FC } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import { OrderItem } from './OrderItem'

const Page: FC = () => {
  return (
    <View className={'page-order-detail'}>
      <PageHeaderWrapper title={'本日详情'}>
        <PageHeaderExt absolute height={'90rpx'} />
      </PageHeaderWrapper>

      <View style={{ height: '20rpx' }} />

      <View className='page-space-wing'>
        <View className={'list'}>
          {Array.from({ length: 10 }).map((_, i) => (
            <OrderItem key={i} />
          ))}
        </View>
      </View>
    </View>
  )
}

export default Page
