import './index.scss'
import Taro, { FC, useEffect, useRouter, useState } from '@tarojs/taro'
import { Image, RichText, Video, View } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import classNames from 'classnames'
import { AudioList } from './AudioIList'
import { CommentList } from './CommentList'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import { POST } from '../../utils/ajax'
import { hideLoading, showLoading } from '../../utils'

const Page: FC = () => {
  const router = useRouter()
  const [subjectId, setSubjectId] = useState('')
  const [data, setData] = useState<any>()

  async function fetch() {
    showLoading()
    const res = await POST('curriculum/getCurriculumById', {
      data: {
        curriculumId: router.params.id
      }
    })
    setData(res)
    setHasVideo(res.isVideo)

    hideLoading()
  }

  useEffect(() => {
    setSubjectId(router.params.id)
    fetch()
  }, [])

  const [hasVideo, setHasVideo] = useState(false)
  const [tab, setTab] = useState(0)

  useEffect(() => {
    if (!hasVideo) {
      Taro.pageScrollTo({ scrollTop: 0, duration: 0 })
    }
  }, [tab])

  const renderTabs = ({ fixed }: { fixed?: boolean } = {}) => {
    return (
      <View
        className={classNames('tabs', {
          'tabs--header': !hasVideo
        })}
      >
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
    )
  }

  return (
    <View className='page-subject-detail'>
      <PageHeaderWrapper title={'课程'}>
        {hasVideo ? (
          <View>
            <Video
              src={data.curriculumVideo}
              title={data.curriculumName}
              poster={data.curriculumImageUrl}
            />
            {renderTabs()}
          </View>
        ) : (
          <View>
            <PageHeaderExt fixed height={'90rpx'}>
              {renderTabs()}
            </PageHeaderExt>
            <View style={{ height: '90rpx' }} />
          </View>
        )}

        {data && (
          <View className='page-space-around'>
            {tab === 0 && (
              <View className='subject-summary'>
                <View className='header'>
                  <View className='title'>{data.curriculumName}</View>
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
                  <View className='d'>
                    <Image
                      src={require('../../assets/course_ico_play_b@2x.png')}
                    />
                    {data.curriculumVideoViews || 0}
                  </View>
                  <View className='d'>{data.curriculumJoinNum || 0}人配音</View>
                  <View className='d'>
                    <Image
                      src={require('../../assets/course_ico_class@2x.png')}
                    />
                    {data.curriculumNum || 0}课
                  </View>
                </View>
                <View className='content'>
                  <RichText nodes={`${data.curriculumIntroduce}`} />
                </View>
              </View>
            )}

            {tab === 1 && <AudioList />}

            {tab === 2 && <CommentList subjectId={subjectId} />}
          </View>
        )}
      </PageHeaderWrapper>
    </View>
  )
}

export default Page
