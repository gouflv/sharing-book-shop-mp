import { FC } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { useHeaderSize } from '../../hooks/useHeaderSize'
import './index.scss'

export type PageHeaderProps = {
  title: string
  hideBackArrow?: boolean
  bg?: string
  bgHeight?: string
}

const PageHeader: FC<PageHeaderProps> = props => {
  const { title, hideBackArrow } = props
  const { statusHeight, headerHeight } = useHeaderSize()

  function onBack() {
    Taro.navigateBack()
  }

  return (
    <View className={'page-header with-image-bg'}>
      <Image
        className='brand-image'
        mode={'aspectFill'}
        src={props.bg || require('../../assets/home_top_bg.jpg')}
        style={{ height: props.bgHeight || '305rpx' }}
      />
      <View className='status' style={{ height: `${statusHeight}px` }} />
      <View className='content' style={{ height: `${headerHeight}px` }}>
        {!hideBackArrow && (
          <View className={'left'} onClick={onBack}>
            <Image
              mode={'aspectFill'}
              className={'back'}
              src={require('../../assets/back.png')}
            />
          </View>
        )}
        <View className={'title'}>{title}</View>
      </View>
    </View>
  )
}

export { PageHeader }
