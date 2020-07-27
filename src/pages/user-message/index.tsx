import './index.scss'
import Taro, { FC, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import dayjs from 'dayjs'
import { usePagination } from '../../hooks/usePagination'
import { POST } from '../../utils/ajax'

export interface UserNotification {
  newsId
  isRead: 1 | 2 | boolean
  content
  createTime
}

const Page: FC = () => {
  const { items, fetchStart, isFinish, isEmpty, loading } = usePagination({
    url: 'wxMember/getMemberAllMsg'
  })

  useEffect(() => {
    fetchStart()
  }, [])

  useEffect(() => {
    if (items.length) {
      markAllAsRead(items.filter(d => d.isRead === 1).map(d => d.newsId))
    }
  }, [items])

  async function markAllAsRead(ids: string[] = []) {
    for (const id of ids) {
      await POST('wxMember/setMemberMsgRead', {
        data: { newsId: id }
      })
    }
  }

  return (
    <View className={'page-message'}>
      <PageHeaderWrapper title={'我的消息'}>
        {!loading && items.length && (
          <PageHeaderExt absolute height={'90rpx'} />
        )}
      </PageHeaderWrapper>

      <View style={{ height: '20rpx' }} />

      <View className='page-space-wing'>
        {!loading && isEmpty && <View className='empty-list'>暂无消息</View>}

        <View className={'list'}>
          {items.map((item, i) => (
            <View key={i} className='message d-flex'>
              <View className='date flex-auto'>
                <View>{dayjs(item.createTime).format('YYYY')}</View>
                <View className='text-second'>
                  {dayjs(item.createTime).format('MM/DD')}
                </View>
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
