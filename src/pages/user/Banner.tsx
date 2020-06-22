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
            <Image
              mode={'aspectFill'}
              src={`http://placehold.it/600x310?text=600x310@${i + 1}`}
              className={'banner-item'}
            />
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
