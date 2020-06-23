import './index.scss'
import Taro, { FC, useState } from '@tarojs/taro'
import { Image, Swiper, SwiperItem, View } from '@tarojs/components'
import classNames from 'classnames'

export const Banner: FC = () => {
  const [current, setCurrent] = useState(0)
  const [items] = useState(Array.from({ length: 5 }))

  return (
    <View className='banner-wrapper'>
      <Swiper className={'banner'} onChange={i => setCurrent(i.detail.current)}>
        {items.map((_, i) => (
          <SwiperItem key={i}>
            <View className='vip-card-wrapper'>
              {!i && (
                <View className='vip-card vip-card--dark'>
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
              )}
              {i === 1 && (
                <View className='vip-card vip-card--pink'>
                  <Image
                    src={require('../../assets/vip_card_1.png')}
                    className={'bg'}
                  />
                  <Image
                    className='mark'
                    src={require('../../assets/vip_card_mark1.png')}
                  />
                  <View className='label'>活动卡</View>
                  <View className='content'>
                    <View className='title'>会员卡</View>
                    <View className='desc'>
                      <View>2020/7/1-2020/7/30</View>
                      <View className='link'>购买会员卡 &gt;</View>
                    </View>
                  </View>
                </View>
              )}
              {i > 1 && (
                <View className='vip-card'>
                  <Image
                    src={require('../../assets/vip_ico_crown@2x.png')}
                    className={'crown'}
                  />
                  <Image
                    className='mark'
                    src={require('../../assets/vip_card_mark1.png')}
                  />
                  <View className='label'>VIP</View>
                  <View className='content'>
                    <View className='title'>会员卡</View>
                    <View className='desc'>
                      <View>将在2020/7/1到期</View>
                      <View className='link'>购买会员卡 &gt;</View>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </SwiperItem>
        ))}
      </Swiper>

      <View className='indicator'>
        {items.map((_, i) => (
          <View
            key={i}
            className={classNames('dot', { active: i === current })}
          />
        ))}
      </View>
    </View>
  )
}
