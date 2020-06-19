import './index.scss'
import Taro, { FC } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { RecordBtn } from './ReacordBtn'

export const AudioList: FC = () => {
  return (
    <View>
      <View className='audio-list'>
        {Array.from({ length: 10 }).map((_, i) => (
          <View className='audio-item' key={i}>
            <View className='header'>
              <View className='tag'>1/10</View>
            </View>
            <View className='content'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </View>
            <View className='footer'>
              <View className='btn-play'>
                <Image
                  src={require('../../../assets/course_detail_ico_start@2x.png')}
                />
              </View>
              <RecordBtn value={0} />
            </View>
            <Image
              className='mark'
              src={require('../../../assets/course_detail_tip@2x.png')}
            />
          </View>
        ))}
      </View>
      <View className='action-bar'>
        <Button className='btn-primary'>配音完成</Button>
      </View>
    </View>
  )
}
