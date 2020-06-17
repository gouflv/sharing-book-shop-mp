import { FC } from '@tarojs/taro'
import { View } from '@tarojs/components'

export const Panel: FC = props => {
  return <View className={'panel'}>{props.children}</View>
}
