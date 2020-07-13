import './index.scss'
import { FC } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import classNames from 'classnames'

export const GenderCheckbox: FC<{
  value: number
  onChange: (value: number) => void
  disabled?: boolean
}> = props => {
  const { value, onChange, disabled } = props

  function onItemClick(val) {
    if (disabled) {
      return
    }
    onChange(val)
  }

  return (
    <View className='checkbox-group'>
      <View className='checkbox' onClick={() => onItemClick(1)}>
        <Image src={require('../../assets/vip_baby_boy@2x.png')} />
        <View
          className={classNames('checkbox__input', {
            checked: value === 1
          })}
        >
          <View className='checkbox__input__inner' />
        </View>
      </View>
      <View className='checkbox' onClick={() => onItemClick(2)}>
        <Image src={require('../../assets/vip_baby_girl@2x.png')} />
        <View
          className={classNames('checkbox__input', {
            checked: value === 2
          })}
        >
          <View className='checkbox__input__inner' />
        </View>
      </View>
    </View>
  )
}
