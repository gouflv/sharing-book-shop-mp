import './index.scss'
import Taro, { FC, useState, useDidShow } from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import { OrderItem } from './OrderItem'
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

  const [list, setList] = useState<any[]>([])
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
        <PageHeaderExt absolute height={'90rpx'} />
      </PageHeaderWrapper>

      <View className='page-space-wing'>
        {summary && (
          <View className='summary'>
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
                  昨日欠费:
                  <Text className='num danger'>¥{summary.owe}</Text>
                </View>
                <View className='item'>
                  累计欠费:
                  <Text className='num danger'>¥{summary.totalOwe}</Text>
                </View>
              </View>
            </View>
            <View className='action'>
              <View
                className='primary'
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
            <Image
              className='mark'
              src={require('../../assets/order_mark0.png')}
            />
          </View>
        )}

        <View className={'list'}>
          {list.map((item, i) => (
            <OrderItem key={i} data={item} />
          ))}
          {!loading && !list.length && (
            <View className={'empty-list'}>暂无借阅订单</View>
          )}
        </View>
      </View>
    </View>
  )
}

export default Page
