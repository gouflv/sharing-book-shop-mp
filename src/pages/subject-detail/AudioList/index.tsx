import './index.scss'
import Taro, { FC, useEffect, useState } from '@tarojs/taro'
import { Button, Swiper, SwiperItem, View } from '@tarojs/components'
import { AudioItem } from './AudioItem'
import { POST } from '../../../utils/ajax'
import { hideLoading, showLoading, showToast } from '../../../utils'
import { useRecord } from './useRecord'
import { useContentHeight } from './useContentHeight'

interface AudioListProps {
  subjectId
  hasVideo: boolean
  onRecordStart: (src: string, muted?: boolean) => void
  onRecordStop: () => void
  onPlayStart: (src: string, muted?: boolean) => void
  onPlayStop: () => void
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

  const [currentRecord, setCurrentRecord] = useState(0)
  const [isRecording, setIsRecording] = useState(false)

  function onRecordStart() {
    if (isRecording) {
      showToast({ title: '正在录音' })
      return
    }
    setIsRecording(true)
  }

  function onRecordStop() {
    setIsRecording(false)
  }

  // if hasRecord[current]
  //
  // else
  //  auto play audio

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
        onChange={e => setCurrentRecord(e.detail.current)}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <SwiperItem>
            <AudioItem
              key={i}
              dataKey={i}
              data={{}}
              onRecordStart={onRecordStart}
              onRecordStop={onRecordStop}
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
