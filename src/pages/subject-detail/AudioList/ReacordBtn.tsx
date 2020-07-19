import './ReacordBtn.scss'
import Taro, { FC, useEffect, useState } from '@tarojs/taro'
import { Image, Text, View } from '@tarojs/components'

const size = 36
const lineColor = '#1989ff'
const lineWidth = 2
const bgColor = '#d0e6ff'
const minValue = 0
const maxValue = 100

export const RecordBtn: FC<{
  hasRecord: boolean
  value: number
  onClick: () => void
}> = props => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    setValue(Math.floor(props.value))
  }, [props.value])

  return (
    <View className='record-btn' onClick={props.onClick}>
      <View
        className={'progress'}
        style={{
          backgroundColor: lineColor,
          width: `${size}px`,
          height: `${size}px`
        }}
      >
        <View
          className='circle_left'
          style={{
            backgroundColor: bgColor,
            width: `${size}px`,
            height: `${size}px`,
            transform: `rotate(${value > 50 ? (value - 50) * 3.6 : 0}deg)`,
            clip: `rect(0, ${size / 2}px, auto, 0)`
          }}
        >
          <View
            className='clip_left'
            style={{
              width: `${size}px`,
              height: `${size}px`,
              clip: `rect(0, ${size / 2}px, auto, 0)`
            }}
          />
        </View>
        <View
          className='circle_right'
          style={{
            backgroundColor: value > 50 ? lineColor : bgColor,
            width: `${size}px`,
            height: `${size}px`,
            transform: `rotate(${value > 50 ? 0 : value * 3.6}deg)`,
            clip: `rect(0, ${size / 2}px, auto, 0)`
          }}
        >
          <View
            className='clip_right'
            style={{
              width: `${size}px`,
              height: `${size}px`,
              clip: `rect(0, auto, auto, ${size / 2}px)`
            }}
          />
        </View>

        <View
          className='mask'
          style={{
            width: `${size - lineWidth * 2}px`,
            height: `${size - lineWidth * 2}px`,
            top: `${lineWidth}px`,
            left: `${lineWidth}px`
          }}
        />
      </View>

      <View className='record-btn__inner'>
        {props.hasRecord ? (
          <Text className={'text'}>重录</Text>
        ) : (
          <Image
            className={'icon'}
            src={require('../../../assets/course_detail_ico_record@2x.png')}
          />
        )}
      </View>
    </View>
  )
}
