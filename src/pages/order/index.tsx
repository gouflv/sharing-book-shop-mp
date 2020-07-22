import './index.scss'
import Taro, { FC, useDidShow, useState } from '@tarojs/taro'
import { Button, Image, Text, View } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import { OrderBookItem, OrderItem } from './OrderItem'
import dayjs from 'dayjs'
import { defaultErrorHandler, POST } from '../../utils/ajax'
import { hideLoading, showLoading } from '../../utils'

const Page: FC = () => {
  const [summary, setSummary] = useState<any>()
  async function fetchSummary() {
    try {
      const data = await POST('wxMember/getMemberInterestsInfo')
      setSummary(data)
    } catch (e) {
      defaultErrorHandler(e)
    }
  }

  const [list, setList] = useState<OrderBookItem[]>([])
  const [loading, setLoading] = useState(true)
  async function fetchList() {
    try {
      showLoading()
      const data = await POST('wxMember/getMemberOrderList')
      setList(data)
    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      setLoading(false)
      hideLoading()
    }
  }

  useDidShow(async () => {
    await fetchSummary()
    fetchList()
  })

  return (
    <View className={'page-order'}>
      <PageHeaderWrapper title={'借阅中'} hideBackArrow>
        <PageHeaderExt fixed height={'90rpx'} />
      </PageHeaderWrapper>

      <View className='page-space-wing'>
        {!!summary && (
          <View className='summary'>
            <View className='body'>
              <View className='state'>
                <Image src={require('../../assets/borrow_ico_crown@2x.png')} />
              </View>
              <View className='content'>
                <View className='title'>
                  当前会员收益
                  <Text className='date'>{dayjs().format('YYYY/MM/DD')}</Text>
                </View>
                <View className='summary-list'>
                  <View className='item'>
                    可借本数:
                    <Text className='num'>{summary.remainingNum}</Text>
                  </View>
                  <View className='item'>
                    借阅中:
                    <Text className='num'>{summary.borrowingNum}</Text>
                  </View>
                  <View className='item'>
                    超权益:
                    <Text className='num danger'>{summary.beyondNum}</Text>
                  </View>
                  <View className='item'>
                    昨日欠费:
                    <Text className='num danger'>¥{summary.owe}</Text>
                  </View>
                  <View className='item'>
                    累计欠费:
                    <Text className='num danger'>¥{summary.totalOwe}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View className='footer'>
              <View
                className='link primary'
                onClick={() => {
                  Taro.navigateTo({
                    url: '/pages/user-order/index'
                  })
                }}
              >
                查看详情
              </View>
              <Button className='btn-primary' size={'mini'}>
                支付
              </Button>
            </View>
            {summary.isHaveCard == 2 && (
              <Image
                className='mark'
                src={require('../../assets/order_mark0.png')}
              />
            )}
          </View>
        )}

        {!loading && !list.length && (
          <View className={'empty-list'}>
            <Image
              src={require('../../assets/borrow_defoult_pic@2x.jpg')}
              style={{ width: '328rpx', height: '216rpx' }}
            />
            暂无订单，快去借书吧~
          </View>
        )}
        {list.length && (
          <View className={'list'}>
            {list.map((item, i) => (
              <OrderItem key={i} data={item} />
            ))}
          </View>
        )}
      </View>
    </View>
  )
}

export default Page
