import './index.scss'
import Taro, { FC, useContext } from '@tarojs/taro'
import { Image, Swiper, SwiperItem, View } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { useHeaderSize } from '../../hooks/useHeaderSize'
import { SubjectListItem } from './SubjectListItem'
import { Panel } from '../../components/Panel'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import { AppStore } from '../../store/AppStore'

const Page: FC = () => {
  const { setTab } = useContext(AppStore)
  const { statusHeight, headerHeight } = useHeaderSize()

  return (
    <View className={'page-home'}>
      <PageHeaderWrapper title={'共享图书'} hideBackArrow>
        <PageHeaderExt
          absolute
          height={`${305 / 2 - statusHeight - headerHeight}px`}
        />

        <View className={'page-space-wing'}>
          <Swiper
            className={'banner'}
            indicatorDots
            indicatorColor={'rgba(#fff, 0.5)'}
            indicatorActiveColor={'#fff'}
            circular
            autoplay
          >
            <SwiperItem>
              <Image
                mode={'aspectFill'}
                src={'http://placehold.it/690x220?text=690x220@1'}
                className={'banner-item'}
              />
            </SwiperItem>
            <SwiperItem>
              <Image
                mode={'aspectFill'}
                src={'http://placehold.it/690x220?text=690x220@2'}
                className={'banner-item'}
              />
            </SwiperItem>
            <SwiperItem>
              <Image
                mode={'aspectFill'}
                src={'http://placehold.it/690x220?text=690x220@3'}
                className={'banner-item'}
              />
            </SwiperItem>
          </Swiper>

          <Panel
            title='推荐视频'
            action={'全部课程'}
            onActionClick={() => {
              Taro.switchTab({ url: '/pages/subject/index' })
              setTab(2)
            }}
          >
            <View className={'subject-list'}>
              {Array.from({ length: 8 }).map((_, i) => (
                <SubjectListItem key={i} />
              ))}
            </View>
          </Panel>
        </View>
      </PageHeaderWrapper>
    </View>
  )
}

export default Page
