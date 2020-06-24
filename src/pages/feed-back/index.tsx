import './index.scss'
import Taro, { FC } from '@tarojs/taro'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { Button, View } from '@tarojs/components'
import { AtTextarea } from 'taro-ui'
import { Uploader } from './Uploader'

const Page: FC = () => {
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
              <View className='option selected'>课程太少</View>
              <View className='option'>经常闪退</View>
              <View className='option'>会员异常</View>
              <View className='option'>其他</View>
            </View>

            <View className='form'>
              <View className='label'>具体建议内容</View>
              <View className='control'>
                <AtTextarea
                  value={''}
                  onChange={val => {}}
                  maxLength={200}
                  placeholder={'请提交使用建议'}
                />
              </View>

              <View className='label'>上传图片</View>
              <View className='control'>
                <Uploader />
              </View>

              <Button className='btn-primary'>提交</Button>
            </View>
          </View>
        </View>
      </PageHeaderWrapper>
    </View>
  )
}

export default Page
