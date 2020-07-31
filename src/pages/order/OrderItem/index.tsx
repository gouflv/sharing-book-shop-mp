import './index.scss'
import Taro, { FC } from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import dayjs from 'dayjs'
import { POST } from '../../../utils/ajax'
import { hideLoading, showLoading, showToast } from '../../../utils'
import classNames from 'classnames'

export interface OrderBookItem {
  orderNo
  // 0:借阅中 1:已逾期 2:已购买 3:已归还未结算 4:已归还已结算
  subStatus: 0 | 1 | 2 | 3 | 4
  eqName
  createTime
  returnTime
  booksName
  booksImg
  labelName
  isbn
  remark
}

export const OrderItem: FC<{ data: OrderBookItem }> = ({ data }) => {
  async function onClick() {
    try {
      showLoading()
      const res = await POST('curriculum/getCurriculumByIsbn', {
        data: { isbn: data.isbn }
      })
      if (res && res.curriculumId) {
        Taro.navigateTo({
          url: `/pages/subject-detail/index?id=${res.curriculumId}`
        })
      } else {
        showToast({ title: '暂无课程' })
      }
    } catch (e) {
      console.error(e)
      showToast({ title: '暂无课程' })
    } finally {
      hideLoading()
    }
  }

  if (!data) {
    return <View />
  }
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
          <View
            className={classNames('tag flex-auto', {
              'tag--orange': data.remark !== '机柜'
            })}
          >
            {data.remark}
          </View>
        </View>
        {!!data.eqName && <View className='desc'>设备名称: {data.eqName}</View>}
        <View className='desc'>
          借阅时间: {dayjs(data.createTime).format('YYYY/MM/DD')}
          {data.returnTime && `-${dayjs(data.returnTime).format('YYYY/MM/DD')}`}
        </View>
        <View className='desc'>书籍分类: {data.labelName}</View>
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
