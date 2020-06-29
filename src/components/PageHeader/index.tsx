import Taro, { FC } from '@tarojs/taro'
import { CoverImage, CoverView } from '@tarojs/components'
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
    <CoverView className={'page-header with-image-bg'}>
      <CoverImage
        className='brand-image'
        src={props.bg || require('../../assets/home_top_bg.jpg')}
        style={{ height: props.bgHeight || '305rpx' }}
      />
      <CoverView className='status' style={{ height: `${statusHeight}px` }} />
      <CoverView className='content' style={{ height: `${headerHeight}px` }}>
        {!hideBackArrow && (
          <CoverView className={'left'} onClick={onBack}>
            <CoverImage
              className={'back'}
              src={require('../../assets/back.png')}
            />
          </CoverView>
        )}
        <CoverView className={'title'}>{title}</CoverView>
      </CoverView>
    </CoverView>
  )
}

export { PageHeader }
