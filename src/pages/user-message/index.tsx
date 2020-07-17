import './index.scss'
import Taro, { FC, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import { useNotification } from './useNotification'

const Page: FC = () => {
  const { items, loading, fetchList, markAllAsRead } = useNotification()

  useEffect(() => {
    fetchList()
  }, [])

  useEffect(() => {
    if (items.length) {
      markAllAsRead(items.map(d => d.newsId))
    }
  }, [items])

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
          {items.map((item, i) => (
            <View key={i} className='message d-flex'>
              <View className='date flex-auto'>
                <View>2020</View>
                <View className='text-second'>06/01</View>
              </View>
              <View className='content flex-fill'>
                <View className='title'>系统通知</View>
                <View className='desc'>{item.content}</View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default Page
