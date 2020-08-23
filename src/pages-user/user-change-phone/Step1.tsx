import './index.scss'
import { Button, Text, View } from '@tarojs/components'
import { CodeNumberInput } from '../../components/CodeInput'
import Taro, { FC, useContext, useEffect, useState } from '@tarojs/taro'
import { AppStore } from '../../store/AppStore'
import { useCountDownResume } from '../../hooks/useCountDownResume'
import { encodePhone, hideLoading, showLoading, showToast } from '../../utils'
import { defaultErrorHandler, POST } from '../../utils/ajax'
import useDidShow = Taro.useDidShow

export const Step1: FC<{ onSuccess: () => void }> = props => {
  const { user } = useContext(AppStore)

  const {
    timeLeft,
    getTimeRemind,
    startCountDown,
    updateCountDownStamp
  } = useCountDownResume('profile-chang-phone')

  const [smsCode, setSmsCode] = useState('')
  const [hasSend, setHasSend] = useState(false)

  useDidShow(() => {
    const remind = getTimeRemind()
    if (remind) {
      // @ts-ignore
      startCountDown(remind)
    } else {
      if (!hasSend) {
        console.log('sendSms')
        sendSms()
        // @ts-ignore
        startCountDown()
        updateCountDownStamp()
        setHasSend(true)
      }
    }
  })

  async function sendSms() {
    showLoading()
    try {
      await POST('common/sendMsg', {
        data: { tel: user && user.tel, type: 2 }
      })
    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      hideLoading()
    }
  }

  async function commitSmsCode() {
    if (!smsCode) {
      showToast({ title: '请输入短信验证码' })
      return
    }

    showLoading()
    try {
      await POST('common/verifyCode', {
        data: {
          tel: user && user.tel,
          code: smsCode.substr(0, 6)
        }
      })
      props.onSuccess()
    } catch (e) {
      showToast({ title: '验证码有误，请核对' })
    } finally {
      hideLoading()
    }
  }

  useEffect(() => {
    if (smsCode.length === 6) {
      commitSmsCode()
    }
  }, [smsCode])

  return (
    <View className='page-user-change-phone'>
      <View className='title'>
        已发送短信验证码至 {user && encodePhone(user.tel)}
      </View>
      <View className='countdown'>
        {timeLeft > 0 ? (
          <Text>{(timeLeft as number) / 1000}s</Text>
        ) : (
          <Text
            className='primary'
            onClick={() => {
              sendSms()
              // @ts-ignore
              startCountDown()
            }}
          >
            获取验证码
          </Text>
        )}
      </View>

      <CodeNumberInput onChange={val => setSmsCode(val)} />

      <Button className='btn-primary' onClick={commitSmsCode}>
        下一步
      </Button>
    </View>
  )
}
