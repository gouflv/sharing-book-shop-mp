import './index.scss'
import { FC } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

export const OrderItem: FC = () => {
  return (
    <View className='order-item d-flex'>
      <Image
        className='thumb'
        src={'http://placehold.it/120x140'}
        mode={'aspectFill'}
      />
      <View className='content flex-fill'>
        <View className='d-flex align-start'>
          <View className='title flex-fill'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </View>
          <View className='tag flex-auto'>机柜</View>
        </View>
        <View className='desc'>设备名称: Lorem ipsum dolor sit.</View>
        <View className='desc'>借阅时间: 2020/1/1 - 2020/4/4</View>
        <View className='desc'>书籍分类: Lorem ipsum.</View>
      </View>
      <Image
        className='mark1'
        src={require('../../../assets/order_mark.png')}
      />
    </View>
  )
}
