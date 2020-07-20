import './style.scss'
import { CoverImage, CoverView, Image, View } from '@tarojs/components'
import Taro, { FC } from '@tarojs/taro'

export const VideoDescBtn: FC<{
  isFullscreen: boolean
  onClick: () => void
}> = ({ isFullscreen, onClick }) => {
  if (isFullscreen) {
    return (
      <CoverView className='player-desc-btn player-desc-btn--fixed'>
        <CoverImage
          className='btn'
          src={require('../../../assets/course_detail_ico_book@2x.png')}
          onClick={onClick}
        />
      </CoverView>
    )
  }
  return (
    <View className='player-desc-btn'>
      <Image
        className='btn'
        src={require('../../../assets/course_detail_ico_book@2x.png')}
        onClick={onClick}
      />
    </View>
  )
}
