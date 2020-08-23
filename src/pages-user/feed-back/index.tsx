import './index.scss'
import Taro, { FC, useState, useEffect } from '@tarojs/taro'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { Button, View } from '@tarojs/components'
import { AtTextarea } from 'taro-ui'
import { Uploader } from './Uploader'
import { defaultErrorHandler, POST } from '../../utils/ajax'
import classNames from 'classnames'
import { hideLoading, showLoading, showToast } from '../../utils'

export interface UploadFile {
  url
}

const Page: FC = () => {
  const [options, setOptions] = useState<{ name; code }[]>([])
  useEffect(() => {
    async function fetch() {
      showLoading()
      const data = await POST('wxMember/getComplaintsLable')
      setOptions(data)
      hideLoading()
    }
    fetch()
  }, [])

  // formData
  const [label, setLabel] = useState('')
  const [content, setContent] = useState('')
  const [images, setImages] = useState<UploadFile[]>([])

  async function onSubmit() {
    //TODO validate

    try {
      showLoading()
      const data = { lable: label, content } as any
      if (images.length) {
        data.images = images.map(img => img.url).join(',')
      }

      await POST('wxMember/addComplaintsLable', {
        data
      })
      showToast({ title: '提交成功', icon: 'success' })
      setTimeout(() => {
        Taro.navigateBack()
      }, 2000)
    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      hideLoading()
    }
  }

  return (
    <View className='page-feed-back'>
      <PageHeaderWrapper
        title={'意见反馈'}
        bg={require('../../assets/vip_top_bg2.jpg')}
        bgHeight={'490rpx'}
      >
        <PageHeaderExt
          absolute
          height={'140rpx'}
          bg={require('../../assets/vip_top_bg2.jpg')}
          bgHeight={'490rpx'}
        />

        <View className='page-space-around'>
          <View className='box'>
            <View className='type-selector'>
              {options.map((op, i) => (
                <View
                  key={i}
                  className={classNames('option', {
                    selected: op.name === label
                  })}
                  onClick={() => setLabel(op.name)}
                >
                  {op.name}
                </View>
              ))}
            </View>

            <View className='form'>
              <View className='label'>具体建议内容</View>
              <View className='control'>
                <AtTextarea
                  value={content}
                  onChange={val => setContent(val)}
                  maxLength={200}
                  placeholder={'请提交使用建议'}
                />
              </View>

              <View className='label'>上传图片</View>
              <View className='control'>
                <Uploader value={images} onChange={val => setImages(val)} />
              </View>

              <Button className='btn-primary' onClick={onSubmit}>
                提交
              </Button>
            </View>
          </View>
        </View>
      </PageHeaderWrapper>
    </View>
  )
}

export default Page
