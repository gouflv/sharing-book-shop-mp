import './index.scss'
import Taro, { FC, useState } from '@tarojs/taro'
import { Image, Swiper, SwiperItem, View } from '@tarojs/components'
import classNames from 'classnames'
import dayjs from 'dayjs'

export interface Card {
  memLeId
  cardName
  cardClass: 1 | 2
  positionNum: number
  isActive: 1 | 2
  endDate: string
  purchaseDate: string
  payMoney: number
}

export const Banner: FC<{
  cardList: Card[] | undefined
  onBuyCard: (card: Card) => void
  onActiveCard: (card: Card) => void
}> = props => {
  const [current, setCurrent] = useState(0)

  const renderBuyCard = () => {
    return (
      <SwiperItem>
        <View
          className='vip-card vip-card--dark'
          onClick={() => Taro.navigateTo({ url: '/pages/buy-card/index' })}
        >
          <Image
            src={require('../../assets/vip_ico_crown@2x.png')}
            className={'crown'}
          />
          <View className='content'>
            <View className='title'>暂无会员卡</View>
            <View className='desc'>
              <View className='link'>立即购买会员卡 &gt;</View>
            </View>
          </View>
        </View>
      </SwiperItem>
    )
  }

  const renderVIPCard = (card: Card) => {
    return (
      <View className='vip-card'>
        <Image
          src={require('../../assets/vip_ico_crown@2x.png')}
          className={'crown'}
        />
        {card.isActive === 2 && (
          <Image
            className='mark'
            src={require('../../assets/vip_card_mark1.png')}
          />
        )}
        <View className='label'>VIP</View>
        <View className='content'>
          <View className='title'>
            {card.cardName}(书位{card.positionNum})
          </View>
          <View className='desc'>
            {card.endDate && (
              <View className='date'>
                将在{dayjs(card.endDate).format('YYYY/M/D')}到期
              </View>
            )}
            {card.isActive === 2 ? (
              <View
                className='link'
                onClick={() =>
                  Taro.navigateTo({ url: '/pages/buy-card/index' })
                }
              >
                购买会员卡 &gt;
              </View>
            ) : (
              <View
                className='btn-active btn-active--blue'
                onClick={() => props.onActiveCard(card)}
              >
                立即激活
              </View>
            )}
          </View>
        </View>
      </View>
    )
  }

  const renderActiveCard = (card: Card) => {
    return (
      <View className='vip-card vip-card--pink'>
        <Image src={require('../../assets/vip_card_1.png')} className={'bg'} />
        {card.isActive === 2 && (
          <Image
            className='mark'
            src={require('../../assets/vip_card_mark1.png')}
          />
        )}
        <View className='label'>活动卡</View>
        <View className='content'>
          <View className='title'>
            {card.cardName}(书位{card.positionNum})
          </View>
          <View className='desc'>
            <View className='date'>
              {card.isActive === 1 && (
                <View>
                  {/* 未购买 */}
                  {card.payMoney && !card.purchaseDate && (
                    <View className='price'>¥{card.payMoney}</View>
                  )}
                  {/* 不需要购买 */}
                  {!card.payMoney && (
                    <View>
                      将在{dayjs(card.endDate).format('YYYY/M/D')}到期
                    </View>
                  )}
                </View>
              )}
              {card.isActive === 2 && (
                //已激活
                <View>
                  {dayjs(card.purchaseDate).format('YYYY/M/D')}-
                  {dayjs(card.endDate).format('YYYY/M/D')}
                </View>
              )}
            </View>

            {card.isActive === 1 && (
              <View>
                {/* 未购买 */}
                {card.payMoney && !card.purchaseDate && (
                  <View
                    className='btn-active'
                    onClick={() => props.onBuyCard(card)}
                  >
                    立即购买
                  </View>
                )}
                {/* 不需要购买 */}
                {!card.payMoney && (
                  <View
                    className='btn-active'
                    onClick={() => props.onActiveCard(card)}
                  >
                    立即激活
                  </View>
                )}
              </View>
            )}
            {card.isActive === 2 && (
              //已激活
              <View
                className='link'
                onClick={() =>
                  Taro.navigateTo({ url: '/pages/buy-card/index' })
                }
              >
                购买会员卡 &gt;
              </View>
            )}
          </View>
        </View>
      </View>
    )
  }

  return (
    <View className='banner-wrapper'>
      <Swiper
        className={'swiper'}
        previousMargin={'70rpx'}
        nextMargin={'70rpx'}
        onChange={i => setCurrent(i.detail.current)}
        circular
      >
        {props.cardList && !props.cardList.length && renderBuyCard()}
        {props.cardList &&
          props.cardList.map((card, i) => (
            <SwiperItem key={card.memLeId}>
              <View
                className={classNames('vip-card-wrapper', {
                  'in-active': i !== current
                })}
              >
                {card.cardClass === 1
                  ? renderVIPCard(card)
                  : renderActiveCard(card)}
              </View>
            </SwiperItem>
          ))}
      </Swiper>

      <View className='indicator'>
        {props.cardList &&
          props.cardList.map((_, i) => (
            <View
              key={i}
              className={classNames('dot', { active: i === current })}
            />
          ))}
      </View>
    </View>
  )
}
