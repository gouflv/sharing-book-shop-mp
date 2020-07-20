import './index.scss'
import Taro, { FC, useEffect, useState } from '@tarojs/taro'
import { Button, Swiper, SwiperItem, View } from '@tarojs/components'
import { AudioItem } from './AudioItem'
import { POST } from '../../../utils/ajax'
import { hideLoading, showLoading, showToast } from '../../../utils'
import { useContentHeight } from './useContentHeight'
import { VideoStateForUpdate } from '../index'
import { useRecorder } from './useRecorder'
import { useAudioPlayer } from './useAudioPlayer'
import { commonUpload } from '../../../utils/upload'
import { isDev } from '../../../config'

interface AudioListProps {
  subjectId
  hasVideo: boolean
  videoDuration: number
  onSetVideoState: (params: VideoStateForUpdate) => void
  onSetVideoStop: () => void
}

export interface RecordPart {
  resourcesId: string
  resourcesUrl: string
  memberRecordUrl: string
  memberCurriculumRecordId: string
  describes: string
}

export const AudioList: FC<AudioListProps> = props => {
  const { contentHeight, setHasVideo } = useContentHeight()
  useEffect(() => {
    setHasVideo(props.hasVideo)
  }, [props.hasVideo])

  //#region List
  const [list, setList] = useState<RecordPart[]>([])
  async function fetch() {
    showLoading()
    const data = await POST('curriculum/getCurriculumSegmentationVideo', {
      data: { curriculumId: props.subjectId }
    })
    setList(data)
    hideLoading()
  }
  useEffect(() => {
    fetch()
  }, [])
  //#endregion

  //#region Record
  const [recordData, setRecordData] = useState<({ file: string } | null)[]>([])
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const { startRecord, stopRecord } = useRecorder()
  const { startPlay, stopPlay } = useAudioPlayer()

  async function onRecorderFinish(file: string) {
    setIsRecording(false)
    try {
      const url = await commonUpload(file)
      setRecordData(prevState => {
        const copy = [...prevState]
        copy[currentItemIndex] = { file: url }
        return copy
      })
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    console.log(recordData)
  }, [recordData])

  function onCurrentItemRecordStart() {
    if (isRecording) {
      showToast({ title: '正在录音' })
      return
    }

    setIsRecording(true)

    // Video
    props.onSetVideoState({
      src: list[currentItemIndex].resourcesUrl,
      muted: true,
      play: true
    })

    // Recorder
    setTimeout(() => {
      startRecord({
        duration: props.videoDuration,
        onFinish: onRecorderFinish
      })
    }, 200)
  }

  function onCurrentItemRecordStop() {
    setIsRecording(false)

    // Recorder
    stopRecord()

    // Video
    props.onSetVideoStop()
  }

  function onCurrentItemRemoveRecord() {
    setRecordData(prevState => {
      const copy = [...prevState]
      copy[currentItemIndex] = null
      return copy
    })
  }

  function onCurrentItemRecordPlay() {
    if (isPlaying) {
      setIsPlaying(false)
      stopPlay()
      return
    }

    setIsPlaying(true)

    // Player
    if (recordData[currentItemIndex]) {
      // @ts-ignore
      startPlay(recordData[currentItemIndex].file, () => {
        setIsPlaying(false)

        // Video
        props.onSetVideoStop()
      })
    }

    // Video
    props.onSetVideoState({
      src: list[currentItemIndex].resourcesUrl,
      muted: true,
      play: true
    })
  }
  //#endregion

  // watch currentItemIndex
  useEffect(() => {
    if (isRecording) {
      return
    }

    if (isPlaying) {
      setIsPlaying(false)
      stopPlay()
    }

    // 有录音时不自动播放
    if (list.length) {
      props.onSetVideoState({
        src: list[currentItemIndex].resourcesUrl,
        muted: false,
        play: false //!recordData[currentItemIndex]
      })
    }
  }, [list, currentItemIndex])

  return (
    <View
      className={'audio-list'}
      style={{
        height: contentHeight
      }}
    >
      <Swiper
        className='audio-list__swiper'
        vertical={true}
        nextMargin={props.hasVideo ? '130rpx' : '250rpx'}
        duration={200}
        onChange={e => setCurrentItemIndex(e.detail.current)}
      >
        {list.map((item, i) => (
          <SwiperItem>
            <AudioItem
              key={i}
              dataKey={i}
              data={item}
              count={list.length}
              recordData={recordData[i]}
              isRecording={isRecording}
              isPlaying={isPlaying}
              disabled={
                isRecording && i !== currentItemIndex && !props.videoDuration
              }
              onRecordStart={onCurrentItemRecordStart}
              onRecordStop={onCurrentItemRecordStop}
              onRemoveRecord={onCurrentItemRemoveRecord}
              onRecordPlay={onCurrentItemRecordPlay}
            />
          </SwiperItem>
        ))}
      </Swiper>
      <View className='action-bar'>
        <Button className='btn-primary'>配音完成</Button>
      </View>
    </View>
  )
}
