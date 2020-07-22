import Taro from '@tarojs/taro'

export const APP_NAME = '共读未来'
export const API_BASE = 'https://www.fzgdwl.com//fzgdwl/api'

export const isDev = Taro.getSystemInfoSync().platform === 'devtools'
console.log('isDev', isDev)
