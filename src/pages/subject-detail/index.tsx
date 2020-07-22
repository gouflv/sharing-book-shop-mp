import './index.scss'
import Taro, {
  createVideoContext,
  FC,
  useEffect,
  useLayoutEffect,
  useRef,
  useRouter,
  useScope,
  useState,
  VideoContext
} from '@tarojs/taro'
import {
  Image,
  RichText,
  Video,
  View,
  CoverView,
  CoverImage
} from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import classNames from 'classnames'
import { AudioList } from './AudioList'
import { CommentList } from './CommentList'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import { POST } from '../../utils/ajax'
import { hideLoading, showLoading, textToRichText } from '../../utils'
import _debounce from 'lodash.debounce'
import { isDev } from '../../config'
import { VideoDescBtn } from './VideoDesc/Btn'
import { VideoDescModal } from './VideoDesc/Modal'
import { useAudioPlayer } from './AudioList/useAudioPlayer'

export interface VideoStateForUpdate {
  src: string
  desc: string
  muted: boolean
  play: boolean
  audio: string
}

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
    setShowAudioList(res.isVoice === 1)
    setVideoSrcOrigin(res.curriculumVideo)
    if (tab === 'summary') {
      setVideoSrc(res.curriculumVideo)
    }
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
    'summary'
  )
  const [showAudioList, setShowAudioList] = useState(true)

  useEffect(() => {
    if (!hasVideo) {
      Taro.pageScrollTo({ scrollTop: 0, duration: 0 })
    }
  }, [tab])
  //#endregion

  //#region video state
  const videoContext = useRef<VideoContext>()
  const { startPlay, stopPlay } = useAudioPlayer()

  const [hasVideo, setHasVideo] = useState(true)
  const [videoSrcOrigin, setVideoSrcOrigin] = useState('')
  const [videoSrc, setVideoSrc] = useState('')
  const [muted, setMuted] = useState(false)
  const [videoDuration, setVideoDuration] = useState(0)

  const setVideoState = _debounce((params: VideoStateForUpdate) => {
    console.log('[SetVideoState]', params)
    if (hasVideo) {
      if (params.src !== videoSrc) {
        setVideoDuration(0)
      }
      setVideoSrc(params.src)
      setMuted(params.muted)
      setDescModalContent(params.desc)

      if (videoContext.current) {
        videoContext.current.seek(0)
        if (params.play) {
          setTimeout(() => {
            videoContext.current && videoContext.current.play()
          }, 100)
        } else {
          videoContext.current.stop()
        }
      }
    } else {
      //TODO test
      if (!params.muted) {
        startPlay({
          src: params.audio,
          loop: true,
          onGetDuration: duration => setVideoDuration(duration),
          onFinish: () => {}
        })
      }
    }
  }, 800)

  function setVideoStop() {
    if (videoContext.current) {
      videoContext.current.stop()
      videoContext.current.seek(0)
    }
  }

  function onLoadedMetaData(durationInSec: number) {
    setVideoDuration(durationInSec * 1000)
    console.log('[onLoadedMetaData]: videoDuration', durationInSec * 1000)
  }

  useLayoutEffect(() => {
    if (!loading && hasVideo) {
      videoContext.current = createVideoContext('player', scope)
    }
  }, [loading, hasVideo])

  //#endregion

  //#region videoBtn and Dialog
  const [isFullscreen, setIsFullscreen] = useState(false)
  function onFullscreenChange(isFull: boolean) {
    setIsFullscreen(isFull)
  }
  const [descModalContent, setDescModalContent] = useState('')
  const [descModalVisible, setDescModalVisible] = useState(false)
  //#endregion

  useEffect(() => {
    if (loading) {
      return
    }
    if (tab === 'summary') {
      setVideoState({
        src: videoSrcOrigin,
        desc: '',
        muted: false,
        play: !isDev,
        audio: ''
      })
    } else {
      //
    }
  }, [loading, tab])

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
        {showAudioList && (
          <View
            className={classNames('tab-item', { active: tab === 'audioList' })}
            onClick={() => setTab('audioList')}
          >
            配音
          </View>
        )}
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
                <View className='player-container'>
                  <Video
                    id='player'
                    className='player'
                    src={videoSrc}
                    title={data.curriculumName}
                    muted={muted}
                    onLoadedMetaData={e => onLoadedMetaData(e.detail.duration)}
                    onFullscreenChange={e =>
                      onFullscreenChange(e.detail.fullScreen as boolean)
                    }
                  >
                    {descModalContent && (
                      <VideoDescBtn
                        isFullscreen={isFullscreen}
                        onClick={() =>
                          setDescModalVisible(prevState => !prevState)
                        }
                      />
                    )}
                    {descModalVisible && (
                      <VideoDescModal
                        isFullscreen={isFullscreen}
                        content={descModalContent}
                        onClose={() => setDescModalVisible(false)}
                      />
                    )}
                  </Video>
                </View>
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
                videoDuration={videoDuration}
                onSetVideoState={setVideoState}
                onSetVideoStop={setVideoStop}
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
