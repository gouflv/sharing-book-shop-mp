import { action, observable } from 'mobx'
import { createContext } from '@tarojs/taro'
import { MessageProps } from '../components/Message'

type MessageOptions = Pick<MessageProps, 'title' | 'content'>

class Message {
  @observable visible = false
  @observable options: MessageProps = {} as any

  @action.bound
  async showConfirm(props: MessageOptions) {
    return new Promise((resolve, reject) => {
      this.options = {
        onCancel: () => {
          this.visible = false
          reject()
        },
        onConfirm: () => {
          this.visible = false
          resolve()
        },
        ...props
      }
      this.visible = true
    })
  }
}

export const MessageService = createContext(new Message())
