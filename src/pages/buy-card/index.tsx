import './index.scss'
import Taro, { FC, useState, useEffect, useContext } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import { hideLoading, showLoading, showToast } from '../../utils'
import { defaultErrorHandler, POST } from '../../utils/ajax'
import classNames from 'classnames'
import { MessageService } from '../../store/MessageService'
import BasicPageWrapper from '../../components/BasicPageWrapper'

interface BuyCardItem {
  cardId: string
  cardName: string
  days: number
  positionNum: number
  originalPrice: number
  currentPrice: number
}

const Page: FC = () => {
  const { showConfirm } = useContext(MessageService)
  const [items, setItems] = useState<BuyCardItem[]>([])
  const [selected, setSelected] = useState<BuyCardItem>()

  useEffect(() => {
    async function fetch() {
      showLoading()
      const data = await POST('wxMember/getConfigCard')
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

    await showConfirm({
      content: `会员卡有效时间${selected.days}天，书位权益${selected.positionNum}个，购卡后自动激活`
    })

    try {
      showLoading()
      const orderData = await POST('wxMember/buyConfigCard', {
        data: { cardId: selected.cardId }
      })

      Taro.requestPayment({
        ...orderData,
        success: res => {
          Taro.redirectTo({
            url: `/pages/buy-card/result?orderNo=${orderData.orderNo}`
          })
        },
        fail: res => {
          hideLoading()
          showToast({ title: res.errMsg })
        }
      })
    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      hideLoading()
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
        </PageHeaderWrapper>
      </View>
    </BasicPageWrapper>
  )
}

export default Page
