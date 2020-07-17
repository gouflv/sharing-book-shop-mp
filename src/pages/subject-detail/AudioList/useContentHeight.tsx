import { useHeaderSize } from '../../../hooks/useHeaderSize'
import Taro, { useEffect, useState } from '@tarojs/taro'

export const useContentHeight = () => {
  const { statusHeight, headerHeight } = useHeaderSize()
  const [contentHeight, setContentHeight] = useState('80vh')
  const [hasVideo, setHasVideo] = useState(true)

  function calc() {
    const videoHeight = hasVideo ? Taro.pxTransform(422) : '0px'
    const tabHeight = Taro.pxTransform(90)
    setContentHeight(
      `calc(100vh - ${
        statusHeight + headerHeight
      }px - ${videoHeight} - ${tabHeight})`
    )
  }

  useEffect(() => {
    calc()
  }, [hasVideo, statusHeight, headerHeight])

  return {
    setHasVideo,
    contentHeight
  }
}
