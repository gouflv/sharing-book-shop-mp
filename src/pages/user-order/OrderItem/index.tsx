import './index.scss'
import { FC } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import classNames from 'classnames'
import dayjs from 'dayjs'

export const OrderItem: FC<{ data }> = ({ data }) => {
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
          <View
            className={classNames('tag flex-auto', {
              'tag--orange': data.remark !== '机柜'
            })}
          >
            {data.remark}
          </View>
        </View>
        <View className='desc'>
          借阅时间: {dayjs(data.createTime).format('YYYY/MM/DD')}
        </View>
        {data.returnTime && (
          <View className='desc'>
            还书时间: {dayjs(data.returnTime).format('YYYY/MM/DD')}
          </View>
        )}
      </View>
      {data.subStatus === 1 && (
        <Image
          className='mark1'
          src={require('../../../assets/order_mark.png')}
        />
      )}
    </View>
  )
}
