import Taro, { FC } from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import { useHeaderSize } from '../../hooks/useHeaderSize'
import '../../app.scss'

const PageHeaderExt: FC<{
  height?: string
  fixed?: boolean
  absolute?: boolean
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
              position: 'absolute'
            }
          : {})
      }}
    >
      <Image
        mode={'aspectFill'}
        src={require('../../assets/home_top_bg.jpg')}
        className={'brand-image'}
        style={{ top: `-${statusHeight + headerHeight}px` }}
      />

      {props.children}
    </View>
  )
}

export { PageHeaderExt }
