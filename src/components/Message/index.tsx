import Taro, { FC } from '@tarojs/taro'
import { AtModal } from 'taro-ui'
import { View, Button } from '@tarojs/components'

export const Message: FC = () => {
  return (
    <AtModal
      className='message-modal'
      isOpened={false}
      closeOnClickOverlay={false}
    >
      <View className='message-modal__content'>
        <View className='title'></View>
        <View className='content'></View>
        <View className='footer'>
          <Button>取消</Button>
          <Button>确认</Button>
        </View>
      </View>
    </AtModal>
  )
}
