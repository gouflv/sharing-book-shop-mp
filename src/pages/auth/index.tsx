import './index.scss'
import Taro, { FC, useContext, useState } from '@tarojs/taro'
import { Button, Image, Navigator, View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { defaultErrorHandler } from '../../utils/ajax'
import { hideLoading, showLoading } from '../../utils'
import { AppStore } from '../../store/AppStore'

const Page: FC = () => {
  const { loginWithData } = useContext(AppStore)

  const [mode, setMode] = useState<'useInfo' | 'phoneNumber'>('useInfo')

  async function onGetUserInfo({ encryptedData, iv }) {
    if (!encryptedData) {
      return
    }
    try {
      showLoading()
      await loginWithData({ encryptedData, iv })
      setMode('phoneNumber')
    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      hideLoading()
    }
  }

  function onGetPhoneNumber({ encryptedData, iv }) {
    if (!encryptedData) {
      return
    }
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
