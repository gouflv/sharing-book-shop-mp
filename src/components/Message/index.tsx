import './index.scss'
import Taro, { FC } from '@tarojs/taro'
import { AtModal } from 'taro-ui'
import { Button, View } from '@tarojs/components'
import { ReactNode } from 'react'
import classNames from 'classnames'

export interface MessageProps {
  title?: string
  content: string | ReactNode
  onCancel: () => void
  onConfirm: () => void
  className?: string
}

export const Message: FC<MessageProps> = props => {
  return (
    <AtModal
      className='message-modal'
      isOpened={true}
      closeOnClickOverlay={false}
    >
      <View className={classNames('message-modal__container', props.className)}>
        <View className='main'>
          <View className='title'>{props.title}</View>
          <View className='content'>{props.content || props.children}</View>
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
