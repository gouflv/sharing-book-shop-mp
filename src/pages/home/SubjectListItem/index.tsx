import './index.scss'
import Taro, { FC } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { Star } from '../../../components/Star'
import { useAuthGuard } from '../../../hooks/useAuthGuard'
import classNames from 'classnames'

export const SubjectListItem: FC<{ data }> = props => {
  const { withAuth } = useAuthGuard()

  const data = props.data || {}
  return (
    <View
      className='subject-list-item'
      onClick={() =>
        //TODO test
        withAuth(redirect => {
          ;(redirect ? Taro.redirectTo : Taro.navigateTo)({
            url: `/pages-subject/subject-detail/index?id=${data.curriculumId}`
          })
        })
      }
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
            <View className='desc'>
              <View className='label'>课程评价</View>
              <Star value={data.stars} />
            </View>
            <View className='tag'>
              {data.ageLowerLimit}-{data.ageUpperLimit}岁
            </View>
          </View>
        </View>
        <View className='action'>
          {data.status === 1 && data.status === 2 && (
            <View
              className={classNames('tag', {
                'tag--primary': data.status === 1,
                'tag--gray': data.status === 2
              })}
            >
              {
                {
                  '1': '进行中',
                  '2': '已完成'
                }[data.status]
              }
            </View>
          )}
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
