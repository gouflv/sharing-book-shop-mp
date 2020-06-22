import Taro, { FC } from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import { useHeaderSize } from '../../hooks/useHeaderSize'
import '../../app.scss'

const PageHeaderExt: FC<{
  height?: string
  fixed?: boolean
  absolute?: boolean
  bg?: string
  bgHeight?: string
}> = props => {
  const { statusHeight, headerHeight } = useHeaderSize()

  return (
    <View
      className={'with-image-bg'}
      style={{
        height: props.height || 'auto',
        ...(props.fixed
          ? {
              position: 'fixed',
              top: `${statusHeight + headerHeight}px`
            }
          : {}),
        ...(props.absolute
          ? {
              position: 'absolute',
              zIndex: -1
            }
          : {})
      }}
    >
      <Image
        mode={'aspectFill'}
        src={props.bg || require('../../assets/home_top_bg.jpg')}
        className={'brand-image'}
        style={{
          top: `-${statusHeight + headerHeight}px`,
          height: props.bgHeight || '305rpx'
        }}
      />

      {props.children}
    </View>
  )
}

export { PageHeaderExt }
