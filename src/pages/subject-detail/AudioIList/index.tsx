import './index.scss'
import Taro, { FC, useState, useRef, useEffect } from '@tarojs/taro'
import { Button, View } from '@tarojs/components'
import { AudioItem } from './Item'
import EE from 'eventemitter3'
import { POST } from '../../../utils/ajax'
import { hideLoading, showLoading } from '../../../utils'

export interface Record {
  resourcesId: string
  resourcesUrl: string
  memberRecordUrl: string
  memberCurriculumRecordId: string
}

export const AudioList: FC<{ subjectId }> = props => {
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

  //#region currentRecord
  const [currentRecord, setCurrentRecord] = useState<number>()

  const eventBus = useRef(new EE())
  useEffect(() => {
    return () => {
      eventBus.current && eventBus.current.removeAllListeners()
    }
  }, [])

  function onRecordStart(dataKey: number) {
    if (dataKey !== currentRecord) {
      eventBus.current.emit('stop', currentRecord)
    }
    setCurrentRecord(dataKey)
  }

  function onRecordStop() {
    setCurrentRecord(undefined)
  }
  //#endregion

  return (
    <View>
      {currentRecord}
      <View className='audio-list'>
        {Array.from({ length: 9 }).map((_, i) => (
          <AudioItem
            key={i}
            dataKey={i}
            data={{}}
            onRecordStart={onRecordStart}
            onRecordStop={onRecordStop}
            eventBus={eventBus.current}
          />
        ))}
      </View>
      <View className='action-bar'>
        <Button className='btn-primary'>配音完成</Button>
      </View>
    </View>
  )
}
