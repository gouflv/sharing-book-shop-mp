import './index.scss'
import Taro, { FC } from '@tarojs/taro'
import { Image, Picker, View } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { PageHeaderExt } from '../../components/PageHeaderExt'

const Page: FC = () => {
  function onDateChange(val: string) {
    console.log(val)
  }

  return (
    <View className='page'>
      <PageHeaderWrapper title={'支付记录'}>
        <PageHeaderExt fixed height={'100rpx'}>
          <View className='date-filter'>
            <Picker
              mode={'date'}
              fields={'month'}
              value={'2020-09-01'}
              onChange={e => onDateChange(e.detail.value)}
            >
              <View className='label'>
                <Image
                  className={'time'}
                  src={require('../../assets/vip_borrow_ico_time@2x.png')}
                />
                2020-06
                <Image
                  className='arrow'
                  src={require('../../assets/arrow.png')}
                />
              </View>
            </Picker>
          </View>
        </PageHeaderExt>

        <View style={{ height: '100rpx' }} />

        <View className='page-space-around'>
          <View className='user-payment-list'>
            {Array.from({ length: 3 }).map((_, i) => (
              <View key={i} className='item'>
                <View className='content'>
                  <View className='title'>Lorem ipsum dolor sit amet.</View>
                  <View className='desc text-second'>2020/6/8</View>
                </View>
                <View className='value'>¥99</View>
              </View>
            ))}
          </View>
        </View>
      </PageHeaderWrapper>
    </View>
  )
}

export default Page
