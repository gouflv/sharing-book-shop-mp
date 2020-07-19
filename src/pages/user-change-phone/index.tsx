import './index.scss'
import Taro, { FC, useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { Step1 } from './Step1'

const Page: FC = () => {
  const [step, setStep] = useState<0 | 1>(0)
  return (
    <View className='page-user-change-phone'>
      <PageHeaderWrapper title={'手机号更换'}>
        <View>{step === 0 && <Step1 onSuccess={() => setStep(1)} />}</View>
      </PageHeaderWrapper>
    </View>
  )
}

export default Page
