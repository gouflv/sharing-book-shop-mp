import './ReacordBtn.scss'
import Taro, {
  FC,
  CanvasContext,
  useState,
  useScope,
  useRef,
  useEffect
} from '@tarojs/taro'
import { View, Canvas, CoverView, CoverImage } from '@tarojs/components'

const size = 36
const lineColor = '#1989ff'
const lineWidth = 2
const bgColor = '#d0e6ff'
const minValue = 0
const maxValue = 100

export const RecordBtn: FC<{ value: number; onClick: () => void }> = props => {
  const [value, setValue] = useState(20)
  const scope = useScope()
  const ctxRef = useRef<CanvasContext>()

  useEffect(() => {
    ctxRef.current = Taro.createCanvasContext('canvas', scope)
    draw()
  }, [])

  useEffect(() => {
    if (Math.floor(props.value) !== value) {
      setValue(Math.floor(props.value))
    }
  }, [props.value])

  //
  // https://github.com/StruggleThunder/weapp-canvas-ring/blob/master/components/canvas-ring/canvas-ring.js
  //
  function draw() {
    const ctx = ctxRef.current
    if (!ctx) return
    const percent = 360 * ((value - minValue) / (maxValue - minValue))

    ctx.save()

    ctx.translate(size / 2, size / 2)
    ctx.beginPath()
    ctx.setStrokeStyle(bgColor)
    ctx.setLineWidth(lineWidth)
    ctx.arc(0, 0, size / 2 - lineWidth / 2, 0, 2 * Math.PI)
    ctx.stroke()

    ctx.beginPath()
    ctx.setStrokeStyle(lineColor)
    ctx.setLineWidth(lineWidth)
    ctx.arc(
      0,
      0,
      size / 2 - lineWidth / 2,
      -0.5 * Math.PI,
      (percent * Math.PI) / 180 + -0.5 * Math.PI
    )
    ctx.stroke()

    ctx.beginPath()
    ctx.setFillStyle(lineColor)
    ctx.arc(0, 0, 26 / 2, 0, 2 * Math.PI)
    ctx.fill()

    ctx.restore()
    ctx.drawImage(
      require('../../../assets/course_detail_ico_record@2x.png'),
      25 / 2,
      21 / 2,
      22 / 2,
      30 / 2
    )

    ctx.draw()
  }

  return (
    <View className='record-btn' onClick={props.onClick}>
      <Canvas canvasId={'canvas'} />
    </View>
  )
}
