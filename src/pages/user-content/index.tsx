import './index.scss'
import Taro, { FC, useState } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import classNames from 'classnames'

const Page: FC = () => {
  const [tab, setTab] = useState(0)

  return (
    <View className='page'>
      <PageHeaderWrapper title={'我的作品'}>
        <PageHeaderExt fixed height={'90rpx'}>
          <View className='tabs tabs--header tabs--large'>
            <View
              className={classNames('tab-item', { active: tab === 0 })}
              onClick={() => setTab(0)}
            >
              进行中
            </View>
            <View
              className={classNames('tab-item', { active: tab === 1 })}
              onClick={() => setTab(1)}
            >
              已完成
            </View>
          </View>
        </PageHeaderExt>

        <View style={{ height: '90rpx' }} />

        <View className='page-space-around'>
          <View className='user-content-list'>
            {Array.from({ length: 3 }).map((_, i) => (
              <View key={i} className='item'>
                <Image
                  className='thumb'
                  src={'http://placehold.it/230x140'}
                  mode={'aspectFill'}
                />
                <View className='content'>
                  <View className='title'>Lorem ipsum dolor sit.</View>
                  <View className='desc'>
                    <View className='times'>
                      <Image
                        src={require('../../assets/course_ico_class@2x.png')}
                      />
                      10课
                    </View>
                    <View>100人配音</View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </PageHeaderWrapper>
    </View>
  )
}

export default Page
