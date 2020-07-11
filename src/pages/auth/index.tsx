import './index.scss'
import Taro, { FC, useContext, useState } from '@tarojs/taro'
import { Button, Image, Navigator, View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { AppStore } from '../../store/AppStore'
import { showToast } from '../../utils'

const Page: FC = () => {
  const { authLogin, authLoginWithPhone } = useContext(AppStore)

  const [mode, setMode] = useState<'useInfo' | 'phoneNumber'>('useInfo')

  async function onGetUserInfo({ encryptedData, iv }) {
    if (!encryptedData) {
      return
    }
    await authLogin({ encryptedData, iv })
    setMode('phoneNumber')
  }

  async function onGetPhoneNumber({ encryptedData, iv }) {
    if (!encryptedData) {
      return
    }
    await authLoginWithPhone({ encryptedData, iv })
    showToast({ title: '登录成功' })
    Taro.navigateBack()
  }

  return (
    <View className='page-auth'>
      <PageHeaderWrapper title={''}>
        {mode === 'useInfo' && (
          <View className='content'>
            <Image src={'http://placehold.it/140x140'} />
            <View className='title'>Lorem ipsum dolor sit.</View>
            <View className='desc'>申请获取你的公开信息（昵称、头像等）</View>
            <Button
              className='btn-primary'
              openType={'getUserInfo'}
              onGetUserInfo={e => onGetUserInfo(e.detail)}
            >
              微信授权
            </Button>
          </View>
        )}
        {mode === 'phoneNumber' && (
          <View className='content'>
            <Image src={'http://placehold.it/140x140'} />
            <View className='title'>Lorem ipsum dolor sit.</View>
            <View className='desc'>申请获取你的公开信息（昵称、头像等）</View>
            <Button
              className='btn-primary'
              openType={'getPhoneNumber'}
              onGetPhoneNumber={e => onGetPhoneNumber(e.detail)}
            >
              获取手机号
            </Button>
            <Navigator
              url='/pages/user-bind-phone/index'
              openType={'redirect'}
              className='extend'
            >
              使用手机号码登录
            </Navigator>
          </View>
        )}
      </PageHeaderWrapper>
    </View>
  )
}

export default observer(Page)
