import './index.scss'
import Taro, {
  createVideoContext,
  FC,
  useEffect,
  useRef,
  useRouter,
  useScope,
  useState,
  VideoContext
} from '@tarojs/taro'
import { Image, RichText, Video, View } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import classNames from 'classnames'
import { AudioList } from './AudioList'
import { CommentList } from './CommentList'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import { POST } from '../../utils/ajax'
import { hideLoading, showLoading, textToRichText } from '../../utils'

const Page: FC = () => {
  const router = useRouter()
  const scope = useScope()
  const [subjectId, setSubjectId] = useState('')

  //#region data
  const [data, setData] = useState<any>({})
  const [loading, setLoading] = useState(true)

  async function fetch() {
    showLoading()
    const res = await POST('curriculum/getCurriculumById', {
      data: {
        curriculumId: router.params.id
      }
    })
    setData(res)
    setHasVideo(res.isVideo === 1)
    setVideoSrcOrigin(res.curriculumVideo)
    hideLoading()
    setLoading(false)
  }

  function report() {
    POST('curriculum/addCurriculumVideoViewsNum', {
      data: {
        curriculumId: router.params.id
      }
    })
  }

  useEffect(() => {
    setSubjectId(router.params.id)
    fetch()
    report()
  }, [])
  //#endregion

  //#region tab
  const [tab, setTab] = useState<'summary' | 'audioList' | 'comments'>(
    'audioList'
  )

  useEffect(() => {
    if (!hasVideo) {
      Taro.pageScrollTo({ scrollTop: 0, duration: 0 })
    }
  }, [tab])
  //#endregion

  //#region video state
  const videoContext = useRef<VideoContext>()

  const [hasVideo, setHasVideo] = useState(true)
  const [videoSrcOrigin, setVideoSrcOrigin] = useState('')
  const [videoSrc, setVideoSrc] = useState('')
  const [muted, setMuted] = useState(false)
  function onRecordStart(src: string) {
    setVideoSrc(src)
    if (videoContext.current) {
      setMuted(true)
      videoContext.current.play()
    }
  }
  function onRecordStop() {
    if (videoContext.current) {
      videoContext.current.stop()
      videoContext.current.seek(0)
    }
  }
  function onPlayStart(src: string, muted = true) {
    setVideoSrc(src)
    if (videoContext.current) {
      setMuted(muted)
      videoContext.current.play()
    }
  }
  function onPlayStop() {
    onRecordStop()
  }

  useEffect(() => {
    if (hasVideo) {
      videoContext.current = createVideoContext('player', scope)
    }
  }, [loading])

  useEffect(() => {
    if (tab === 'summary' || tab === 'comments') {
      // setTimeout(() => {
      //   onPlayStart(videoSrcOrigin, false)
      // }, 500)
    } else {
      //
    }
  }, [tab])
  //#endregion

  const renderTabs = () => {
    return (
      <View
        className={classNames('tabs', {
          'tabs--header': !hasVideo
        })}
      >
        <View
          className={classNames('tab-item', { active: tab === 'summary' })}
          onClick={() => setTab('summary')}
        >
          简介
        </View>
        <View
          className={classNames('tab-item', { active: tab === 'audioList' })}
          onClick={() => setTab('audioList')}
        >
          配音
        </View>
        <View
          className={classNames('tab-item', { active: tab === 'comments' })}
          onClick={() => setTab('comments')}
        >
          评论
        </View>
      </View>
    )
  }

  return (
    <View className='page-subject-detail'>
      <PageHeaderWrapper title={'课程'}>
        {!loading && (
          <View>
            {hasVideo ? (
              <View>
                <Video
                  id='player'
                  className='player'
                  src={videoSrc}
                  title={data.curriculumName}
                  muted={muted}
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
          </View>
        )}

        {!loading && (
          <View className='page-space-around'>
            {tab === 'summary' && (
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
                  <RichText nodes={textToRichText(data.curriculumIntroduce)} />
                </View>
              </View>
            )}

            {tab === 'audioList' && (
              <AudioList
                subjectId={subjectId}
                hasVideo={hasVideo}
                onRecordStart={onRecordStart}
                onRecordStop={onRecordStop}
                onPlayStart={onPlayStart}
                onPlayStop={onPlayStop}
              />
            )}

            {tab === 'comments' && <CommentList subjectId={subjectId} />}
          </View>
        )}
      </PageHeaderWrapper>
    </View>
  )
}

export default Page
