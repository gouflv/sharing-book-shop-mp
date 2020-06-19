import './index.scss'
import Taro, { FC } from '@tarojs/taro'
import { View, Image, Input } from '@tarojs/components'

export const CommentList: FC = () => {
  return (
    <View>
      <View className='comment-list'>
        {Array.from({ length: 10 }).map((_, i) => (
          <View className='comment' key={i}>
            <View className='header d-flex'>
              <Image className='thumb' src={'http://placehold.it/72x72'} />
              <View className='content flex-fill'>
                <View className='title'>Lorem ipsum.</View>
                <View className='desc text-second'>2020/6/2 10:10</View>
              </View>
            </View>
            <View className='body text-second'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
              beatae culpa dolorem explicabo ipsa mollitia repellat rerum
              sapiente tempora veritatis.
            </View>
          </View>
        ))}
      </View>

      <View className='action-bar'>
        <View className='form'>
          <Input placeholder={'请发表您的看法...'} confirmType={'send'} />
          <View className='send'>
            <Image
              src={require('../../../assets/course_detail_ico_comment@2x.png')}
            />
          </View>
        </View>
      </View>
    </View>
  )
}
