import './index.scss'
import { FC } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import dayjs from 'dayjs'

export const OrderItem: FC<{ data: any }> = ({ data }) => {
  if (!data) {
    return <View />
  }
  return (
    <View className='order-item d-flex'>
      <Image
        className='thumb'
        src={data.booksImg || 'http://placehold.it/120x140'}
        mode={'aspectFill'}
      />
      <View className='content flex-fill'>
        <View className='d-flex align-start'>
          <View className='title flex-fill'>{data.booksName}</View>
          {!!data.eqName ? (
            <View className='tag flex-auto'>机柜</View>
          ) : (
            <View className='tag tag--orange flex-auto'>图书馆</View>
          )}
        </View>
        <View className='desc'>设备名称: {data.eqName}</View>
        <View className='desc'>
          借阅时间: {dayjs(data.createTime).format('YYYY/MM/DD')}-
          {dayjs(data.returnTime).format('YYYY/MM/DD')}
        </View>
        <View className='desc'>书籍分类: {data.labelName}</View>
      </View>
      <Image
        className='mark1'
        src={require('../../../assets/order_mark.png')}
      />
    </View>
  )
}
