import './index.scss'
import Taro, {
  FC,
  useContext,
  useEffect,
  useState,
  useDidShow
} from '@tarojs/taro'
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
import { useAuthGuard } from '../../hooks/useAuthGuard'
import { APP_NAME } from '../../config'
import { NotificationService } from '../../store/NotificationService'
import BasicPageWrapper from '../../components/BasicPageWrapper'

const Page: FC = () => {
  const { user } = useContext(AppStore)
  const { checkNotify } = useContext(NotificationService)
  const { withAuth } = useAuthGuard()

  const { setTabIndex } = useContext(AppStore)
  const { statusHeight, headerHeight } = useHeaderSize()

  const [loading, setLoading] = useState(true)
  const [banners, setBanners] = useState<any[]>([])
  const [subjectItems, setSubjectItems] = useState<any[]>([])

  async function fetchBanner() {
    showLoading()
    const res = await POST('common/getBanner', { withoutToken: !user })
    setBanners(res)
  }
  async function fetchList() {
    showLoading()
    const res = await POST('curriculum/getIndexCurriculum', {
      withoutToken: !user
    })
    setSubjectItems(res)
    setLoading(false)
  }

  useEffect(() => {
    fetchBanner()
  }, [])

  useEffect(() => {
    fetchList()
  }, [user])

  useEffect(() => {
    if (!loading) {
      hideLoading()
    }
  }, [loading])

  useDidShow(() => {
    setTimeout(() => {
      checkNotify()
    }, 500)
  })

  return (
    <BasicPageWrapper>
      <View className={'page-home'}>
        <PageHeaderWrapper title={APP_NAME} hideBackArrow>
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
                {banners.map((b, i) => (
                  <SwiperItem key={i}>
                    <Image
                      mode={'aspectFill'}
                      src={
                        b.resourcesUrl ||
                        'http://placehold.it/690x220?text=690x220@1'
                      }
                      className={'banner-item'}
                    />
                  </SwiperItem>
                ))}
              </Swiper>

              <Panel
                title='推荐视频'
                action={'全部课程'}
                onActionClick={() => {
                  withAuth(() => {
                    Taro.switchTab({ url: '/pages/subject/index' })
                    setTabIndex(2)
                  })
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
    </BasicPageWrapper>
  )
}

export default observer(Page)
