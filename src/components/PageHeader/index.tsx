import Taro, { FC } from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import { useHeaderSize } from '../../hooks/useHeaderSize'
import './index.scss'

export type PageHeaderProps = {
  title: string
  hideBackArrow?: boolean
  bg?: string
  bgHeight?: string
  onBack?: () => void
}

const PageHeader: FC<PageHeaderProps> = props => {
  const { title, hideBackArrow, onBack } = props
  const { statusHeight, headerHeight } = useHeaderSize()

  function onBackClick() {
    if (hideBackArrow) {
      return
    }
    if (onBack) {
      onBack()
    } else {
      Taro.navigateBack()
    }
  }

  return (
    <View className={'page-header with-image-bg'}>
      <Image
        className='brand-image'
        src={props.bg || require('../../assets/home_top_bg.jpg')}
        style={{ height: props.bgHeight || '305rpx' }}
      />
      <View className='status' style={{ height: `${statusHeight}px` }} />
      <View
        className='content'
        style={{ height: `${headerHeight}px` }}
        onClick={onBackClick}
      >
        {!hideBackArrow && (
          <View className={'left'}>
            <Image className={'back'} src={require('../../assets/back.png')} />
          </View>
        )}
        <View className={'title'}>{title}</View>
      </View>
    </View>
  )
}

export { PageHeader }
