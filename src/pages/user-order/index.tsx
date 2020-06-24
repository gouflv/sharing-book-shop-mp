import './index.scss'
import Taro, { FC, useState } from '@tarojs/taro'
import { View, Image, Picker, Text } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import classNames from 'classnames'

const Page: FC = () => {
  function onDateChange(val: string) {
    console.log(val)
  }

  return (
    <View className='page'>
      <PageHeaderWrapper title={'借阅订单'}>
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
          <View className='user-order-list'>
            {Array.from({ length: 3 }).map((_, i) => (
              <View key={i} className='item'>
                <View className='header'>
                  <View className='title'>2020/6/1</View>
                  <View
                    className='link primary'
                    onClick={() =>
                      Taro.navigateTo({ url: '/pages/user-order/detail' })
                    }
                  >
                    本日详情
                  </View>
                </View>
                <View className='body'>
                  <View className='left'>
                    <View className='cell'>
                      当日借阅中本数: <Text className='num'>8</Text>
                    </View>
                    <View className='cell'>
                      逾期本数: <Text className='num'>8</Text>
                    </View>
                    <View className='cell'>
                      本日应付费用: <Text className='num'>¥8</Text>
                    </View>
                  </View>
                  <View className='right'>
                    <View className='cell'>
                      当日可借本数: <Text className='num'>8</Text>
                    </View>
                    <View className='cell'>
                      超量本数: <Text className='num'>8</Text>
                    </View>
                    <View className='cell'>
                      本日已付费用: <Text className='num'>¥8</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </PageHeaderWrapper>
    </View>
  )
}

export default Page
