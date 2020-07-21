import './index.scss'
import Taro, { FC, showModal, useEffect, useRef, useState } from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import { RecordBtn } from './RecordBtn'
import { RecordPart } from './index'
import { isDev } from '../../../config'

interface AudioItemProps {
  dataKey: number
  data: RecordPart
  count: number
  recordData: { file: string } | null
  isRecording: boolean
  isPlaying: boolean
  disabled: boolean
  duration: number
  onRecordStart: () => void
  onRecordStop: () => void
  onRemoveRecord: () => void
  onRecordPlay: () => void
}

export const AudioItem: FC<AudioItemProps> = props => {
  const [recordTime, setRecordTime] = useState(0)

  const timer = useRef<any>(0)
  useEffect(() => {
    function stop() {
      clearInterval(timer.current)
    }
    function runner() {
      if (recordTime + 1 > props.duration / 1000) {
        stop()
        props.onRecordStop()
      } else {
        setRecordTime(prevState => prevState + 1)
      }
    }

    if (props.isRecording && props.duration) {
      timer.current = setInterval(() => {
        runner()
      }, 1000)
    } else {
      stop()
    }

    return () => stop()
  }, [props.isRecording, props.duration])

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

    if (props.isRecording) {
      props.onRecordStop()
    } else {
      setRecordTime(0)
      props.onRecordStart()
    }
  }

  return (
    <View className='audio-item'>
      <View className='header'>
        <View className='tag'>
          {props.dataKey + 1}/{props.count}
        </View>
      </View>
      <View className='content'>{props.data.describes}</View>
      <View className='footer'>
        {isDev && (
          <View>
            {recordTime}/{props.duration / 1000}
          </View>
        )}
        {!!props.recordData && (
          <View className='btn-play' onClick={props.onRecordPlay}>
            {props.isPlaying ? (
              <Image
                src={require('../../../assets/course_detail_ico_pause@2x.png')}
              />
            ) : (
              <Image
                src={require('../../../assets/course_detail_ico_start@2x.png')}
              />
            )}
          </View>
        )}
        <RecordBtn
          hasRecord={!!props.recordData}
          value={
            props.duration ? (recordTime / (props.duration / 1000)) * 100 : 0
          }
          onClick={onRecordClick}
        />
      </View>
      {props.recordData && (
        <Image
          className='mark'
          src={require('../../../assets/course_detail_tip@2x.png')}
        />
      )}
    </View>
  )
}
