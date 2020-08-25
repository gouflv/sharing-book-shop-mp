import './index.scss'
import Taro, { FC } from '@tarojs/taro'
import { Image, View, Text, Button } from '@tarojs/components'
import dayjs from 'dayjs'
import { defaultErrorHandler, POST } from '../../../utils/ajax'
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
  salePice
}

export const OrderItem: FC<{
  data: OrderBookItem
  afterPayment: () => void
}> = ({ data, afterPayment }) => {
  async function onClick() {
    try {
      showLoading()
      const res = await POST('curriculum/getCurriculumByIsbn', {
        data: { isbn: data.isbn }
      })
      if (res && res.curriculumId) {
        Taro.navigateTo({
          url: `/pages-subject/subject-detail/index?id=${res.curriculumId}`
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

  async function onPayClick() {
    try {
      showLoading()
      const orderData = await POST('wxMember/borrowToSale', {
        data: { orderNo: data.orderNo }
      })
      if (orderData) {
        showLoading()
        Taro.requestPayment({
          ...orderData,
          success: res => {
            showToast({ title: '支付成功', icon: 'success' })
            afterPayment()
          },
          fail: res => {
            showToast({ title: res.errMsg })
          },
          complete: () => {
            hideLoading()
          }
        })
      } else {
        hideLoading()
        showToast({ title: '支付成功', icon: 'success' })
        afterPayment()
      }
    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      hideLoading()
    }
  }

  if (!data) {
    return <View />
  }
  return (
    <View className='order-item order-item--mb' onClick={onClick}>
      <View className='d-flex'>
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
          {!!data.eqName && (
            <View className='desc'>设备名称: {data.eqName}</View>
          )}
          <View className='desc'>
            借阅时间: {dayjs(data.createTime).format('YYYY/MM/DD')}
            {data.returnTime &&
              `-${dayjs(data.returnTime).format('YYYY/MM/DD')}`}
          </View>
          <View className='desc'>书籍分类: {data.labelName}</View>
        </View>
      </View>
      {data.subStatus === 1 && (
        <Image
          className='mark1'
          src={require('../../../assets/order_mark.png')}
        />
      )}
      {data.subStatus !== 2 && (
        <View
          className='footer d-flex align-center'
          onClick={e => e.stopPropagation()}
        >
          <View className='label flex-fill'>租转售</View>
          <View className='value d-flex align-center'>
            <Text>价格：{data.salePice}元</Text>
            <Button
              className='btn-primary btn-primary--plain'
              size={'mini'}
              onClick={onPayClick}
            >
              支付
            </Button>
          </View>
        </View>
      )}
    </View>
  )
}
