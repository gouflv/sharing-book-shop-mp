import './index.scss'
import Taro, { FC, useDidShow, useState } from '@tarojs/taro'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import { Image, View } from '@tarojs/components'
import { hideLoading, showLoading } from '../../utils'
import { defaultErrorHandler, POST } from '../../utils/ajax'
import { ShelfBookItem } from './ShelfBookItem'

const Page: FC = () => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetch() {
    try {
      showLoading()
      const data = await POST('wxMember/getMemberAllBorrowBooks', {})
      setList(data || [])
    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      setLoading(false)
      hideLoading()
    }
  }

  useDidShow(async () => {
    fetch()
  })

  return (
    <View className={'page-shelf-books'}>
      <PageHeaderWrapper title={'借阅记录'}>
        {!loading && list.length && <PageHeaderExt absolute height={'90rpx'} />}
      </PageHeaderWrapper>

      <View className='page-space-wing'>
        {!loading && !list.length && (
          <View className={'empty-list'}>
            <Image
              src={require('../../assets/borrow_defoult_pic@2x.jpg')}
              style={{ width: '328rpx', height: '216rpx' }}
            />
            暂无记录，快去借书吧~
          </View>
        )}
        {list.length && (
          <View>
            <View className={'list'}>
              {list.map((item, i) => (
                <ShelfBookItem key={i} data={item} eqName={''} />
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  )
}

export default Page
