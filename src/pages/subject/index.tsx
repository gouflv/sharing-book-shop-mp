import './index.scss'
import Taro, { FC, useEffect, useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { SubjectCard } from './SubjectCard'
import classNames from 'classnames'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import { POST } from '../../utils/ajax'
import { hideLoading, showLoading } from '../../utils'
import BasicPageWrapper from '../../components/BasicPageWrapper'

const Page: FC = () => {
  const [tag, setTag] = useState<any[]>([])
  const [list, setList] = useState<any[]>([])
  const [activeTag, setActiveTag] = useState('')

  useEffect(() => {
    async function fetch() {
      showLoading()
      const res1 = await POST('curriculum/getCurriculumLabel')
      setTag(res1)
      if (res1 && res1.length) {
        setActiveTag(res1[0].name)
      }
      hideLoading()
    }
    fetch()
  }, [])

  async function fetchList() {
    showLoading()
    const res = await POST('curriculum/getCurriculumByLabel', {
      data: { label: activeTag }
    })
    setList(res)
    hideLoading()
  }

  useEffect(() => {
    if (activeTag) fetchList()
  }, [activeTag])

  return (
    <BasicPageWrapper>
      <View className='page-subject'>
        <PageHeaderWrapper title={'精品课程'} hideBackArrow>
          <PageHeaderExt fixed height={'90rpx'}>
            <View className='tabs'>
              {tag.map((t, i) => (
                <View
                  className={classNames({
                    'tab-item': 1,
                    active: t.name === activeTag
                  })}
                  key={i}
                  onClick={() => setActiveTag(t.name)}
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
    </BasicPageWrapper>
  )
}

export default Page
