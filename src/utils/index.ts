import Taro from '@tarojs/taro'
import dayjs from 'dayjs'

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
      duration: 2000,
      mask: true,
      ...props
    })
  })
}

export function textToRichText(val: string = '') {
  return `<p>${val.replace(/\r?\n/g, '<br /><br />')}</p>`
}

export function addResTimestamp(url: string = '') {
  return `${url.trim()}?t=${dayjs().format('YYYY_MM_DD_HH')}`
}

export function encodePhone(val: string) {
  return val.replace(/(\d{3})(\d{4})(.*)/, (_match, $1, _$2, $3) => {
    return [$1, '****', $3].join('')
  })
}
