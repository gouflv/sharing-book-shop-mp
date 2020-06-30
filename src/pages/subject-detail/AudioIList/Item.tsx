import './index.scss'
import Taro, { FC, useState, useEffect } from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import { RecordBtn } from './ReacordBtn'
import { useInterval } from '../../../utils/useInterval'

export const AudioItem: FC = () => {
  const [time, setTime] = useState(10)
  const [running, setRunning] = useState(false)

  function startRecord() {
    // const recorder = Taro.getRecorderManager()
    // recorder.start({})
    if (running) {
      setRunning(false)
    } else {
      setRunning(true)
    }
  }

  useInterval(
    () => {
      setTime(prev => {
        if (prev + 1 > 100) {
          setRunning(false)
          return prev
        }
        return prev + 1
      })
    },
    running ? 1000 : null
  )

  useEffect(() => {
    console.log(time)
  }, [time])

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
        <RecordBtn value={time} onClick={startRecord} />
      </View>
      <Image
        className='mark'
        src={require('../../../assets/course_detail_tip@2x.png')}
      />
    </View>
  )
}
