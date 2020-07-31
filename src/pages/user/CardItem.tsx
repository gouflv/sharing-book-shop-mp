import './CardItem.scss'
import Taro, { FC, useState } from '@tarojs/taro'
import { Image, Swiper, SwiperItem, View } from '@tarojs/components'
import classNames from 'classnames'
import dayjs from 'dayjs'

export interface Card {
  memLeId
  cardName
  //员卡种类 1普通卡 2活动卡
  cardClass: 1 | 2
  positionNum: number
  //激活 1未激活 2激活
  isActive: 1 | 2
  startDate: string
  endDate: string
  purchaseDate: string
  payMoney: number
  //1未支付，2 已支付
  isPay: 1 | 2
}

export interface CardItemProps {
  card: Card
  onBuyCard: (card: Card) => void
  onActiveCard: (card: Card) => void
}

export const CardItem: FC<CardItemProps> = ({
  card,
  onBuyCard,
  onActiveCard
}) => {
  const renderVIPCard = (card: Card) => {
    return (
      <View className='vip-card'>
        <Image
          src={require('../../assets/vip_ico_crown@2x.png')}
          className={'crown'}
        />
        {card.isActive === 2 ? (
          <Image
            className='mark'
            src={require('../../assets/vip_card_mark1.png')}
          />
        ) : (
          <Image
            className='mark'
            src={require('../../assets/vip_card_mark2.png')}
          />
        )}
        <View className='label'>VIP</View>
        <View className='content'>
          <View className='title'>
            {card.cardName}(书位{card.positionNum})
          </View>
          <View className='desc'>
            {card.isActive === 2 && card.endDate && (
              <View className='date'>
                将在{dayjs(card.endDate).format('YYYY/M/D')}到期
              </View>
            )}
            {card.isActive === 1 && card.endDate && (
              <View>
                {dayjs(card.startDate).format('YYYY/M/D')}-
                {dayjs(card.endDate).format('YYYY/M/D')}
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
                onClick={() => onActiveCard(card)}
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
        {card.isActive === 2 ? (
          <Image
            className='mark'
            src={require('../../assets/vip_card_mark1.png')}
          />
        ) : (
          <Image
            className='mark'
            src={require('../../assets/vip_card_mark2.png')}
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
                  {card.isPay === 1 && (
                    <View className='price'>¥{card.payMoney}</View>
                  )}
                  {/* 购买 */}
                  {card.isPay === 2 && (
                    <View>
                      将在{dayjs(card.endDate).format('YYYY/M/D')}到期
                    </View>
                  )}
                </View>
              )}
              {card.isActive === 2 && (
                //已激活
                <View>
                  {dayjs(card.startDate).format('YYYY/M/D')}-
                  {dayjs(card.endDate).format('YYYY/M/D')}
                </View>
              )}
            </View>

            {card.isActive === 1 && (
              <View>
                {/* 未购买 */}
                {card.isPay === 1 && (
                  <View className='btn-active' onClick={() => onBuyCard(card)}>
                    立即购买
                  </View>
                )}
                {/* 购买 */}
                {card.isPay === 2 && (
                  <View
                    className='btn-active'
                    onClick={() => onActiveCard(card)}
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
    <View>
      {card.cardClass === 1 ? renderVIPCard(card) : renderActiveCard(card)}
    </View>
  )
}
