import './index.scss'
import Taro, { FC } from '@tarojs/taro'
import { Image, RichText, Video, View } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import classNames from 'classnames'
import { AudioList } from './AudioIList'
import { CommentList } from './CommentList'
import useState = Taro.useState

const Page: FC = () => {
  const [tab, setTab] = useState(1)

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
          <View
            className={classNames('tab-item', { active: tab === 0 })}
            onClick={() => setTab(0)}
          >
            简介
          </View>
          <View
            className={classNames('tab-item', { active: tab === 1 })}
            onClick={() => setTab(1)}
          >
            配音
          </View>
          <View
            className={classNames('tab-item', { active: tab === 2 })}
            onClick={() => setTab(2)}
          >
            评论
          </View>
        </View>

        <View className='page-space-around'>
          {tab === 0 && (
            <View className='subject-summary'>
              <View className='header'>
                <View className='title'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Cumque, ipsa!
                </View>
                <View className='action text-second'>
                  <View className='share'>
                    <Image
                      src={require('../../assets/course_detail_ico_share@2x.png')}
                    />
                    分享
                  </View>
                </View>
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
          )}

          {tab === 1 && <AudioList />}

          {tab === 2 && <CommentList />}
        </View>
      </PageHeaderWrapper>
    </View>
  )
}

export default Page
