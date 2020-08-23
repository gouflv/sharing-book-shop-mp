import { action, observable } from 'mobx'
import { createContext } from '@tarojs/taro'
import { POST } from '../utils/ajax'
import { UserNotification } from '../pages-user/user-message'
import { app } from './AppStore'
import { isDev } from '../config'

class Notification {
  @observable visible = false
  @observable data: UserNotification | null = null

  @action.bound
  async checkNotify() {
    if (app.token) {
      const data = await POST('wxMember/getMemberActivityMsg', {
        preventAuthErrorHandler: true
      })
      const res: UserNotification = data.length
        ? data.find(d => !!d.content && d.isRead === 1)
        : null

      if (res) {
        this.showNotify(res)
      }
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
