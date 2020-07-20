import './index.scss'
import Taro, { FC, useState, showModal } from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import { RecordBtn } from './RecordBtn'
import { useInterval } from '../../../utils/useInterval'
import { RecordPart } from './index'

interface AudioItemProps {
  dataKey: number
  data: RecordPart
  count: number
  recordData: { file: string } | null
  isRecording: boolean
  isPlaying: boolean
  disabled: boolean
  onRecordStart: () => void
  onRecordStop: () => void
  onRemoveRecord: () => void
  onRecordPlay: () => void
}

export const AudioItem: FC<AudioItemProps> = props => {
  const [process, setProcess] = useState(0)

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
      props.onRecordStart()
    }
  }

  useInterval(
    () => {
      setProcess(prev => {
        if (prev + 1 > 100) {
          props.onRecordStop()
          return prev
        }
        return prev + 1
      })
    },
    props.isRecording ? 1000 : null
  )

  return (
    <View className='audio-item'>
      <View className='header'>
        <View className='tag'>
          {props.dataKey + 1}/{props.count}
        </View>
      </View>
      <View className='content'>{props.data.describes}</View>
      <View className='footer'>
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
          value={process}
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
