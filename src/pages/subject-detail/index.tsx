import './index.scss'
import Taro, { FC } from '@tarojs/taro'
import { View, Video, RichText } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import useState = Taro.useState

const Page: FC = () => {
  const [tab, setTab] = useState(0)

  return (
    <View className='page-subject-detail'>
      <PageHeaderWrapper title={'课程'}>
        <View>
          <Video
            src={'https://media.w3.org/2010/05/sintel/trailer.mp4'}
            title={'课程'}
            poster={'http://placehold.it/750x422'}
          />
        </View>

        <View className='tabs'>
          <View className='tab-item active' onClick={() => setTab(0)}>
            简介
          </View>
          <View className='tab-item' onClick={() => setTab(1)}>
            配音
          </View>
          <View className='tab-item' onClick={() => setTab(2)}>
            评论
          </View>
        </View>

        <View className='page-space-around subject-summary'>
          <View className='header'>
            <View className='title'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque,
              ipsa!
            </View>
            <View className='action text-second'>分享</View>
          </View>
          <View className='desc text-second'>
            <View className='d'>10086</View>
            <View className='d'>10人配音</View>
            <View className='d'>10课</View>
          </View>
          <View className='content'>
            <RichText
              nodes={`<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, possimus!</p> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, possimus!</p> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, possimus!</p> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, possimus!</p>`}
            />
          </View>
        </View>
      </PageHeaderWrapper>
    </View>
  )
}

export default Page
