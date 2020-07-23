import { action, observable } from 'mobx'
import { createContext } from '@tarojs/taro'
import { POST } from '../utils/ajax'
import { UserNotification } from '../pages/user-message'

class Notification {
  @observable visible = false
  @observable data: UserNotification | null = null

  @action.bound
  async checkNotify() {
    const data = await POST('wxMember/getMemberMsg', {
      data: { type: 6 }
    })
    const res: UserNotification = data.length ? data[0] : null

    if (res && (res.isRead === 1 || res.isRead === false)) {
      this.showNotify(res)
    }
  }

  @action.bound
  showNotify(data: UserNotification) {
    this.data = data
    this.visible = true
  }

  @action.bound
  closeNotify() {
    this.visible = false
    this.setNotifyAsRead()
  }

  async setNotifyAsRead() {
    if (this.data && this.data.newsId) {
      await POST('wxMember/setMemberMsgRead', {
        data: { newsId: this.data.newsId }
      })
    }
  }
}

export const NotificationService = createContext(new Notification())
