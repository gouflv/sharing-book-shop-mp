import Taro from '@tarojs/taro'

export function showLoading(props?: Partial<Taro.showLoading.Option>) {
  Taro.showLoading({
    mask: true,
    title: '加载中',
    ...props
  })
}

export function hideLoading() {
  Taro.hideLoading()
}

export function showToast(props: Taro.showToast.Option) {
  setTimeout(() => {
    Taro.showToast({
      icon: 'none',
      duration: 3000,
      ...props
    })
  })
}
