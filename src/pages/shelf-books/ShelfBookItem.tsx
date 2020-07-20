import '../order/OrderItem/index.scss'
import { FC } from '@tarojs/taro'
import { Image, View } from '@tarojs/components'

export interface ShelfBookItem {
  rfidCode
  booksName
  booksImg
  isbn
  booksType
}

export const ShelfBookItem: FC<{ data: ShelfBookItem }> = ({ data }) => {
  async function onClick() {}

  return (
    <View className='order-item d-flex' onClick={onClick}>
      <Image
        className='thumb'
        src={data.booksImg || 'http://placehold.it/120x140'}
        mode={'aspectFill'}
      />
      <View className='content flex-fill'>
        <View className='d-flex align-start'>
          <View className='title flex-fill'>{data.booksName}</View>
          <View className='tag flex-auto'>机柜</View>
        </View>
        <View className='desc'>书籍分类: {data.booksType}</View>
      </View>
    </View>
  )
}
