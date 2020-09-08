import Taro, { useEffect, useState } from '@tarojs/taro'

export function useSubscribeMessage(tmplId: string) {
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    Taro.getSetting({
      // @ts-ignore
      withSubscriptions: true,
      // @ts-ignore
      success: ({ subscriptionsSetting }) => {
        console.log('[subscriptionsSetting]', subscriptionsSetting)
        if (
          subscriptionsSetting &&
          subscriptionsSetting.mainSwitch &&
          subscriptionsSetting.itemSettings
        ) {
          setIsSubscribed(
            subscriptionsSetting.itemSettings[tmplId] === 'accept'
          )
        }
      }
    })
  }, [])

  function subscribe() {
    return new Promise(resolve => {
      if (isSubscribed) {
        resolve()
        return
      }
      Taro.requestSubscribeMessage({
        tmplIds: [tmplId],
        complete: res => {
          resolve()
        }
      })
    })
  }

  return {
    subscribe
  }
}
