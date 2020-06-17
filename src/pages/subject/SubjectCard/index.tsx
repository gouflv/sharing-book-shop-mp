import './index.scss'
import Taro, { FC } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

export const SubjectCard: FC = () => {
  return (
    <View className={'subject-card'}>
      <View className='thumb'>
        <Image src={'http://placehold.it/330x184'} mode={'aspectFill'} />
        <View className='mask' />
        <View className='tag tag--primary'>进行中</View>
        <View className='plays'>10086</View>
      </View>
      <View className='title'>什么事什么事什事什事什么事</View>
      <View className='d-flex footer'>
        <View className='flex-fill text-second'>100人配音</View>
        <View className='text-second'>88课</View>
      </View>
    </View>
  )
}
