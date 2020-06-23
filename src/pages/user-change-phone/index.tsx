import './index.scss'
import { FC, useState } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { CodeNumberInput } from '../../components/CodeInput'

const Page: FC = () => {
  const [smsCode, setSmsCode] = useState('')

  return (
    <View className='page'>
      <View className='title'>已发送短信验证码至 138****9999</View>
      <View className='countdown'>10s</View>

      <CodeNumberInput onChange={val => setSmsCode(val)} />

      <Button className='btn-primary'>下一步</Button>
    </View>
  )
}

export default Page
