import { FC } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

export const Star: FC<{ value: number }> = props => {
  return (
    <View
      className={'star'}
      style={{
        display: 'flex'
      }}
    >
      {Array.from({
        length: props.value
      }).map((_, i) => (
        <Image
          key={i}
          src={require('../../assets/home_icon_star@2x.png')}
          style={{
            width: '22rpx',
            height: '22rpx'
          }}
        />
      ))}
    </View>
  )
}
