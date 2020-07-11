import './index.scss'
import Taro, { FC } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

export const SubjectListItem: FC<{ data }> = ({ data }) => {
  return (
    <View
      className='subject-list-item'
      onClick={() => Taro.navigateTo({ url: '/pages/subject-detail/index' })}
    >
      <View className='d-flex main'>
        <View className='flex-fill d-flex'>
          <Image
            className='thumb'
            src={data.curriculumImageUrl || 'http://placehold.it/226x126'}
            mode={'aspectFill'}
          />
          <View className='flex-fill'>
            <View className='title'>{data.curriculumName}</View>
            <View className='desc'>{data.curriculumIntroduce || ''}</View>
            <View className='tag'>
              {data.ageLowerLimit}-{data.ageUpperLimit}岁
            </View>
          </View>
        </View>
        <View className='action'>
          <View className='tag tag--primary'>{data.status}进行中</View>
        </View>
      </View>
      <View className='d-flex footer'>
        <View className='flex-fill text-second'>
          共<Text>{data.curriculumNum || 0}</Text>节课,{' '}
          <Text className={'danger'}>{data.curriculumJoinNum || 0}</Text>
          人已参加
        </View>
        <View className='success'>{data.curriculumPrice || '免费'}</View>
      </View>
    </View>
  )
}
