import './index.scss'
import Taro, { FC } from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { useHeaderSize } from '../../hooks/useHeaderSize'
import { SubjectCard } from './SubjectCard'

const Page: FC = () => {
  const { statusHeight, headerHeight } = useHeaderSize()
  return (
    <View className='page-subject'>
      <PageHeaderWrapper title={'精品课程'} hideBackArrow>
        <View className={'tabs-container with-image-bg'}>
          <Image
            mode={'aspectFill'}
            src={require('../../assets/home_top_bg.jpg')}
            className={'bg'}
            style={{ marginTop: `-${150 - statusHeight - headerHeight}px` }}
          />
          <View className='tabs'>
            {Array.from({ length: 8 }).map((_, i) => (
              <View className={`tab-item ${!i && 'active'}`} key={i}>
                精品课程
              </View>
            ))}
          </View>
        </View>

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
