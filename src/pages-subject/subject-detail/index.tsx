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
import { Button, Image, RichText, Video, View } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import classNames from 'classnames'
import { AudioList } from './AudioList'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import { POST } from '../../utils/ajax'
import {
  addResTimestamp,
  hideLoading,
  showLoading,
  textToRichText
} from '../../utils'
import _debounce from 'lodash.debounce'
import { VideoDescBtn } from './VideoDesc/Btn'
import { VideoDescModal } from './VideoDesc/Modal'
import { useAudioPlayer } from './AudioList/useAudioPlayer'
import { useAppShare } from '../../hooks/useAppShareMessage'

export interface VideoStateForUpdate {
  src: string
  desc: string
  muted: boolean
  play: boolean
}

const Page: FC = () => {
  const router = useRouter()
  const scope = useScope()
  const [subjectId] = useState(router.params.id)

  useAppShare(`/pages-subject/subject-detail/index?id=${subjectId}`)

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
    fetch()
    report()
  }, [])
  //#endregion

  //#region tab
  const [tab, setTab] = useState<
    'summary' | 'guide' | 'audioList' | 'interaction'
  >('summary')
  const [showAudioList, setShowAudioList] = useState(true)

  useEffect(() => {
    if (!hasVideo) {
      Taro.pageScrollTo({ scrollTop: 0, duration: 0 })
    }
  }, [tab])
  //#endregion

  //#region video state
  const videoContext = useRef<VideoContext>()
  const { stopPlay, playing } = useAudioPlayer()

  const [hasVideo, setHasVideo] = useState(true)
  const [videoSrcOrigin, setVideoSrcOrigin] = useState('')
  const [videoSrc, setVideoSrc] = useState('')
  const [muted, setMuted] = useState(false)
  const [videoDuration, setVideoDuration] = useState(120_000)

  const setVideoState = _debounce((params: VideoStateForUpdate) => {
    console.log('[SetVideoState]', params)
    setVideoDuration(0)

    if (params.src !== videoSrc) {
      setVideoSrc(params.src)
    }
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
  }, 1000)

  function setVideoStop() {
    if (hasVideo && videoContext.current) {
      videoContext.current.stop()
      videoContext.current.seek(0)
    }
    if (!hasVideo) {
      stopPlay()
    }
  }

  function onLoadedMetaData(durationInSec: number) {
    setVideoDuration(durationInSec * 1000)
    console.log('[onLoadedMetaData]: videoDuration', durationInSec * 1000)
  }

  function onVideoPlayEnd() {
    if (playing) {
      stopPlay()
    }
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
    if (hasVideo && tab !== 'audioList' && videoSrc !== videoSrcOrigin) {
      setVideoState({
        src: videoSrcOrigin,
        desc: '',
        muted: false,
        play: false
        // audio: ''
      })
    }
    if (!hasVideo && tab !== 'audioList') {
      stopPlay()
    }
  }, [loading, tab])

  const renderTabs = () => {
    return (
      <View
        className={classNames('tabs', {
          'tabs--header': false
        })}
      >
        <View
          className={classNames('tab-item', { active: tab === 'summary' })}
          onClick={() => setTab('summary')}
        >
          阅前必读
        </View>
        <View
          className={classNames('tab-item', { active: tab === 'guide' })}
          onClick={() => setTab('guide')}
        >
          过程指导
        </View>
        {showAudioList && (
          <View
            className={classNames('tab-item', { active: tab === 'audioList' })}
            onClick={() => setTab('audioList')}
          >
            互动配音
          </View>
        )}
        <View
          className={classNames('tab-item', { active: tab === 'interaction' })}
          onClick={() => setTab('interaction')}
        >
          阅后游戏
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
                    src={addResTimestamp(videoSrc)}
                    title={data.curriculumName}
                    muted={muted}
                    onLoadedMetaData={e => onLoadedMetaData(e.detail.duration)}
                    onEnded={onVideoPlayEnd}
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
                {/*<PageHeaderExt fixed height={'90rpx'}>*/}
                {/*  {renderTabs()}*/}
                {/*</PageHeaderExt>*/}
                {/*<View style={{ height: '90rpx' }} />*/}
                <View className='brand-container'>
                  <Image src={data.curriculumImageUrl} mode={'aspectFit'} />
                </View>
                {renderTabs()}
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
                    <Button className='share' openType={'share'}>
                      <Image
                        src={require('../../assets/course_detail_ico_share@2x.png')}
                      />
                      分享
                    </Button>
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
                  <RichText
                    nodes={textToRichText(data.curriculumIntroduce || '')}
                  />
                </View>
              </View>
            )}
            {tab === 'guide' && (
              <View className='subject-summary'>
                <View className='content'>
                  <RichText nodes={textToRichText(data.guidance || '')} />
                </View>
              </View>
            )}

            {tab === 'audioList' && (
              <AudioList
                subjectId={subjectId}
                hasVideo={hasVideo}
                videoDuration={videoDuration}
                setAudioDuration={duration => setVideoDuration(duration)}
                onSetVideoState={setVideoState}
                onSetVideoStop={setVideoStop}
              />
            )}

            {tab === 'interaction' && (
              <View className='subject-summary'>
                <View className='content'>
                  <RichText nodes={textToRichText(data.interaction || '')} />
                </View>
              </View>
            )}
          </View>
        )}
      </PageHeaderWrapper>
    </View>
  )
}

export default Page
