import './style.scss'
import Taro, { FC } from '@tarojs/taro'
import { CoverImage, CoverView, Image, View } from '@tarojs/components'

export const VideoDescModal: FC<{
  isFullscreen: boolean
  content: string
  onClose: () => void
}> = ({ isFullscreen, content, onClose }) => {
  if (isFullscreen) {
    return (
      <CoverView
        className={'video-desc-modal video-desc-modal--fixed'}
        onClick={onClose}
      >
        <CoverView className='body'>
          <CoverImage
            className='header'
            src={require('../../../assets/course_detail_ico_book2@2x.png')}
          />
          <CoverView className='content'>{content}</CoverView>
        </CoverView>
      </CoverView>
    )
  }
  return (
    <View className='video-desc-modal' onClick={onClose}>
      <View className='body'>
        <Image
          className='header'
          src={require('../../../assets/course_detai_popup_book1@2x.png')}
        />
        <View className='content'>{content}</View>
      </View>
    </View>
  )
}
