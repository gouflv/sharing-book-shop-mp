import './index.scss'
import Taro, { FC, useContext, useEffect, useState } from '@tarojs/taro'
import { Image, Swiper, SwiperItem, View } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { useHeaderSize } from '../../hooks/useHeaderSize'
import { SubjectListItem } from './SubjectListItem'
import { Panel } from '../../components/Panel'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import { AppStore } from '../../store/AppStore'
import { observer } from '@tarojs/mobx'
import { POST } from '../../utils/ajax'
import { hideLoading, showLoading } from '../../utils'

const Page: FC = () => {
  const { setTabIndex } = useContext(AppStore)
  const { statusHeight, headerHeight } = useHeaderSize()

  const [loading, setLoading] = useState(true)
  const [banners, setBanners] = useState([])
  const [subjectItems, setSubjectItems] = useState([])

  async function fetch() {
    showLoading()
    const res1 = await POST('common/getBanner')
    const res2 = await POST('curriculum/getIndexCurriculum')
    setBanners(res1)
    setSubjectItems(res2)
    setLoading(false)
    hideLoading()
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <View className={'page-home'}>
      <PageHeaderWrapper title={'共读未来'} hideBackArrow>
        <PageHeaderExt
          absolute
          height={`${305 / 2 - statusHeight - headerHeight}px`}
        />

        {loading ? (
          <View />
        ) : (
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
                setTabIndex(2)
              }}
            >
              <View className={'subject-list'}>
                {subjectItems.map((item, i) => (
                  <SubjectListItem key={i} data={item} />
                ))}
              </View>
            </Panel>
          </View>
        )}
      </PageHeaderWrapper>
    </View>
  )
}

export default observer(Page)
