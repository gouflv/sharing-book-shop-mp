import './index.scss'
import Taro, { FC, useEffect, useRouter, useState } from '@tarojs/taro'
import { View, Image, Input } from '@tarojs/components'
import { defaultErrorHandler, POST } from '../../../utils/ajax'
import { hideLoading, showLoading, showToast } from '../../../utils'

export const CommentList: FC<{ subjectId }> = props => {
  const [list, setList] = useState<any[]>()

  async function fetch() {
    showLoading()
    const data = await POST('curriculum/getCurriculumCommons', {
      data: {
        curriculumId: props.subjectId
      }
    })
    setList(
      (data || []).map(d => {
        return { ...d, memberName: decodeURIComponent(d.memberName) }
      })
    )
    hideLoading()
  }
  useEffect(() => {
    fetch()
  }, [])

  const [content, setContent] = useState('')

  async function onSubmit() {
    if (!content.length) {
      showToast({ title: '请填写内容' })
      return
    }
    showLoading({ title: '正在发表' })
    try {
      await POST('curriculum/addCurriculumCommons', {
        data: {
          curriculumId: props.subjectId,
          content,
          starts: 5
        }
      })
      showToast({ title: '评论成功' })
      setContent('')
      fetch()
    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      hideLoading()
    }
  }

  if (!list) {
    return <View />
  }

  return (
    <View>
      {!list.length && <div>暂无评论</div>}

      {list.length && (
        <View className='comment-list'>
          {list.map((item, i) => (
            <View className='comment' key={i}>
              <View className='header d-flex'>
                <Image
                  className='thumb'
                  src={item.memberImage || 'http://placehold.it/72x72'}
                />
                <View className='content flex-fill'>
                  <View className='title'>{item.memberName}</View>
                  {item.createTime && (
                    <View className='desc text-second'>{item.createTime}</View>
                  )}
                </View>
              </View>
              <View className='body text-second'>{item.content}</View>
            </View>
          ))}
        </View>
      )}

      <View className='action-bar'>
        <View className='form'>
          <Input
            value={content}
            onInput={e => setContent(e.detail.value.trim())}
            placeholder={'请发表您的看法...'}
            confirmType={'send'}
          />
          <View className='send' onClick={onSubmit}>
            <Image
              src={require('../../../assets/course_detail_ico_comment@2x.png')}
            />
          </View>
        </View>
      </View>
    </View>
  )
}
