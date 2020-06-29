import './index.scss'
import Taro, { FC } from '@tarojs/taro'
import { Button, View } from '@tarojs/components'
import { AudioItem } from './Item'

export const AudioList: FC = () => {
  return (
    <View>
      <View className='audio-list'>
        {Array.from({ length: 6 }).map((_, i) => (
          <AudioItem key={i} />
        ))}
      </View>
      <View className='action-bar'>
        <Button className='btn-primary'>配音完成</Button>
      </View>
    </View>
  )
}
