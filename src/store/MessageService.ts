import { action, observable } from 'mobx'
import { createContext } from 'react'

export interface MessageProps {
  title?: string
  content: string
}
export interface MessageOptions extends MessageProps {
  onCancel: () => void
  onConfirm: () => void
}

class Message {
  @observable visible = false
  @observable options: MessageOptions = {} as any

  @action.bound
  async showConfirm(props: MessageProps) {
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
