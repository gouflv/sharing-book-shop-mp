import './index.scss'
import Taro, { FC, useEffect, useState } from '@tarojs/taro'
import { Button, Swiper, SwiperItem, View } from '@tarojs/components'
import { AudioItem } from './AudioItem'
import { POST } from '../../../utils/ajax'
import { hideLoading, showLoading, showToast } from '../../../utils'
import { useContentHeight } from './useContentHeight'
import { VideoStateForUpdate } from '../index'

interface AudioListProps {
  subjectId
  hasVideo: boolean
  onSetVideoState: (params: VideoStateForUpdate) => void
  onSetVideoStop: () => void
}

export interface Record {
  resourcesId: string
  resourcesUrl: string
  memberRecordUrl: string
  memberCurriculumRecordId: string
}

export const AudioList: FC<AudioListProps> = props => {
  const { contentHeight, setHasVideo } = useContentHeight()
  useEffect(() => {
    setHasVideo(props.hasVideo)
  }, [props.hasVideo])

  //#region list
  const [list, setList] = useState<Record[]>([])
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

  //#region record
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [recordData, setRecordData] = useState<({ file: string } | null)[]>([])
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
      src: `list[${currentItemIndex}].video`,
      muted: true,
      autoplay: true
    })
  }

  function onCurrentItemRecordStop() {
    setRecordData(prevState => {
      const copy = [...prevState]
      copy[currentItemIndex] = { file: `${currentItemIndex}` }
      return copy
    })
    setIsRecording(false)

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
  //#endregion

  useEffect(() => {
    if (isRecording) {
      return
    }
    // 有录音时不自动播放
    props.onSetVideoState({
      src: `list[${currentItemIndex}].video`,
      muted: false,
      autoplay: !recordData[currentItemIndex]
    })
  }, [currentItemIndex])

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
        duration={250}
        onChange={e => setCurrentItemIndex(e.detail.current)}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <SwiperItem>
            <AudioItem
              key={i}
              dataKey={i}
              data={{}}
              recordData={recordData[i]}
              onRecordStart={onCurrentItemRecordStart}
              onRecordStop={onCurrentItemRecordStop}
              onRemoveRecord={onCurrentItemRemoveRecord}
              disabled={isRecording && i !== currentItemIndex}
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
