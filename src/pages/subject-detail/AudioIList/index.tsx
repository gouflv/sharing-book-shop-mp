import './index.scss'
import Taro, { FC, useEffect, useState } from '@tarojs/taro'
import { Button, Swiper, SwiperItem, View } from '@tarojs/components'
import { AudioItem } from './Item'
import { POST } from '../../../utils/ajax'
import { hideLoading, showLoading } from '../../../utils'
import { useRecord } from './useRecord'
import { useHeaderSize } from '../../../hooks/useHeaderSize'

export interface Record {
  resourcesId: string
  resourcesUrl: string
  memberRecordUrl: string
  memberCurriculumRecordId: string
}

export const AudioList: FC<{ subjectId; hasVideo }> = props => {
  const { statusHeight, headerHeight } = useHeaderSize()
  const [contentHeight, setContentHeight] = useState('80vh')
  useEffect(() => {
    console.log('props.hasVideo', props.hasVideo)
    const videoHeight = props.hasVideo ? Taro.pxTransform(422) : '0px'
    const tabHeight = Taro.pxTransform(90)
    setContentHeight(
      `calc(100vh - ${
        statusHeight + headerHeight
      }px - ${videoHeight} - ${tabHeight})`
    )
  }, [props.hasVideo, statusHeight, headerHeight])

  // list
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

  const {
    currentRecord,
    setCurrentRecord,
    onRecordStart,
    onRecordStop
  } = useRecord()

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
