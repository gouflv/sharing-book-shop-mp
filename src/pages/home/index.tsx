import './index.scss'
import { FC } from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { useHeaderSize } from '../../hooks/useHeaderSize'
import { SubjectListItem } from './SubjectListItem'
import { Panel } from '../../components/Panel'

const Page: FC = () => {
  const { statusHeight, headerHeight } = useHeaderSize()

  return (
    <View className={'page-home'}>
      <PageHeaderWrapper title={'共享图书'} hideBackArrow>
        <View
          className={'header-extend with-image-bg'}
          style={{
            marginTop: `-${150 - statusHeight - headerHeight}px`
          }}
        >
          <Image
            mode={'aspectFill'}
            src={require('../../assets/home_top_bg.jpg')}
            className={'bg'}
          />
        </View>

        <View className={'page-space-wing'}>
          <Swiper
            className={'banner'}
            indicatorDots
            indicatorColor={'rgba(#fff, 0.5)'}
            indicatorActiveColor={'#fff'}
          >
            <SwiperItem>
              <Image
                mode={'aspectFill'}
                src={'http://placehold.it/690x220'}
                className={'banner-item'}
              />
            </SwiperItem>
            <SwiperItem>
              <Image
                mode={'aspectFill'}
                src={'http://placehold.it/690x220'}
                className={'banner-item'}
              />
            </SwiperItem>
          </Swiper>

          <Panel>
            {Array.from({ length: 8 }).map((_, i) => (
              <SubjectListItem key={i} />
            ))}
          </Panel>
        </View>
      </PageHeaderWrapper>
    </View>
  )
}

export default Page
