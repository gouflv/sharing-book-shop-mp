import './index.scss'
import Taro, { FC } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { PageHeaderExt } from '../../components/PageHeaderExt'

const Page: FC = () => {
  return (
    <View className={'page-message'}>
      <PageHeaderWrapper title={'我的消息'}>
        <PageHeaderExt absolute height={'90rpx'} />
      </PageHeaderWrapper>

      <View style={{ height: '20rpx' }} />

      <View className='page-space-wing'>
        <View className={'list'}>
          {Array.from({ length: 10 }).map((_, i) => (
            <View key={i} className='message d-flex'>
              <View className='date flex-auto'>
                <View>2020</View>
                <View className='text-second'>06/01</View>
              </View>
              <View className='content flex-fill'>
                <View className='title'>Lorem ipsum dolor sit.</View>
                <View className='desc'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste
                  itaque modi mollitia officiis sunt? Consectetur eius impedit
                  iure nostrum suscipit.
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default Page
