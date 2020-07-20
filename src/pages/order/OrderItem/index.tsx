import './index.scss'
import { FC, useEffect } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import dayjs from 'dayjs'
import { POST } from '../../../utils/ajax'
import { hideLoading, showLoading, showToast } from '../../../utils'

export const OrderItem: FC<{ data: any }> = ({ data }) => {
  async function onClick() {
    const id = await fetchSubject()
    Taro.navigateTo({
      url: `/pages/subject-detail/index?id=${id}`
    })
  }

  async function fetchSubject() {
    try {
      showLoading()
      const res = await POST('curriculum/getCurriculumByIsbn', {
        data: { isbn: data.isbn }
      })
      return res.curriculumId
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
          {!!data.eqName ? (
            <View className='tag flex-auto'>机柜</View>
          ) : (
            <View className='tag tag--orange flex-auto'>图书馆</View>
          )}
        </View>
        {!!data.eqName && <View className='desc'>设备名称: {data.eqName}</View>}
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
