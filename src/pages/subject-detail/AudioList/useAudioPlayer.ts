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

  function execCallback() {
    if (callbackFun.current) {
      callbackFun.current()
      callbackFun.current = undefined
    }
  }

  useEffect(() => {
    player.current = Taro.createInnerAudioContext()
    return () => {
      if (player.current) {
        player.current.destroy()
      }
    }
  }, [])

  function startPlay(params: {
    src: string
    loop?: boolean
    onGetDuration?: (duration: number) => void
    onFinish: () => void
  }) {
    if (!params.src) {
      return
    }
    callbackFun.current = params.onFinish
    setLoop(loop)
    if (player.current) {
      player.current.src = params.src
      player.current.seek(0)
      player.current.loop =
        typeof params.loop === 'undefined' ? false : params.loop
      player.current.play()

      player.current.offEnded()
      player.current.onEnded(() => execCallback())

      if (params.onGetDuration) {
        getDuration().then(value => {
          params.onGetDuration && params.onGetDuration(value)
        })
      }
    }
  }

  function getDuration() {
    return new Promise<number>((resolve, reject) => {
      if (!player.current) {
        reject()
        return
      }
      let tryCount = 0
      function run() {
        if (player.current && player.current.duration) {
          console.log('player getDuration', player.current.duration)
          resolve(player.current.duration)
        } else {
          if (tryCount < 20) {
            setTimeout(run, 100)
          } else {
            reject('player getDuration failed')
          }
          tryCount += 1
        }
      }
      run()
    })
  }

  function stopPlay() {
    player.current && player.current.stop()
  }

  return {
    startPlay,
    stopPlay
  }
}
