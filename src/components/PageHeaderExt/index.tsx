import Taro, { FC, useState, useEffect } from '@tarojs/taro'
import { CoverImage, CoverView, Image, View } from '@tarojs/components'
import { useHeaderSize } from '../../hooks/useHeaderSize'
import '../PageHeader/index.scss'

const PageHeaderExt: FC<{
  height?: string
  fixed?: boolean
  absolute?: boolean
  bg?: string
  bgHeight?: string
  bgOffset?: number
}> = props => {
  const { statusHeight, headerHeight } = useHeaderSize()

  const [imageVisible, setImageVisible] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setImageVisible(true)
    }, 0)
  }, [])

  return (
    <View
      className={'page-header-ext with-image-bg'}
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
      {imageVisible && (
        <Image
          src={props.bg || require('../../assets/home_top_bg.jpg')}
          className={'brand-image'}
          style={{
            top: `-${statusHeight + headerHeight + (props.bgOffset || 0)}px`,
            height: props.bgHeight || '305rpx'
          }}
        />
      )}

      {props.children}
    </View>
  )
}

export { PageHeaderExt }
