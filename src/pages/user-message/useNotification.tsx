import { useState } from '@tarojs/taro'
import { POST } from '../../utils/ajax'

export const useNotification = () => {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchList() {
    setLoading(true)
    const data = await POST('wxMember/getMemberMsg', {
      data: { type: 0 }
    })
    setItems(data)
    setLoading(false)
  }

  async function fetchActiveRecord() {
    const data = await POST('wxMember/getMemberMsg', {
      data: { type: 6 }
    })
    return data.length ? data[0] : null
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
    fetchActiveRecord,
    markAllAsRead
  }
}
