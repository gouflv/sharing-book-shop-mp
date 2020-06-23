import './index.scss'
import { FC } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import classNames from 'classnames'

export const GenderCheckbox: FC<{
  value: number
  onChange: (value: number) => void
}> = ({ value, onChange }) => {
  return (
    <View className='checkbox-group'>
      <View className='checkbox' onClick={() => onChange(0)}>
        <Image src={require('../../assets/vip_baby_boy@2x.png')} />
        <View
          className={classNames('checkbox__input', {
            checked: value === 0
          })}
        >
          <View className='checkbox__input__inner' />
        </View>
      </View>
      <View className='checkbox' onClick={() => onChange(1)}>
        <Image src={require('../../assets/vip_baby_girl@2x.png')} />
        <View
          className={classNames('checkbox__input', {
            checked: value === 1
          })}
        >
          <View className='checkbox__input__inner' />
        </View>
      </View>
    </View>
  )
}
