import './index.scss'
import Taro, { FC, useState, useEffect } from '@tarojs/taro'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { View, Image, Button, Input, Picker } from '@tarojs/components'
import { GenderCheckbox } from './GenderCheckbox'
import { hideLoading, showLoading, showToast } from '../../utils'
import { defaultErrorHandler, POST } from '../../utils/ajax'

interface FormData {
  childName: string
  childBirthday: string
  childSex: 1 | 2
  kindergarten: string
  childClass: string
  startSchoolDate: string
}

const Page: FC = () => {
  const [data, setData] = useState<FormData>()

  useEffect(() => {
    async function fetch() {
      showLoading()
      const data = await POST('wxMember/getChildMsg')
      setData(data)
      hideLoading()
    }
    fetch()
  }, [])

  const [isEdit, setEdit] = useState(false)

  function setFormData(key: keyof FormData, value) {
    setData(prevState => {
      return { ...prevState, [key]: value } as FormData
    })
  }

  async function onSubmit() {
    try {
      showLoading()
      await POST('wxMember/updateChildMsg', {
        data
      })
      showToast({ title: '保存成功' })
      setEdit(false)
    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      hideLoading()
    }
  }

  if (!data) {
    return <View />
  }

  return (
    <View className='page-baby-profile'>
      <PageHeaderWrapper
        title={'我的宝宝'}
        bg={require('../../assets/vip_top_bg2.jpg')}
        bgHeight={'490rpx'}
      >
        <PageHeaderExt
          absolute
          height={'140rpx'}
          bg={require('../../assets/vip_top_bg2.jpg')}
          bgHeight={'490rpx'}
        />

        <View className='page-space-around'>
          <View className='box'>
            <View className='title'>
              我的宝宝
              {!isEdit && (
                <View className='edit' onClick={() => setEdit(true)}>
                  <Image src={require('../../assets/vip_baby_edit@2x.png')} />
                </View>
              )}
            </View>
            <View className='form'>
              <View className='form-item'>
                <View className='label'>
                  <Image
                    src={require('../../assets/vip_baby_ico_name@2x.png')}
                  />
                </View>
                <View className='value'>
                  <Input
                    value={data.childName}
                    onInput={e => setFormData('childName', e.detail.value)}
                    placeholder={'请输入宝宝姓名'}
                    disabled={!isEdit}
                  />
                </View>
              </View>
              <View className='form-item'>
                <View className='label'>性别</View>
                <View className='value'>
                  <GenderCheckbox
                    value={data.childSex}
                    onChange={value => setFormData('childSex', value)}
                    disabled={!isEdit}
                  />
                </View>
              </View>
              <Picker
                mode={'date'}
                value={data.childBirthday || ''}
                onChange={e => setFormData('childBirthday', e.detail.value)}
                start={'2000-01-01'}
                end={'2030-12-31'}
                disabled={!isEdit}
              >
                <View className='form-item'>
                  <View className='label'>出生日期</View>
                  <View className='value'>{data.childBirthday || ''}</View>
                  {isEdit && (
                    <Image
                      className='link'
                      src={require('../../assets/vip_ico_arrow@2x.png')}
                    />
                  )}
                </View>
              </Picker>
              <Picker
                mode={'date'}
                value={data.startSchoolDate || ''}
                onChange={e => setFormData('startSchoolDate', e.detail.value)}
                start={'2000-01-01'}
                end={'2030-12-31'}
                fields={'month'}
                disabled={!isEdit}
              >
                <View className='form-item'>
                  <View className='label'>入学时间</View>
                  <View className='value'>{data.startSchoolDate || ''}</View>
                  {isEdit && (
                    <Image
                      className='link'
                      src={require('../../assets/vip_ico_arrow@2x.png')}
                    />
                  )}
                </View>
              </Picker>
              <View className='form-item'>
                <View className='label'>所属幼儿园</View>
                <View className='value'>
                  <Input
                    value={data.kindergarten}
                    onInput={e => setFormData('kindergarten', e.detail.value)}
                    placeholder={'请输入所属幼儿园'}
                    disabled={!isEdit}
                  />
                </View>
              </View>
              <View className='form-item'>
                <View className='label'>班级</View>
                <View className='value'>
                  <Input
                    value={data.childClass}
                    onInput={e => setFormData('childClass', e.detail.value)}
                    placeholder={'请输入所在班级'}
                    disabled={!isEdit}
                  />
                </View>
              </View>

              {isEdit && (
                <Button className='btn-primary' onClick={onSubmit}>
                  保存
                </Button>
              )}
            </View>
          </View>
        </View>
      </PageHeaderWrapper>
    </View>
  )
}

export default Page
