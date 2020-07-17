import './index.scss'
import Taro, { FC, useState } from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import { RecordBtn } from './ReacordBtn'
import { useInterval } from '../../../utils/useInterval'
import showModal = Taro.showModal

interface AudioItemProps {
  dataKey: number
  data: any
  recordData: { file: string } | null
  onRecordStart: () => void
  onRecordStop: () => void
  onRemoveRecord: () => void
  disabled: boolean
}

export const AudioItem: FC<AudioItemProps> = props => {
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)

  function onRecordClick() {
    if (props.disabled) {
      return
    }

    if (props.recordData) {
      showModal({
        title: '确认重录',
        success: ({ confirm }) => {
          confirm && props.onRemoveRecord()
        }
      })
      return
    }

    if (running) {
      stop()
    } else {
      start()
    }
  }

  function start() {
    props.onRecordStart()
    setRunning(true)
  }

  function stop() {
    props.onRecordStop()
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
        <View className='tag'>{props.dataKey + 1}/10</View>
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
        <RecordBtn
          hasRecord={!!props.recordData}
          value={time}
          onClick={onRecordClick}
        />
      </View>
      <Image
        className='mark'
        src={require('../../../assets/course_detail_tip@2x.png')}
      />
    </View>
  )
}
