import Taro, { FC } from '@tarojs/taro'
import { Image, View, Input } from '@tarojs/components'
import { useHeaderSize } from '../../hooks/useHeaderSize'
import './index.scss'
import classNames from 'classnames'
import { useAuthGuard } from '../../hooks/useAuthGuard'

export type PageHeaderProps = {
  title: string
  onBack?: () => void
  hideBackArrow?: boolean

  bg?: string
  bgHeight?: string
  bgOffset?: number

  showSearch?: boolean
  isSearchNav?: boolean
  search?: string
  onSearch?: (val) => void
}

const PageHeader: FC<PageHeaderProps> = props => {
  const { title, hideBackArrow, onBack } = props
  const { statusHeight, headerHeight } = useHeaderSize()
  const { withAuth } = useAuthGuard()

  function onBackClick() {
    if (hideBackArrow) {
      return
    }
    if (onBack) {
      onBack()
    } else {
      Taro.navigateBack({
        fail: () => {
          Taro.switchTab({ url: '/pages/home/index' })
        }
      })
    }
  }

  return (
    <View className={'page-header with-image-bg'}>
      <Image
        className='brand-image'
        src={props.bg || require('../../assets/home_top_bg.jpg')}
        style={{
          height: props.bgHeight || '305rpx',
          top: `-${props.bgOffset || 0}px`
        }}
      />
      <View className='status' style={{ height: `${statusHeight}px` }} />
      <View className='content' style={{ height: `${headerHeight}px` }}>
        {!hideBackArrow && (
          <View className={'left'} onClick={onBackClick}>
            <Image className={'back'} src={require('../../assets/back.png')} />
          </View>
        )}
        <View className={'title'} onClick={onBackClick}>
          {title}
        </View>

        {props.showSearch && (
          <View
            className={classNames('search', {
              'search--center': !!title
            })}
            onClick={() => {
              if (props.isSearchNav) {
                withAuth(() => {
                  Taro.navigateTo({
                    url: '/pages-subject/subject-search/index'
                  })
                })
              }
            }}
          >
            <Image src={require('../../assets/icon-search.png')} />
            <Input
              value={props.search}
              confirmType={'search'}
              disabled={props.isSearchNav}
              autoFocus={!props.isSearchNav}
              maxLength={20}
              onConfirm={e => props.onSearch && props.onSearch(e.detail.value)}
            />
          </View>
        )}
      </View>
    </View>
  )
}

export { PageHeader }
