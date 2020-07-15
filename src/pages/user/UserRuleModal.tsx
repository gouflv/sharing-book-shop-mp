import '../../app.scss'
import Taro, { FC } from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import { AtModal } from 'taro-ui'

export const UserRuleModal: FC<{
  visible: boolean
  onClose: () => void
}> = props => {
  return (
    <AtModal
      className='user-active-modal'
      isOpened={props.visible}
      closeOnClickOverlay={false}
    >
      <Image
        className='user-active-modal__top2'
        src={require('../../assets/vip_popup_fee@2x.png')}
      />
      <View className='user-active-modal__content user-active-modal__content2'>
        <View className='title'>收费规则</View>
        <View className='text'>
          逾期及超量借阅按1元/本/天收取额外费用，一本书若同时逾期及超量的情况不叠加费用，依然按1元/本/天收取费用。
        </View>
      </View>
      <View className='user-active-modal__close' onClick={props.onClose}>
        <Image src={require('../../assets/vip_active_ext_close.png')} />
      </View>
    </AtModal>
  )
}
