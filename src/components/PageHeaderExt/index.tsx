import Taro, { FC, useState, useEffect } from '@tarojs/taro'
import { CoverImage, CoverView } from '@tarojs/components'
import { useHeaderSize } from '../../hooks/useHeaderSize'
import '../PageHeader/index.scss'

const PageHeaderExt: FC<{
  height?: string
  fixed?: boolean
  absolute?: boolean
  bg?: string
  bgHeight?: string
}> = props => {
  const { statusHeight, headerHeight } = useHeaderSize()

  return (
    <CoverView
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
      <CoverImage
        src={props.bg || require('../../assets/home_top_bg.jpg')}
        className={'brand-image'}
        style={{
          top: `-${statusHeight + headerHeight}px`,
          height: props.bgHeight || '305rpx'
        }}
      />

      {props.children}
    </CoverView>
  )
}

export { PageHeaderExt }
