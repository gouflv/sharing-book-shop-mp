import './index.scss'
import Taro, { FC, useState, useEffect } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import classNames from 'classnames'
import { POST } from '../../utils/ajax'
import { hideLoading, showLoading } from '../../utils'

const Page: FC = () => {
  const [tab, setTab] = useState(0)

  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  async function fetch() {
    showLoading()
    setLoading(true)
    const data = await POST('wxMember/getMemberCurriculum', {
      data: { type: tab + 1 }
    })
    setList(data)
    hideLoading()
    setLoading(false)
  }

  useEffect(() => {
    fetch()
  }, [tab])

  return (
    <View className='page-user-content'>
      <PageHeaderWrapper title={'我的作品'}>
        <PageHeaderExt fixed height={'90rpx'}>
          <View className='tabs tabs--header tabs--large'>
            <View
              className={classNames('tab-item', { active: tab === 0 })}
              onClick={() => setTab(0)}
            >
              进行中
            </View>
            <View
              className={classNames('tab-item', { active: tab === 1 })}
              onClick={() => setTab(1)}
            >
              已完成
            </View>
          </View>
        </PageHeaderExt>

        <View style={{ height: '90rpx' }} />

        <View className='page-space-around'>
          <View className='user-content-list'>
            {list.map((item, i) => (
              <View
                key={i}
                className='item'
                onClick={() => {
                  Taro.navigateTo({
                    url: `/pages/subject-detail/index?id=${item.curriculumId}`
                  })
                }}
              >
                <Image
                  className='thumb'
                  src={item.curriculumImageUrl || 'http://placehold.it/230x140'}
                  mode={'aspectFill'}
                />
                <View className='content'>
                  <View className='title'>{item.curriculumName}</View>
                  <View className='desc'>
                    <View className='times'>
                      <Image
                        src={require('../../assets/course_ico_class@2x.png')}
                      />
                      {item.curriculumNum}课
                    </View>
                    <View>{item.curriculumJoinNum}人配音</View>
                  </View>
                </View>
              </View>
            ))}
            {!loading && !list.length && (
              <View className='empty-list'>暂无作品</View>
            )}
          </View>
        </View>
      </PageHeaderWrapper>
    </View>
  )
}

export default Page
