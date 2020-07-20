import Taro, {
  useRef,
  InnerAudioContext,
  useEffect,
  useState
} from '@tarojs/taro'

export const useAudioPlayer = () => {
  const player = useRef<InnerAudioContext>()
  const callbackFun = useRef<() => void>()
  const [loop, setLoop] = useState(false)

  useEffect(() => {
    player.current = Taro.createInnerAudioContext()

    if (player.current) {
      player.current.onStop(() => {
        console.log('player stop')
        if (callbackFun.current) {
          callbackFun.current()
        }
      })
      player.current.onPause(() => {
        console.log('player pause')
        if (callbackFun.current) {
          callbackFun.current()
        }
      })
    }

    return () => {
      if (player.current) {
        player.current.destroy()
      }
    }
  }, [])

  function startPlay(src: string, onFinish: () => void, loop = false) {
    callbackFun.current = onFinish
    setLoop(loop)
    if (player.current) {
      player.current.src = src
      player.current.seek(0)
      player.current.play()
      if (!loop) {
        _tryGetDuration()
      }
    }
  }

  function _tryGetDuration() {
    if (!player.current) {
      return
    }
    let time = 0
    function loop() {
      if (player.current && player.current.duration) {
        console.log('durationInSec', player.current.duration)
        _startPlayTimer(player.current.duration)
        return
      } else {
        time += 1
        time < 10 && setTimeout(loop, 100)
      }
    }
    loop()
  }

  function _startPlayTimer(durationInSec) {
    setTimeout(() => {
      console.log('player stop')
      if (callbackFun.current) {
        callbackFun.current()
      }
    }, durationInSec * 1000)
  }

  function stopPlay() {
    player.current && player.current.stop()
  }

  return {
    startPlay,
    stopPlay
  }
}
