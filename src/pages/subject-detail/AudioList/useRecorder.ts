import Taro, {
  useState,
  useRef,
  useEffect,
  RecorderManager
} from '@tarojs/taro'

type CallbackFun = (file: string) => void

export const useRecorder = () => {
  const recorder = useRef<RecorderManager>()
  const callbackFun = useRef<CallbackFun>()
  const [isStart, setIsStart] = useState(false)

  useEffect(() => {
    recorder.current = Taro.getRecorderManager()
    if (recorder.current) {
      recorder.current.onStart(() => {
        console.log('recorder start')
        setIsStart(true)
      })

      recorder.current.onPause(
        () => recorder.current && recorder.current.stop()
      )

      recorder.current.onStop(({ tempFilePath }) => {
        console.log('recorder stop')
        setIsStart(false)
        if (callbackFun.current) {
          callbackFun.current(tempFilePath)
          callbackFun.current = undefined
        }
      })
    }
  }, [])

  function startRecord(params: { duration: number; onFinish: CallbackFun }) {
    if (isStart) {
      return
    }
    callbackFun.current = params.onFinish
    if (recorder.current) {
      console.log('recorder: start', params.duration)
      recorder.current.start({
        duration: params.duration || 30_000
      })
    }
  }

  function stopRecord() {
    setIsStart(false)
    recorder.current && recorder.current.stop()
  }

  return {
    startRecord,
    stopRecord
  }
}
