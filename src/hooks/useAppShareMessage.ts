import { APP_NAME } from '../config'
import { useShareAppMessage } from '@tarojs/taro'

export function useAppShare(page?: string) {
  useShareAppMessage(() => {
    console.log(
      '[useShareAppMessage add land-page]',
      encodeURIComponent(page || '')
    )
    return {
      title: APP_NAME,
      path: `/pages/index/index?landPage=${encodeURIComponent(page || '')}`
    }
  })
}
