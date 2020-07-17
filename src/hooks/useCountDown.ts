import { useCallback, useEffect, useState } from '@tarojs/taro'

export const useCountDown = (timeToCount = 60 * 1000, interval = 1000) => {
  const [timeLeft, setTimeLeft] = useState(0)

  const start = useCallback(
    newTimeToCount =>
      setTimeLeft(newTimeToCount !== undefined ? newTimeToCount : timeToCount),
    [timeToCount]
  )

  let timer: any = null

  useEffect(() => {
    if (timeLeft === 0) {
      return
    }

    clearTimeout(timer)
    timer = setTimeout(() => {
      const nextSecondsLeft = timeLeft - interval > 0 ? timeLeft - interval : 0
      setTimeLeft(nextSecondsLeft)
    }, interval)

    return () => clearTimeout(timer)
  }, [timeLeft, timer])

  return [timeLeft, start]
}
