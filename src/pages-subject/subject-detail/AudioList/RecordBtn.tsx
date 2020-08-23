import './RecordBtn.scss'
import Taro, { FC, useEffect, useState } from '@tarojs/taro'
import { Image, Text, View } from '@tarojs/components'

const size = 72
const numToRPX = (num: number) => Taro.pxTransform(num)

export const RecordBtn: FC<{
  hasRecord: boolean
  value: number
  onClick: () => void
}> = props => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    setValue(Math.max(0, Math.min(Math.floor(props.value), 100)))
  }, [props.value])

  const [clipPath, setClipPath] = useState('')

  function getPolygon(e) {
    return 0 <= e && e < 25
      ? '50% 50%, 0% 0%, ' + getCurProgress(e) + '% 0%'
      : 25 <= e && e < 50
      ? '50% 50%, 0% 0%, 100% 0%, 100% ' + getCurProgress(e - 25) + '%'
      : 50 <= e && e < 75
      ? '50% 50%, 0% 0%, 100% 0%, 100% 100%, ' +
        (100 - getCurProgress(e - 50)) +
        '% 100%'
      : '50% 50%, 0% 0%, 100% 0%, 100% 100%, 0 100%, 0% ' +
        (100 - getCurProgress(e - 75)) +
        '%'
  }

  function getCurProgress(e) {
    return (e / 25) * 100
  }

  useEffect(() => {
    setClipPath(`polygon(${getPolygon(value)})`)
  }, [value])

  return (
    <View className='record-btn' onClick={props.onClick}>
      <View
        className={'progress'}
        style={{
          width: numToRPX(size),
          height: numToRPX(size)
        }}
      >
        <View className='line' style={{ clipPath }} />
      </View>
      <View className='inner'>
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
