import './index.scss'
import { FC } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

export const Uploader: FC = () => {
  return (
    <View className='uploader'>
      <View className='btn-upload'>
        <Image src={require('../../../assets/plus.png')} />
      </View>

      {Array.from({ length: 3 }).map((_, i) => (
        <View className='item'>
          <Image
            className='img'
            src={'http://placehold.it/150x150'}
            mode={'aspectFill'}
          />
          <Image className='close' src={require('../../../assets/close.png')} />
        </View>
      ))}
    </View>
  )
}
