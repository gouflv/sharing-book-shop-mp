import Taro, {
  useRef,
  InnerAudioContext,
  useEffect,
  useState
} from '@tarojs/taro'

export const useAudioPlayer = () => {
  const player = useRef<InnerAudioContext>()
  const callbackFun = useRef<() => void>()

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
        execCallback()
      })

      if (params.onGetDuration) {
        getDuration().then(value => {
          params.onGetDuration && params.onGetDuration(value)
        })
      }

      player.current.play()
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
          resolve(player.current.duration)
        } else {
          if (tryCount < 20) {
            setTimeout(run, 100)
          } else {
            reject('[Player] getDuration failed')
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
