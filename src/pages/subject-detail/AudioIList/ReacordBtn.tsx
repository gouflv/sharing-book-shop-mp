import './ReacordBtn.scss'
import Taro, { FC, CanvasContext } from '@tarojs/taro'
import { View, Canvas } from '@tarojs/components'
import useScope = Taro.useScope
import useEffect = Taro.useEffect
import useRef = Taro.useRef

const size = 32
const lineColor = '#1989ff'
const lineWidth = 2
const bgColor = '#efefef'
const minValue = 0
const maxValue = 100

export const RecordBtn: FC<{ value: number }> = ({ value }) => {
  const scope = useScope()
  const ctxRef = useRef<CanvasContext>()

  useEffect(() => {
    ctxRef.current = Taro.createCanvasContext('canvas', scope)
    draw()
  }, [])

  useEffect(() => {
    draw()
  }, [value])

  //
  // https://github.com/StruggleThunder/weapp-canvas-ring/blob/master/components/canvas-ring/canvas-ring.js
  //
  function draw() {
    const ctx = ctxRef.current
    if (!ctx) return

    // const percent = 360 * ((value - minValue) / (maxValue - minValue))
    // ctx.translate(size / 2, size / 2)
    // ctx.beginPath()
    // ctx.setStrokeStyle(bgColor)
    // ctx.setLineWidth(lineWidth)
    // ctx.arc(0, 0, size / 2 - 10, 0, 2 * Math.PI, true)
    // ctx.stroke()
    // ctx.closePath()

    ctx.fillStyle = 'green'
    ctx.fillRect(10, 10, 150, 100)

    ctx.draw()
  }

  return (
    <View className='record-btn'>
      <Canvas canvasId={'canvas'} type='2d' />
    </View>
  )
}
