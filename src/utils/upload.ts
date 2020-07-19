import Taro from '@tarojs/taro'
import { API_BASE } from '../config'
import { hideLoading, showLoading, showToast } from './index'
import { app } from '../store/AppStore'
import { defaultErrorHandler } from './ajax'

export async function commonUpload(file: string) {
  return new Promise<string>((resolve, reject) => {
    showLoading()
    Taro.uploadFile({
      url: `${API_BASE}/common/upload`,
      header: {
        token: app.token
      },
      formData: {
        type: 'WxUpload'
      },
      name: 'file',
      filePath: file,
      success: res => {
        try {
          const url: string = JSON.parse(res.data).data
          resolve(url)
        } catch (e) {
          defaultErrorHandler(e)
          reject(e)
        }
      },
      fail: res => {
        showToast({ title: res.errMsg })
        reject(res.errMsg)
      },
      complete: () => {
        hideLoading()
      }
    })
  })
}
