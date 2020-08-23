import './index.scss'
import { FC, useContext } from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import { UploadFile } from '../index'
import { hideLoading, showLoading, showToast } from '../../../utils'
import { AppStore } from '../../../store/AppStore'
import { API_BASE } from '../../../config'

export const Uploader: FC<{
  value: UploadFile[]
  onChange: (value: UploadFile[]) => void
}> = props => {
  const { token } = useContext(AppStore)

  async function onUploadClick() {
    const choose = await Taro.chooseImage({
      count: 1
    })

    showLoading({ title: '正在上传' })

    Taro.uploadFile({
      url: `${API_BASE}/common/upload`,
      header: {
        token: token
      },
      formData: {
        type: 'WxUpload'
      },
      name: 'file',
      filePath: choose.tempFilePaths[0],
      success: res => {
        try {
          const { url } = JSON.parse(res.data).data
          props.onChange([...props.value, { url }])
        } catch (e) {
          console.error(e)
        }
      },
      fail: res => {
        showToast({ title: res.errMsg })
      },
      complete: () => {
        hideLoading()
      }
    })
  }

  async function onRemoveFile(index: number) {
    await Taro.showModal({
      title: '确认删除',
      success: result => {
        if (result.confirm) {
          const val = [...props.value]
          val.splice(index, 1)
          props.onChange(val)
        }
      }
    })
  }

  return (
    <View className='uploader'>
      <View className='btn-upload' onClick={onUploadClick}>
        <Image src={require('../../../assets/plus.png')} />
      </View>

      {props.value &&
        props.value.map((file, i) => (
          <View key={i} className='item'>
            <Image
              className='img'
              src={file.url || 'http://placehold.it/150x150'}
              mode={'aspectFill'}
            />
            <Image
              className='close'
              src={require('../../../assets/close.png')}
              onClick={() => onRemoveFile(i)}
            />
          </View>
        ))}
    </View>
  )
}
