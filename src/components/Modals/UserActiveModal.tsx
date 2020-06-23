import '../../app.scss'
import Taro, { FC } from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import { AtModal } from 'taro-ui'

export const UserActiveModal: FC = () => {
  return (
    <AtModal
      className='user-active-modal'
      isOpened={false}
      closeOnClickOverlay={false}
    >
      <Image
        className='user-active-modal__top'
        src={require('../../assets/vip_popup_act@2x.png')}
      />
      <View className='user-active-modal__content'>
        您收到了一张预售卡，该预售卡在2020/6/5至2020/6/30期间限时发售，借阅书位1，借阅时间90天，购买后可自行选择是否立即激活。
      </View>
      <View className='user-active-modal__close'>
        <Image src={require('../../assets/vip_active_ext_close.png')} />
      </View>
    </AtModal>
  )
}
