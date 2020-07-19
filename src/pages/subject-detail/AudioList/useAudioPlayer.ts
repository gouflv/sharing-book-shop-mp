import Taro, { useRef, InnerAudioContext, useEffect } from '@tarojs/taro'

export const useAudioPlayer = () => {
  const player = useRef<InnerAudioContext>()

  useEffect(() => {
    player.current = Taro.createInnerAudioContext()
  }, [])

  function startPlay(src: string) {
    if (player.current) {
      player.current.src = src
      player.current.seek(0)
      player.current.play()
    }
  }

  function stopPlay() {
    player.current && player.current.stop()
  }

  return {
    startPlay,
    stopPlay
  }
}
