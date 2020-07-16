import { useState } from '@tarojs/taro'

export const useRecord = () => {
  const [currentRecord, setCurrentRecord] = useState(0)

  const [isRecording, setIsRecording] = useState(false)

  function onRecordStart() {
    if (isRecording) {
      return
    }
    setIsRecording(true)
  }
  function onRecordStop() {
    setIsRecording(false)
  }

  return {
    currentRecord,
    setCurrentRecord,

    isRecording,
    onRecordStart,
    onRecordStop
  }
}
