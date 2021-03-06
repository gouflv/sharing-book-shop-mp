import './index.scss'
import Taro, { FC, useEffect, useState } from '@tarojs/taro'
import { Image, Picker, Text, View } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import { POST } from '../../utils/ajax'
import dayjs from 'dayjs'
import { hideLoading, showLoading } from '../../utils'

const Page: FC = () => {
  const [date, setDate] = useState(dayjs().format('YYYY-MM'))
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  async function fetch() {
    showLoading()
    const data = await POST('wxMember/getDayOrder', {
      data: { date }
    })
    setItems(data)
    setLoading(false)
    hideLoading()
  }

  useEffect(() => {
    fetch()
  }, [date])

  function onDateChange(val: string) {
    setDate(val)
  }

  return (
    <View className='page-user-order'>
      <PageHeaderWrapper title={'借阅订单'}>
        <PageHeaderExt fixed height={'100rpx'}>
          <View className='date-filter'>
            <Picker
              mode={'date'}
              fields={'month'}
              value={date}
              onChange={e => onDateChange(e.detail.value)}
            >
              <View className='label'>
                <Image
                  className={'time'}
                  src={require('../../assets/vip_borrow_ico_time@2x.png')}
                />
                {date}
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
            {items.map((data, i) => (
              <View key={i} className='item'>
                <View className='header'>
                  <View className='title'>
                    {dayjs(data.date).format('YYYY/MM/DD')}
                  </View>
                  <View
                    className='link primary'
                    onClick={() =>
                      Taro.navigateTo({
                        url: `/pages-user/user-order/detail?id=${data.memberBorrowingDaySummaryId}`
                      })
                    }
                  >
                    本日详情
                  </View>
                </View>
                <View className='body'>
                  <View className='left'>
                    <View className='cell'>
                      当日借阅中本数:{' '}
                      <Text className='num'>{data.borrowingNum}</Text>
                    </View>
                    <View className='cell'>
                      当日可借本数:{' '}
                      <Text className='num'>{data.remainingNum}</Text>
                    </View>
                    <View className='cell'>
                      超权益本数:{' '}
                      <Text className='num danger'>{data.beyondNum}</Text>
                    </View>
                  </View>
                  <View className='right'>
                    <View className='cell'>
                      本日应付费用:{' '}
                      <Text className='num danger'>¥{data.shouldPay}</Text>
                    </View>
                    <View className='cell'>
                      本日已付费用: <Text className='num'>¥{data.havePay}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}

            {!loading && !items.length && (
              <View className='empty-list'>暂无订单</View>
            )}
          </View>
        </View>
      </PageHeaderWrapper>
    </View>
  )
}

export default Page
