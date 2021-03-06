import Taro, { request } from '@tarojs/taro'
import { API_BASE } from '../config'
import { showToast } from './index'
import { app } from '../store/AppStore'

interface AjaxOptions extends Partial<request.Option> {
  preventAuthErrorHandler?: boolean
  withoutToken?: boolean
}

interface AjaxError {
  handler: boolean
  code: number
  message: string
}

export const ajax = (url, options?: AjaxOptions) =>
  new Promise<any | AjaxError>(async (resolve, reject) => {
    const header: any = {
      'content-type': 'application/x-www-form-urlencoded'
    }
    if (!options || !options.withoutToken) {
      header.token = app.token
    }
    const params: request.Option = {
      header,
      url: `${API_BASE}/${url}`,
      ...options
    }
    console.log('[API] request', url, params)
    try {
      const res = await Taro.request(params)
      const { data, statusCode } = res

      if (statusCode === 500 && (!data || data.code === 3000)) {
        showToast({ title: '服务繁忙, 请稍后再试' })
        reject({ handler: true })
        return
      }

      if (data.code === 1001) {
        reject({ ...data, message: data.msg, handler: false })
        if (!options || !options.preventAuthErrorHandler) {
          app.refreshTokenAndRelaunch()
        }
        return
      }

      if (data.code !== 200) {
        reject({ ...data, message: data.msg, handler: false })
        return
      }

      console.log('[API] response:', url, data.data)
      resolve(data.data || {})
    } catch (e) {
      showToast({ title: '网络开小差了' })
      reject({ ...e, handler: true })
    }
  })

export const POST = async (url, options?: AjaxOptions) =>
  ajax(url, { ...options, method: 'POST' })

export const defaultErrorHandler = e => {
  console.error(e)
  if (e.handler) return
  if (e.message) {
    showToast({ title: e.message })
  }
}
