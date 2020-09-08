import './index.scss'
import Taro, { FC, useDidShow, useRouter, useState } from '@tarojs/taro'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import { Button, Form, Image, View } from '@tarojs/components'
import { hideLoading, showLoading, showToast } from '../../utils'
import { defaultErrorHandler, POST } from '../../utils/ajax'
import { ShelfBookItem } from './ShelfBookItem'
import { useSubscribeMessage } from '../../hooks/useSubscribeMessage'
import { FormProps } from '@tarojs/components/types/Form'

const Page: FC = () => {
  const { params } = useRouter()
  const { subscribe } = useSubscribeMessage(
    'zA8TQIs1KZyHxYDCbo6Khm5HpOMT_VYfByewU6a5oRc'
  )

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

  async function onSubmit(detail: FormProps.onSubmitEventDetail) {
    console.log('[onSubmit]', detail)
    if (!meta) {
      return
    }

    await subscribe()

    showLoading()
    try {
      await POST('wxMember/borrowBooksResult', {
        data: {
          type: meta.type,
          eqCode: meta.eqCode,
          ids: list.map(it => it.rfidCode).join(','),
          formId: detail.formId
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
        {!loading && list.length && <PageHeaderExt absolute height={'90rpx'} />}
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
              <Form reportSubmit onSubmit={e => onSubmit(e.detail)}>
                <Button formType={'submit'} className='btn-primary'>
                  {meta.type === 1 ? '借阅' : '归还'}
                </Button>
              </Form>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}

export default Page
