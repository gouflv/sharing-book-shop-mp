import '../../app.scss'
import Taro, { FC } from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import { AtModal } from 'taro-ui'
import { UserNotification } from '../../pages/user-message'

export const UserActiveModal: FC<{
  data: UserNotification
  onClose: () => void
}> = ({ data, onClose }) => {
  return (
    <AtModal
      className='user-active-modal'
      isOpened={true}
      closeOnClickOverlay={false}
    >
      <Image
        className='user-active-modal__top'
        src={require('../../assets/vip_popup_act@2x.png')}
      />
      <View className='user-active-modal__content'>
        {!!data && data.content}
      </View>
      <View className='user-active-modal__close' onClick={onClose}>
        <Image src={require('../../assets/vip_active_ext_close.png')} />
      </View>
    </AtModal>
  )
}
