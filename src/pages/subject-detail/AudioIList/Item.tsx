import './index.scss'
import Taro, { FC, useState, useEffect } from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import { RecordBtn } from './ReacordBtn'
import { useInterval } from '../../../utils/useInterval'
import EE from 'eventemitter3'

interface AudioItemProps {
  dataKey: number
  data: any
  onRecordStart: (dataKey: number) => void
  onRecordStop: (dataKey: number) => void
  eventBus: EE
}

export const AudioItem: FC<AudioItemProps> = props => {
  const [time, setTime] = useState(10)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    props.eventBus.on('stop', dataKey => {
      if (dataKey === props.dataKey) {
        stop()
      }
    })
  }, [])

  function onRecordClick() {
    if (running) {
      stop()
    } else {
      start()
    }
  }

  function start() {
    props.onRecordStart(props.dataKey)
    setRunning(true)
  }

  function stop() {
    props.onRecordStop(props.dataKey)
    setRunning(false)
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
        <RecordBtn value={time} onClick={onRecordClick} />
      </View>
      <Image
        className='mark'
        src={require('../../../assets/course_detail_tip@2x.png')}
      />
    </View>
  )
}
