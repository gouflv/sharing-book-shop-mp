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
      formData: {
        token: token
      },
      name: 'file',
      filePath: choose.tempFilePaths[0],
      success: function (res) {
        const data: UploadFile = JSON.parse(res.data).data
        props.onChange([...props.value, data])
      },
      fail: function (res) {
        showToast({ title: res.errMsg })
      },
      complete: function () {
        hideLoading()
      }
    })
  }

  function onRemoveFile(index: number) {
    props.onChange(props.value.splice(index, 1))
  }

  return (
    <View className='uploader'>
      <View className='btn-upload' onClick={onUploadClick}>
        <Image src={require('../../../assets/plus.png')} />
      </View>

      {Array.from({ length: 3 }).map((_, i) => (
        <View key={i} className='item'>
          <Image
            className='img'
            src={'http://placehold.it/150x150'}
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
