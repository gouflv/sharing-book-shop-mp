import './index.scss'
import Taro, { FC, useState, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { SubjectCard } from './SubjectCard'
import classNames from 'classnames'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import { POST } from '../../utils/ajax'
import { hideLoading, showLoading } from '../../utils'

const Page: FC = () => {
  const [tag, setTag] = useState<any[]>([])
  const [list, setList] = useState<any[]>([])
  const [activeTag, setActiveTag] = useState('')

  useEffect(() => {
    async function fetch() {
      showLoading()
      const res1 = await POST('curriculum/getCurriculumLable')
      setTag(res1)
      if (res1 && res1.length) {
        setActiveTag(res1[0].dictionariesId)
      }
      hideLoading()
    }
    fetch()
  }, [])

  async function fetchList() {
    showLoading()
    const res = await POST('curriculum/getCurriculumByLable', {
      data: { lable: activeTag }
    })
    setList(res)
    hideLoading()
  }

  useEffect(() => {
    if (activeTag) fetchList()
  }, [activeTag])

  return (
    <View className='page-subject'>
      <PageHeaderWrapper title={'精品课程'} hideBackArrow>
        <PageHeaderExt fixed height={'90rpx'}>
          <View className='tabs'>
            {tag.map((t, i) => (
              <View
                className={classNames({
                  'tab-item': 1,
                  active: t.dictionariesId === activeTag
                })}
                key={i}
                onClick={() => setActiveTag(t.dictionariesId)}
              >
                {t.name}
              </View>
            ))}
          </View>
        </PageHeaderExt>

        <View style={{ height: '90rpx' }} />

        <View className='page-space-around grid-list'>
          {list.map((item, i) => (
            <SubjectCard key={i} data={item} />
          ))}
        </View>
      </PageHeaderWrapper>
    </View>
  )
}

export default Page
