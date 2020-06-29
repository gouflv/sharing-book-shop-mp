import './index.scss'
import Taro, { FC } from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import { RecordBtn } from './ReacordBtn'

export const AudioItem: FC = () => {
  function startRecord() {
    const recorder = Taro.getRecorderManager()
    recorder.start({})
  }

  return (
    <View className='audio-item'>
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
        <RecordBtn value={10} onClick={startRecord} />
      </View>
      <Image
        className='mark'
        src={require('../../../assets/course_detail_tip@2x.png')}
      />
    </View>
  )
}
