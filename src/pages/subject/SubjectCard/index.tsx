import './index.scss'
import Taro, { FC } from '@tarojs/taro'
import { Image, View } from '@tarojs/components'

export const SubjectCard: FC<{ data }> = props => {
  const data = props.data || {}
  return (
    <View
      className={'subject-card'}
      onClick={() =>
        Taro.navigateTo({
          url: `/pages-subject/subject-detail/index?id=${data.curriculumId}`
        })
      }
    >
      <View className='thumb'>
        <Image
          src={data.curriculumImageUrl || 'http://placehold.it/330x184'}
          mode={'aspectFill'}
        />
        <View className='mask' />
        {data.status === 1 && data.status === 2 && (
          <View className='tag tag--primary'>
            {
              {
                '1': '进行中',
                '2': '已完成'
              }[data.status]
            }
          </View>
        )}
        <View className='plays'>
          <Image src={require('../../../assets/course_ico_play@2x.png')} />
          {data.curriculumVideoViews || 0}
        </View>
      </View>
      <View className='title'>{data.curriculumName}</View>
      <View className='d-flex footer'>
        <View className='flex-fill text-second'>
          {data.curriculumJoinNum || 0}人配音
        </View>
        <View className='text-second d-flex align-center'>
          <Image
            className='icon-time'
            src={require('../../../assets/course_ico_class@2x.png')}
          />
          {data.curriculumNum || 0}课
        </View>
      </View>
    </View>
  )
}
