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
  hideLoading()
  setTimeout(() => {
    Taro.showToast({
      icon: 'none',
      duration: 3000,
      mask: true,
      ...props
    })
  })
}

export function textToRichText(val: string = '') {
  return `<p>${val.replace(/\r?\n/g, '<br /><br />')}</p>`
}
