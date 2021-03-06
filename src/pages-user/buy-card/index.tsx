import './index.scss'
import Taro, {
  FC,
  useContext,
  useEffect,
  useRouter,
  useState
} from '@tarojs/taro'
import { Button, Input, View } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import { hideLoading, showLoading, showToast } from '../../utils'
import { defaultErrorHandler, POST } from '../../utils/ajax'
import classNames from 'classnames'
import { MessageService } from '../../store/MessageService'
import BasicPageWrapper from '../../components/BasicPageWrapper'
import { useSubscribeMessage } from '../../hooks/useSubscribeMessage'

interface BuyCardItem {
  cardId: string
  cardName: string
  days: number
  positionNum: number
  originalPrice: number
  currentPrice: number
}

const Page: FC = () => {
  const router = useRouter()
  const { subscribe } = useSubscribeMessage(
    '7eKXRRiZzOLkONoxt4lYJbBncZj4MUaa6r01scNroUE'
  )

  //#region gift
  const [isGiftBuy, setIsGiftBuy] = useState(false)
  const [sendGiftPhone, setSendGiftPhone] = useState('')
  //#endregion

  const { showConfirm } = useContext(MessageService)
  const [items, setItems] = useState<BuyCardItem[]>([])
  const [selected, setSelected] = useState<BuyCardItem>()

  useEffect(() => {
    const isGift = !!router.params.gift
    setIsGiftBuy(isGift)
    async function fetch() {
      showLoading()
      const data = await POST('wxMember/getConfigCard', {
        data: { type: isGift ? 2 : 1 }
      })
      setItems(data)
      hideLoading()
    }
    fetch()
  }, [])

  async function onSubmit() {
    if (!selected) {
      showToast({ title: '请选择', mask: false })
      return
    }

    if (isGiftBuy && !/^1\d{10}$/.test(sendGiftPhone)) {
      showToast({ title: '请输入正确的手机号' })
      return
    }

    await showConfirm({
      content: `会员卡有效时间${selected.days}天，书位权益${selected.positionNum}个，购卡后需手动激活`
    })

    try {
      const data = { cardId: selected.cardId } as any
      if (isGiftBuy) {
        data.tel = sendGiftPhone
      }

      async function requestPayment() {
        showLoading()
        const orderData = await POST(
          isGiftBuy ? 'wxMember/buyGivingConfigCard' : 'wxMember/buyConfigCard',
          {
            data
          }
        )
        Taro.requestPayment({
          ...orderData,
          success: () => {
            if (!isGiftBuy) {
              Taro.redirectTo({
                url: `/pages/buy-card/result?orderNo=${orderData.orderNo}`
              })
            } else {
              setSendGiftPhone('')
              showToast({ title: '赠送成功', icon: 'success' })
            }
          },
          fail: () => {
            showToast({ title: '支付失败' })
          },
          complete: () => {
            hideLoading()
          }
        })
      }

      if (!isGiftBuy) {
        await subscribe()
      }
      requestPayment()
    } catch (e) {
      hideLoading()
      defaultErrorHandler(e)
    }
  }

  return (
    <BasicPageWrapper>
      <View className='page-buy-card'>
        <PageHeaderWrapper
          title={'购买会员卡'}
          bg={require('../../assets/vip_top_bg2.jpg')}
          bgHeight={'490rpx'}
        >
          <PageHeaderExt
            absolute
            height={'140rpx'}
            bg={require('../../assets/vip_top_bg2.jpg')}
            bgHeight={'490rpx'}
          />

          <View className='page-space-around'>
            <View className='box'>
              <View className='cards'>
                {items.map((item, i) => (
                  <View
                    className={classNames('card', {
                      active: item === selected
                    })}
                    onClick={() => setSelected(item)}
                  >
                    <View className='label'>{item.cardName}</View>
                    <View className='value'>
                      <View className='yuan'>¥</View> {item.currentPrice}
                    </View>
                    <View className='desc text-second'>
                      原价{item.originalPrice}
                    </View>
                  </View>
                ))}
              </View>

              {isGiftBuy && (
                <View className='send-gift-card'>
                  <View className='label'>用户手机号</View>
                  <View>
                    <Input
                      className='input'
                      value={sendGiftPhone}
                      onInput={e => setSendGiftPhone(e.detail.value)}
                      placeholder={'请输入用户手机号'}
                    />
                  </View>
                </View>
              )}

              <View className='summary'>
                <View className='label'>合计</View>
                <View className='value'>
                  <View className='yuan'>¥</View>{' '}
                  {selected ? selected.currentPrice : 0}
                </View>
              </View>

              <Button className='btn-primary' onClick={onSubmit}>
                支付
              </Button>
            </View>
          </View>
          {selected && (
            <View className='page-space-around'>
              <View className='box'>
                <View>1.默认书位权益：{selected.positionNum}个</View>
                <View>2.有效时间：{selected.days}天（至激活后开始生效）</View>
                <View>
                  3.注意：购买会员卡后如未激活卡片，借阅时将自动激活会员卡
                </View>
              </View>
            </View>
          )}
        </PageHeaderWrapper>
      </View>
    </BasicPageWrapper>
  )
}

export default Page
