import './index.scss'
import Taro, { FC, useEffect, useState } from '@tarojs/taro'
import { Button, Swiper, SwiperItem, View } from '@tarojs/components'
import { AudioItem } from './AudioItem'
import { defaultErrorHandler, POST } from '../../../utils/ajax'
import { hideLoading, showLoading, showToast } from '../../../utils'
import { useContentHeight } from './useContentHeight'
import { VideoStateForUpdate } from '../index'
import { useRecorder } from './useRecorder'
import { useAudioPlayer } from './useAudioPlayer'
import { commonUpload } from '../../../utils/upload'
import curryright from 'lodash.curryright'

interface AudioListProps {
  subjectId
  hasVideo: boolean
  videoDuration: number
  setAudioDuration: (duration: number) => void
  onSetVideoState: (params: VideoStateForUpdate) => void
  onSetVideoStop: () => void
}

export interface RecordPart {
  resourcesId: string
  //视频分段资源
  videoResourcesUrl: string
  //音频分段资源
  voiceResourcesUrl: string

  memberCurriculumRecordId: string
  memberRecordUrl: string

  describes: string
  //伴读
  videoDescribes: string
}

export const AudioList: FC<AudioListProps> = props => {
  // layout
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

  useEffect(() => {
    console.debug('[AudioList] recordData', recordData)
  }, [recordData])

  useEffect(() => {
    if (list.length) {
      list.forEach((item, index) => {
        if (item.memberRecordUrl) {
          recordData[index] = { file: item.memberRecordUrl }
        }
      })
    }
  }, [list])

  function onCurrentItemRecordStart() {
    if (isRecording) {
      showToast({ title: '正在录音' })
      return
    }

    setIsRecording(true)

    // Video
    if (props.hasVideo) {
      props.onSetVideoState({
        src: list[currentItemIndex].videoResourcesUrl,
        desc: list[currentItemIndex].videoDescribes,
        muted: true,
        play: true
      })
    } else {
      stopPlay()
    }

    // Recorder
    const onRecordFinishBindIndex = curryright(onRecorderFinish)(
      currentItemIndex
    )
    setTimeout(() => {
      startRecord({
        duration: 120_000, //props.videoDuration,
        onFinish: file => onRecordFinishBindIndex(file)
      })
    }, 100)
  }

  async function onRecorderFinish(file: string, index: number) {
    try {
      const url = await commonUpload(file)
      setRecordData(prevState => {
        const copy = [...prevState]
        copy[index] = { file: url }
        return copy
      })
    } catch (e) {
      console.error(e)
    }
  }

  function onCurrentItemRecordStop() {
    setIsRecording(false)
    if (props.hasVideo) {
      props.onSetVideoStop()
    }
    stopRecord()
  }

  function onCurrentItemRemoveRecord() {
    onCurrentItemRecordStop()
    setRecordData(prevState => {
      const copy = [...prevState]
      copy[currentItemIndex] = null
      return copy
    })
  }

  function onCurrentItemRecordPlay() {
    if (isPlaying) {
      if (props.hasVideo) {
        props.onSetVideoStop()
      } else {
        stopPlay()
      }
    } else {
      debugger
      if (props.hasVideo) {
        props.onSetVideoState({
          src: list[currentItemIndex].videoResourcesUrl,
          desc: list[currentItemIndex].videoDescribes,
          muted: true,
          play: true
        })
      }
      if (recordData[currentItemIndex]) {
        startPlay({
          // @ts-ignore
          src: recordData[currentItemIndex].file,
          onFinish: () => {
            setIsPlaying(false)
          }
        })
      }
    }
    setIsPlaying(!isPlaying)
  }
  //#endregion

  // watch currentItemIndex
  useEffect(() => {
    if (!list.length) {
      return
    }

    if (isRecording) {
      onCurrentItemRecordStop()
    }

    if (isPlaying) {
      setIsPlaying(false)
      stopPlay()
    }

    if (props.hasVideo) {
      props.onSetVideoState({
        src: list[currentItemIndex].videoResourcesUrl,
        desc: list[currentItemIndex].videoDescribes,
        muted: false,
        // 有录音时不自动播放
        play: false //!recordData[currentItemIndex],
        // audio: list[currentItemIndex].voiceResourcesUrl
      })
    } else {
      if (recordData[currentItemIndex]) {
        props.setAudioDuration(0)
        startPlay({
          src: list[currentItemIndex].voiceResourcesUrl,
          play: false,
          onGetDuration: duration => props.setAudioDuration(duration)
        })
      } else {
        startPlay({
          src: list[currentItemIndex].voiceResourcesUrl,
          loop: true
        })
      }
    }
  }, [list, currentItemIndex])

  // submit
  async function submit() {
    type resType = { resourcesId; recordUrl }
    const resourceData = recordData.reduce<resType[]>((res, rc, index) => {
      if (rc) {
        res.push({ recordUrl: rc.file, resourcesId: list[index].resourcesId })
      }
      return res
    }, [])
    try {
      showLoading()
      await POST('curriculum/addCurriculumRecord', {
        data: {
          jsonString: JSON.stringify({
            curriculumId: props.subjectId,
            data: resourceData
          })
        }
      })
      showToast({ title: '保存成功', icon: 'success' })
    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      hideLoading()
    }
  }

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
              isRecording={i === currentItemIndex && isRecording}
              isPlaying={i === currentItemIndex && isPlaying}
              disabled={
                isRecording && i !== currentItemIndex // || !props.videoDuration
              }
              duration={120_000 || props.videoDuration}
              onRecordStart={onCurrentItemRecordStart}
              onRecordStop={onCurrentItemRecordStop}
              onRemoveRecord={onCurrentItemRemoveRecord}
              onRecordPlay={onCurrentItemRecordPlay}
            />
          </SwiperItem>
        ))}
      </Swiper>

      {recordData.length && (
        <View className='action-bar'>
          <Button className='btn-primary' onClick={submit}>
            配音完成
          </Button>
        </View>
      )}
    </View>
  )
}
