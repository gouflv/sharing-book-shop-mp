import './index.scss'
import Taro, { FC, useEffect, useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import { POST } from '../../utils/ajax'

const Page: FC = () => {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  async function fetch() {
    setLoading(true)
    const data = await POST('wxMember/getMemberMsg', {
      data: { type: 0 }
    })
    setItems(data)
    setLoading(false)
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <View className={'page-message'}>
      <PageHeaderWrapper title={'我的消息'}>
        {!loading && items.length && (
          <PageHeaderExt absolute height={'90rpx'} />
        )}
      </PageHeaderWrapper>

      <View style={{ height: '20rpx' }} />

      <View className='page-space-wing'>
        {!loading && !items.length && (
          <View className='empty-list'>暂无消息</View>
        )}

        <View className={'list'}>
          {items.map((_, i) => (
            <View key={i} className='message d-flex'>
              <View className='date flex-auto'>
                <View>2020</View>
                <View className='text-second'>06/01</View>
              </View>
              <View className='content flex-fill'>
                <View className='title'>Lorem ipsum dolor sit.</View>
                <View className='desc'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste
                  itaque modi mollitia officiis sunt? Consectetur eius impedit
                  iure nostrum suscipit.
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default Page
