import './index.scss'
import Taro, {
  FC,
  useContext,
  useDidShow,
  useRouter,
  useState
} from '@tarojs/taro'
import { Button, Input, Text, View } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { useCountDownResume } from '../../hooks/useCountDownResume'
import { hideLoading, showLoading, showToast } from '../../utils'
import { defaultErrorHandler, POST } from '../../utils/ajax'
import { AppStore } from '../../store/AppStore'
import { observer } from '@tarojs/mobx'

const Page: FC = () => {
  const router = useRouter()
  const { authCallback, setAuthCallback } = useContext(AppStore)

  const [hasSend, setHasSend] = useState(false)
  const {
    timeLeft,
    getTimeRemind,
    startCountDown,
    updateCountDownStamp
  } = useCountDownResume('user-bind-phone')

  const [phone, setPhone] = useState('')
  const [smsCode, setSmsCode] = useState('')

  useDidShow(() => {
    const remind = getTimeRemind()
    if (remind) {
      // @ts-ignore
      startCountDown(remind)
    }
  })

  async function onSendClick() {
    if (!validatePhone()) {
      return
    }

    showLoading()
    try {
      await POST('common/sendMsg', {
        data: { tel: phone }
      })
      setSmsCode('')
      setHasSend(true)
      // @ts-ignore
      startCountDown()
      updateCountDownStamp()
    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      hideLoading()
    }
  }

  function validatePhone() {
    if (!phone) {
      showToast({ title: '请输入您的手机号' })
      return false
    }
    if (!/1\d{10}$/.test(phone)) {
      showToast({ title: '手机号输入有误，请重新输入' })
      return false
    }
    return true
  }

  function validateSmsCode() {
    if (!smsCode) {
      showToast({ title: '请输入短信验证码' })
      return false
    }
    return true
  }

  async function submit() {
    if (!validatePhone() || !validateSmsCode()) {
      return
    }
    showLoading()
    try {
      await POST('common/verifyCode', {
        data: {
          tel: phone,
          code: smsCode.substr(0, 6)
        }
      })
      showToast({ title: '绑定成功', icon: 'success' })
      setTimeout(() => {
        if (router.params.change) {
          Taro.navigateBack()
        } else {
          onAuthSuccess()
        }
      }, 2000)
    } catch (e) {
      showToast({ title: e.message })
      setSmsCode('')
    } finally {
      hideLoading()
    }
  }

  function onAuthSuccess() {
    if (authCallback) {
      authCallback.func({ redirect: true })
      setAuthCallback(null)
    } else {
      Taro.reLaunch({ url: '/pages/index/index' })
    }
  }

  return (
    <View className='page-user-bind-phone'>
      <PageHeaderWrapper title={'绑定手机号'}>
        <View className={'page-space-around'}>
          <View className='form'>
            <View className='form-item'>
              <Input
                type={'text'}
                maxLength={11}
                autoFocus
                placeholder={'请输入手机号'}
                value={phone}
                onInput={e => setPhone(e.detail.value)}
              />
            </View>
            <View className='form-item'>
              <Input
                type={'text'}
                placeholder={'请输入验证码'}
                value={smsCode}
                onInput={e => setSmsCode(e.detail.value)}
              />
              <View className='append'>
                {timeLeft && <Text>{(timeLeft as number) / 1000}s</Text>}
                {!timeLeft && (
                  <Text onClick={onSendClick}>
                    {hasSend ? '点击重新获取' : '获取验证码'}
                  </Text>
                )}
              </View>
            </View>
            <Button className={'btn-primary'} onClick={submit}>
              绑定
            </Button>
          </View>
        </View>
      </PageHeaderWrapper>
    </View>
  )
}

export default observer(Page)
