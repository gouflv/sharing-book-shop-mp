import Taro, {
  useRef,
  InnerAudioContext,
  useEffect,
  useState
} from '@tarojs/taro'

export const useAudioPlayer = () => {
  const player = useRef<InnerAudioContext>()
  const callbackFun = useRef<() => void>()
  const [playing, setPlaying] = useState(false)

  function execCallback() {
    if (callbackFun.current) {
      callbackFun.current()
      callbackFun.current = undefined
    }
  }

  useEffect(() => {
    if (!player.current) {
      player.current = Taro.createInnerAudioContext()
    }
    return () => {
      if (player.current) {
        player.current.destroy()
      }
    }
  }, [])

  function startPlay(params: {
    src: string
    play?: boolean
    loop?: boolean
    onGetDuration?: (duration: number) => void
    onFinish?: () => void
  }) {
    console.log('[Player] startPlay', params)

    if (!params.src) {
      return
    }
    callbackFun.current = params.onFinish
    if (player.current) {
      player.current.src = params.src
      player.current.seek(0)
      player.current.loop =
        typeof params.loop === 'undefined' ? false : params.loop

      player.current.offEnded()
      player.current.onEnded(() => {
        console.log('[Player] onEnd')
        setPlaying(false)
        execCallback()
      })

      if (params.onGetDuration) {
        getDuration().then(value => {
          params.onGetDuration && params.onGetDuration(value)
        })
      }

      if (typeof params.play === 'undefined' || params.play) {
        setPlaying(true)
        player.current.play()
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
        console.log('[Player] run', player.current && player.current.duration)
        if (player.current && player.current.duration) {
          console.log('[Player] getDuration', player.current.duration)
          resolve(player.current.duration * 1000)
        } else {
          if (tryCount < 20) {
            setTimeout(run, 100)
          } else {
            console.error('[Player] getDuration failed')
            resolve(120 * 1000)
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
    stopPlay,
    playing
  }
}
