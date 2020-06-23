import './index.scss'
import Taro, { FC } from '@tarojs/taro'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { View, Image, Button, Input, Picker } from '@tarojs/components'
import { GenderCheckbox } from './GenderCheckbox'

const Page: FC = () => {
  function onBirthDayChange(value: string) {
    console.log(value)
  }
  function onSchoolDayChange(value: string) {
    console.log(value)
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
              <View className='edit'>
                <Image src={require('../../assets/vip_baby_edit@2x.png')} />
              </View>
            </View>
            <View className='form'>
              <View className='form-item'>
                <View className='label'>
                  <Image
                    src={require('../../assets/vip_baby_ico_name@2x.png')}
                  />
                </View>
                <View className='value'>
                  <Input placeholder={'请输入宝宝姓名'} />
                </View>
              </View>
              <View className='form-item'>
                <View className='label'>性别</View>
                <View className='value'>
                  <GenderCheckbox value={1} onChange={() => {}} />
                </View>
              </View>
              <Picker
                mode={'date'}
                value={'2020-06-01'}
                onChange={e => onBirthDayChange(e.detail.value)}
                start={'2000-01-01'}
                end={'2030-12-31'}
              >
                <View className='form-item'>
                  <View className='label'>出生日期</View>
                  <View className='value'>2020/6/1</View>
                  <Image
                    className='link'
                    src={require('../../assets/vip_ico_arrow@2x.png')}
                  />
                </View>
              </Picker>
              <Picker
                mode={'date'}
                value={'2020-06-01'}
                onChange={e => onSchoolDayChange(e.detail.value)}
                start={'2000-01-01'}
                end={'2030-12-31'}
                fields={'month'}
              >
                <View className='form-item'>
                  <View className='label'>入学时间</View>
                  <View className='value'>2020/6</View>
                  <Image
                    className='link'
                    src={require('../../assets/vip_ico_arrow@2x.png')}
                  />
                </View>
              </Picker>
              <View className='form-item'>
                <View className='label'>所属幼儿园</View>
                <View className='value'>
                  <Input placeholder={'请输入所属幼儿园'} />
                </View>
              </View>
              <View className='form-item'>
                <View className='label'>班级</View>
                <View className='value'>
                  <Input placeholder={'请输入所在班级'} />
                </View>
              </View>

              <Button className='btn-primary'>保存</Button>
            </View>
          </View>
        </View>
      </PageHeaderWrapper>
    </View>
  )
}

export default Page
