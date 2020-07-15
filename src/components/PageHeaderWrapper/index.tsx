import { FC } from '@tarojs/taro'
import { useHeaderSize } from '../../hooks/useHeaderSize'
import { View } from '@tarojs/components'
import { PageHeader, PageHeaderProps } from '../PageHeader'
import '../PageHeader/index.scss'

const PageHeaderWrapper: FC<PageHeaderProps> = props => {
  const { statusHeight, headerHeight } = useHeaderSize()
  return (
    <View className={'page-header-wrapper'}>
      <PageHeader {...props} />
      <View
        className={'page-header-inner-content'}
        style={{
          marginTop: `${statusHeight + headerHeight}px`
        }}
      >
        {props.children}
      </View>
    </View>
  )
}

export { PageHeaderWrapper }
