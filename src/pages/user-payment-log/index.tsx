import './index.scss'
import Taro, { FC, useEffect, useState } from '@tarojs/taro'
import { Image, Picker, View } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import dayjs from 'dayjs'
import { POST } from '../../utils/ajax'

const Page: FC = () => {
  const [date, setDate] = useState(dayjs().format('YYYY-MM'))
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  async function fetch() {
    setLoading(true)
    const data = await POST('wxMember/getMemberCard', {
      data: { date: `${date}-01` }
    })
    setItems(data)
    setLoading(false)
  }

  useEffect(() => {
    fetch()
  }, [date])

  function onDateChange(val: string) {
    console.log(val)
  }

  return (
    <View className='page-payment-log'>
      <PageHeaderWrapper title={'支付记录'}>
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
          {!loading && !items.length && (
            <View className='empty-list'>暂无记录</View>
          )}

          {!loading && items.length && (
            <View className='user-payment-list'>
              {items.map((item, i) => (
                <View key={i} className='item'>
                  <View className='content'>
                    <View className='title'>
                      购买{item.memberCode} (书位{item.payName})
                    </View>
                    <View className='desc text-second'>
                      {item.purchaseDate}
                    </View>
                  </View>
                  <View className='value'>¥{item.payMoney}</View>
                </View>
              ))}
            </View>
          )}
        </View>
      </PageHeaderWrapper>
    </View>
  )
}

export default Page
