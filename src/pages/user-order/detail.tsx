import Taro, { FC, useEffect, useRouter, useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import { OrderItem } from './OrderItem'
import { POST } from '../../utils/ajax'
import { hideLoading, showLoading } from '../../utils'

const Page: FC = () => {
  const routers = useRouter()
  const [list, setList] = useState([])

  useEffect(() => {
    async function f() {
      showLoading()
      const data = await POST('wxMember/getDayOrderDetail', {
        data: { memberBorrowingDaySummaryId: routers.params.id }
      })
      setList(data)
      hideLoading()
    }
    f()
  }, [])

  return (
    <View className={'page-order-detail'}>
      <PageHeaderWrapper title={'本日详情'}>
        <PageHeaderExt absolute height={'90rpx'} />
      </PageHeaderWrapper>

      <View style={{ height: '20rpx' }} />

      <View className='page-space-wing'>
        <View className={'list'}>
          {list.map((item, i) => (
            <OrderItem key={i} data={item} />
          ))}
        </View>
      </View>
    </View>
  )
}

export default Page
