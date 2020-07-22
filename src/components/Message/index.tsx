import './index.scss'
import Taro, { FC } from '@tarojs/taro'
import { AtModal } from 'taro-ui'
import { View, Button } from '@tarojs/components'

export interface MessageProps {
  title?: string
  content: string
  onCancel: () => void
  onConfirm: () => void
}

export const Message: FC<MessageProps> = props => {
  return (
    <AtModal
      className='message-modal'
      isOpened={true}
      closeOnClickOverlay={false}
    >
      <View className='message-modal__container'>
        <View className='main'>
          <View className='title'>{props.title}</View>
          <View className='content'>{props.content}</View>
        </View>
        <View className='footer'>
          <Button className={'btn-default'} onClick={props.onCancel}>
            取消
          </Button>
          <Button className={'btn-primary'} onClick={props.onConfirm}>
            确认
          </Button>
        </View>
      </View>
    </AtModal>
  )
}
