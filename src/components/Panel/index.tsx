import './index.scss'
import Taro, { FC } from '@tarojs/taro'
import { Image, View } from '@tarojs/components'

export const Panel: FC<{
  title: string
  action?: string
  onActionClick?: () => void
}> = props => {
  return (
    <View className='panel'>
      <View className='panel__header'>
        <View className='title'>{props.title}</View>
        {props.action && (
          <View className='action' onClick={props.onActionClick}>
            {props.action}
            <Image src={require('../../assets/vip_ico_arrow@2x.png')} />
          </View>
        )}
      </View>
      <View className='panel__body'>{props.children}</View>
    </View>
  )
}
