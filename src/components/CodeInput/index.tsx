import './index.scss'
import { Input, View } from '@tarojs/components'
import Taro, { useState, useDidShow } from '@tarojs/taro'
import classNames from 'classnames'

interface CodeNumberInputProps {
  onChange: (val: string) => void
}

export const CodeNumberInput: Taro.FC<CodeNumberInputProps> = props => {
  const [value, setValue] = useState('')
  const [focus, setFocus] = useState(true)

  function getValueOfIndex(index: number) {
    return value.charAt(index) || ''
  }

  function onInput(val) {
    setValue(val)
    props.onChange(val)
  }

  useDidShow(() => {
    setFocus(true)
  })

  return (
    <View
      className='code-number-input'
      onClick={() => {
        setFocus(true)
      }}
    >
      {Array.from({ length: 6 }).map((_, index) => {
        return (
          <View
            key={index}
            className={classNames('num', {
              'num--active': getValueOfIndex(index)
            })}
          >
            {getValueOfIndex(index)}
          </View>
        )
      })}
      <Input
        type='number'
        maxLength={6}
        focus={focus}
        className='input'
        value={value}
        onInput={e => onInput(e.detail.value)}
        onBlur={() => setFocus(false)}
      />
    </View>
  )
}
