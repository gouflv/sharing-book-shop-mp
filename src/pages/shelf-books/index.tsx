import './index.scss'
import Taro, { FC, useDidShow, useRouter, useState } from '@tarojs/taro'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import { Image, View, Button } from '@tarojs/components'
import { hideLoading, showLoading, showToast } from '../../utils'
import { defaultErrorHandler, POST } from '../../utils/ajax'
import { ShelfBookItem } from './ShelfBookItem'

const Page: FC = () => {
  const { params } = useRouter()
  const fromWeChatScan = params.from === 'weChatScan'

  const [meta, setMeta] = useState<{ type: 1 | 2; eqCode; eqName }>()
  const [list, setList] = useState<ShelfBookItem[]>([])
  const [loading, setLoading] = useState(true)

  async function fetch() {
    try {
      showLoading()
      const data = await POST('wxMember/getQrcodeContent', {
        data: { id: params.id }
      })
      setList(data.books || [])
      setMeta(data)
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

  async function onSubmit() {
    if (!meta) {
      return
    }
    showLoading()
    try {
      await POST('wxMember/borrowBooksResult', {
        data: {
          ...meta,
          ids: list.map(it => it.rfidCode).join(',')
        }
      })
      showToast({
        title: `${meta.type === 1 ? '借阅' : '归还'}成功`,
        icon: 'success'
      })
      setTimeout(() => {
        Taro.reLaunch({ url: '/pages/order/index' })
      }, 2000)
    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      hideLoading()
    }
  }

  if (!meta) {
    return <View />
  }
  return (
    <View className={'page-shelf-books'}>
      <PageHeaderWrapper
        title={meta.type === 1 ? '借书单' : '还书单'}
        onBack={() => {
          if (fromWeChatScan) {
            Taro.reLaunch({ url: '/pages/home/index' })
          } else {
            Taro.navigateBack()
          }
        }}
      >
        <PageHeaderExt absolute height={'90rpx'} />
      </PageHeaderWrapper>

      <View className='page-space-wing'>
        {!loading && !list.length && (
          <View className={'empty-list'}>
            <Image
              src={require('../../assets/borrow_defoult_pic@2x.jpg')}
              style={{ width: '328rpx', height: '216rpx' }}
            />
            暂无图书
          </View>
        )}
        {list.length && (
          <View>
            <View className={'list'}>
              {list.map((item, i) => (
                <ShelfBookItem
                  key={i}
                  data={item}
                  eqName={meta && meta.eqName}
                />
              ))}
            </View>

            <View className='footer'>
              <Button className='btn-primary' onClick={onSubmit}>
                {meta.type === 1 ? '借阅' : '归还'}
              </Button>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}

export default Page
