import './ReacordBtn.scss'
import Taro, {
  CanvasContext,
  FC,
  useEffect,
  useRef,
  useScope,
  useState,
  useContext
} from '@tarojs/taro'
import { Canvas, Image, View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { AppStore } from '../../../store/AppStore'

const size = 36
const lineColor = '#1989ff'
const lineWidth = 2
const bgColor = '#d0e6ff'
const minValue = 0
const maxValue = 100

const RecordBtnComponent: FC<{
  value: number
  onClick: () => void
}> = props => {
  const { platform } = useContext(AppStore)
  const [value, setValue] = useState(props.value)
  const scope = useScope()
  const ctxRef = useRef<CanvasContext>()

  useEffect(() => {
    ctxRef.current = Taro.createCanvasContext('canvas', scope)
  }, [])

  useEffect(() => {
    if (props.value % 2 === 0) {
      setValue(props.value)
    }
  }, [props.value])

  useEffect(draw, [value])

  //
  // https://github.com/StruggleThunder/weapp-canvas-ring/blob/master/components/canvas-ring/canvas-ring.js
  //
  function draw() {
    const ctx = ctxRef.current
    if (!ctx) return
    const percent = 360 * ((value - minValue) / (maxValue - minValue))

    ctx.save()

    // BG
    ctx.translate(size / 2, size / 2)
    ctx.beginPath()
    ctx.setStrokeStyle(bgColor)
    ctx.setLineWidth(lineWidth)
    ctx.arc(
      0,
      0,
      size / 2 - (platform === 'android' ? lineWidth + 2 : lineWidth),
      0,
      2 * Math.PI
    )
    ctx.stroke()

    // BAR
    ctx.beginPath()
    ctx.setStrokeStyle(lineColor)
    ctx.setLineWidth(lineWidth)
    ctx.arc(
      0,
      0,
      size / 2 - (platform === 'android' ? lineWidth + 2 : lineWidth),
      -0.5 * Math.PI,
      (percent * Math.PI) / 180 + -0.5 * Math.PI
    )
    ctx.stroke()

    ctx.beginPath()
    ctx.setFillStyle(lineColor)
    ctx.arc(0, 0, (platform === 'android' ? 26 - 2 : 26) / 2, 0, 2 * Math.PI)
    ctx.fill()

    // ctx.restore()
    // ctx.drawImage(
    //   require('../../../assets/course_detail_ico_record@2x.png'),
    //   25 / 2,
    //   21 / 2,
    //   22 / 2,
    //   30 / 2
    // )

    ctx.draw(false, updateImage)
  }

  const [imgPath, setImgPath] = useState<string>()
  async function updateImage() {
    const res = await Taro.canvasToTempFilePath({ canvasId: 'canvas' }, scope)
    setImgPath(res.tempFilePath)
  }

  return (
    <View className='record-btn' onClick={props.onClick}>
      <Canvas canvasId={'canvas'} />
      {imgPath && <Image src={imgPath} />}
    </View>
  )
}

export const RecordBtn = observer(RecordBtnComponent)
