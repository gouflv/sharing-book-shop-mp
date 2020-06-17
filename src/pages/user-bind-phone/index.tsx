import './index.scss'
import Taro, { FC } from '@tarojs/taro'
import { View, Input, Button } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'

const Page: FC = () => {
  return (
    <View>
      <PageHeaderWrapper title={'绑定手机号'}>
        <View className={'page-space-around'}>
          <View className='form'>
            <View className='form-item'>
              <Input
                type={'text'}
                maxLength={11}
                autoFocus
                placeholder={'请输入手机号'}
              />
            </View>
            <View className='form-item'>
              <Input type={'text'} placeholder={'请输入验证码'} />
              <View className='append'>获取验证码</View>
            </View>
            <Button className={'btn-primary'}>绑定</Button>
          </View>
        </View>
      </PageHeaderWrapper>
    </View>
  )
}

export default Page
