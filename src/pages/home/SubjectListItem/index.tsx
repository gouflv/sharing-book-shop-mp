import './index.scss'
import Taro, { FC } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

export const SubjectListItem: FC = props => {
  return (
    <View className='subject-list-item'>
      <View className='d-flex main'>
        <View className='flex-fill d-flex'>
          <Image
            className='thumb'
            src={'http://placehold.it/226x126'}
            mode={'aspectFill'}
          />
          <View className='flex-fill'>
            <View className='title'>Lorem ipsum dolor</View>
            <View className='desc'>课程评价</View>
            <View className='tag'>3-6岁</View>
          </View>
        </View>
        <View className='action'>
          <View className='tag tag--primary'>进行中</View>
        </View>
      </View>
      <View className='d-flex footer'>
        <View className='flex-fill text-second'>
          共<Text>10</Text>节课, <Text className={'danger'}>99</Text>人已参加
        </View>
        <View className='success'>免费</View>
      </View>
    </View>
  )
}
