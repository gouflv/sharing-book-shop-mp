import './index.scss'
import Taro, { FC, useState, useRef, useEffect } from '@tarojs/taro'
import { Button, View } from '@tarojs/components'
import { AudioItem } from './Item'
import EE from 'eventemitter3'

export const AudioList: FC = () => {
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
