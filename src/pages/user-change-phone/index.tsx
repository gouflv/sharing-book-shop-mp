import './index.scss'
import Taro, { FC, useState } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { CodeNumberInput } from '../../components/CodeInput'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'

const Page: FC = () => {
  const [smsCode, setSmsCode] = useState('')

  return (
    <View className='page'>
      <PageHeaderWrapper title={'手机号更换'}>
        <View className='title'>已发送短信验证码至 138****9999</View>
        <View className='countdown'>10s</View>

        <CodeNumberInput onChange={val => setSmsCode(val)} />

        <Button className='btn-primary'>下一步</Button>
      </PageHeaderWrapper>
    </View>
  )
}

export default Page
