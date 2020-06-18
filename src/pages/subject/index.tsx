import './index.scss'
import Taro, { FC } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { SubjectCard } from './SubjectCard'
import classNames from 'classnames'
import { PageHeaderExt } from '../../components/PageHeaderExt'

const Page: FC = () => {
  return (
    <View className='page-subject'>
      <PageHeaderWrapper title={'精品课程'} hideBackArrow>
        <PageHeaderExt fixed height={'90rpx'}>
          <View className='tabs'>
            {Array.from({ length: 8 }).map((_, i) => (
              <View
                className={classNames({ 'tab-item': 1, active: !i })}
                key={i}
              >
                精品课程
              </View>
            ))}
          </View>
        </PageHeaderExt>

        <View style={{ height: '90rpx' }} />

        <View className='page-space-around grid-list'>
          {Array.from({ length: 21 }).map((_, i) => (
            <SubjectCard key={i} />
          ))}
        </View>
      </PageHeaderWrapper>
    </View>
  )
}

export default Page
