import './index.scss'
import Taro, { FC, useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { Step1 } from './Step1'

const Page: FC = () => {
  return (
    <View className='page-user-change-phone'>
      <PageHeaderWrapper title={'手机号更换'}>
        <View>
          <Step1
            onSuccess={() => {
              Taro.redirectTo({
                url: '/pages/user-bind-phone/index?change=1'
              })
            }}
          />
        </View>
      </PageHeaderWrapper>
    </View>
  )
}

export default Page
