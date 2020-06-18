import './index.scss'
import Taro, { FC } from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import { OrderItem } from './OrderItem'

const Page: FC = () => {
  return (
    <View className={'page-order'}>
      <PageHeaderWrapper title={'借阅中'} hideBackArrow>
        <PageHeaderExt absolute height={'90rpx'} />
      </PageHeaderWrapper>

      <View className='page-space-wing'>
        <View className='summary'>
          <View className='state'>
            <Image src={require('../../assets/borrow_ico_crown@2x.png')} />
          </View>
          <View className='content'>
            <View className='title'>
              当前会员收益
              <Text className='date'>2020/12/21</Text>
            </View>
            <View className='summary-list'>
              <View className='item'>
                可借本数:
                <Text className='num'>10</Text>
              </View>
              <View className='item'>
                借阅中:
                <Text className='num'>10</Text>
              </View>
              <View className='item'>
                昨日欠费:
                <Text className='num danger'>¥10</Text>
              </View>
              <View className='item'>
                累计欠费:
                <Text className='num danger'>¥10</Text>
              </View>
            </View>
          </View>
          <View className='action'>
            <View className='primary'>查看详情</View>
            <Button className='btn-primary' size={'mini'}>
              支付
            </Button>
          </View>
          <Image
            className='mark'
            src={require('../../assets/order_mark0.png')}
          />
        </View>

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
