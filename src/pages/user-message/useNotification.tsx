import { useState } from '@tarojs/taro'
import { POST } from '../../utils/ajax'
import { UserNotification } from './index'

export const useNotification = () => {
  const [items, setItems] = useState<UserNotification[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchList() {
    setLoading(true)
    const data = await POST('wxMember/getMemberMsg', {
      data: { type: 0 }
    })
    setItems(data)
    setLoading(false)
  }

  async function markAllAsRead(ids: string[] = []) {
    for (const id of ids) {
      await POST('wxMember/setMemberMsgRead', {
        data: { newsId: id }
      })
    }
  }

  return {
    items,
    loading,
    fetchList,
    markAllAsRead
  }
}
