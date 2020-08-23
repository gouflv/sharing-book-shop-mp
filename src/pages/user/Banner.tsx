import './index.scss'
import Taro, { FC, useState } from '@tarojs/taro'
import { Image, Swiper, SwiperItem, View } from '@tarojs/components'
import classNames from 'classnames'
import { Card, CardItem, CardItemProps } from './CardItem'

export const Banner: FC<
  Omit<CardItemProps, 'card'> & {
    cardList: Card[] | undefined
  }
> = props => {
  const [current, setCurrent] = useState(0)

  const renderBuyCard = () => {
    return (
      <SwiperItem>
        <View
          className='vip-card vip-card--dark'
          onClick={() => Taro.navigateTo({ url: '/pages-user/buy-card/index' })}
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
                <CardItem {...props} card={card} />
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
