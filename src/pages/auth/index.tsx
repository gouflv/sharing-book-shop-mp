import './index.scss'
import Taro, { FC, useContext, useEffect, useState } from '@tarojs/taro'
import { Button, Image, Navigator, View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { AppStore } from '../../store/AppStore'
import { hideLoading, showLoading, showToast } from '../../utils'
import { defaultErrorHandler } from '../../utils/ajax'
import { APP_NAME } from '../../config'

const Page: FC = () => {
  const {
    authLogin,
    authLoginWithPhone,
    fetchUserInfo,
    authCallback,
    setAuthCallback
  } = useContext(AppStore)

  const [mode, setMode] = useState<'useInfo' | 'phoneNumber'>('useInfo')
  useEffect(() => {
    if (authCallback && authCallback.authType) {
      setMode(authCallback.authType)
    }
  }, [])

  //#region form
  const [code, setCode] = useState('')
  async function wxLogin() {
    showLoading()
    try {
      const { code, errMsg } = await Taro.login()
      if (!code) {
        showToast({ title: errMsg })
        return
      }
      setCode(code)
    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      hideLoading()
    }
  }
  useEffect(() => {
    wxLogin()
  }, [])

  async function onGetUserInfo({ encryptedData, iv }) {
    if (!encryptedData) {
      return
    }
    await authLogin({ encryptedData, iv, code })

    showLoading()
    const user = await fetchUserInfo()

    if (user && user.tel) {
      showToast({ title: '登录成功' })
      if (authCallback) {
        runAuthCallbackFun()
      } else {
        Taro.reLaunch({ url: '/pages/index/index' })
      }
    } else {
      setMode('phoneNumber')
      await wxLogin()
    }

    hideLoading()
  }

  async function onGetPhoneNumber({ encryptedData, iv }) {
    if (!encryptedData) {
      return
    }
    await authLoginWithPhone({ encryptedData, iv, code })

    showLoading()
    await fetchUserInfo()
    hideLoading()

    showToast({
      title: '绑定手机号成功',
      success: () => {
        if (authCallback) {
          runAuthCallbackFun()
        } else {
          Taro.reLaunch({ url: '/pages/index/index' })
        }
      }
    })
  }

  function runAuthCallbackFun() {
    if (authCallback) {
      authCallback.func({ redirect: true })
      setAuthCallback(null)
    }
  }
  //#endregion

  return (
    <View className='page-auth'>
      <PageHeaderWrapper title={''}>
        {mode === 'useInfo' && (
          <View className='content'>
            <Image src={'http://placehold.it/140x140'} />
            <View className='title'>{APP_NAME}</View>
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
            <View className='title'>{APP_NAME}</View>
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
