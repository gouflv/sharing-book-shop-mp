import '../subject/index.scss'
import './index.scss'
import Taro, { FC, useEffect, useState } from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { SubjectCard } from '../subject/SubjectCard'
import { defaultErrorHandler, POST } from '../../utils/ajax'
import { hideLoading, showLoading } from '../../utils'
import BasicPageWrapper from '../../components/BasicPageWrapper'
import { useLocalStorageState } from '../../hooks/useLocalStorageState'

const Page: FC = () => {
  const [search, setSearch] = useState('')
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  async function fetch() {
    try {
      setLoading(true)
      showLoading()
      const data = await POST('curriculum/searchCurriculum', {
        data: { search }
      })
      setList(data)
    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      hideLoading()
      setLoading(false)
    }
  }

  useEffect(() => {
    if (search) {
      fetch()
      saveSearchHistory(search)
    } else {
      setList([])
    }
  }, [search])

  // history
  const [history, setHistory] = useLocalStorageState<string[]>(
    'search_history',
    []
  )
  function saveSearchHistory(search: string) {
    const val = new Set([search, ...(history || [])])
    setHistory([...val])
  }
  function removeSearchHistory(index) {
    const copy = [...(history || [])]
    copy.splice(index, 1)
    setHistory(copy)
  }

  return (
    <BasicPageWrapper>
      <View className='page-subject'>
        <PageHeaderWrapper
          title={''}
          showSearch
          search={search}
          onSearch={val => setSearch(val)}
        >
          {!search && history && history.length && (
            <View className={'page-space-around history-list'}>
              <View className='title'>搜索历史</View>
              <View className='list'>
                {history.map((h, i) => (
                  <View className={'item'} key={i}>
                    <View className='label' onClick={() => setSearch(h)}>
                      {h}
                    </View>
                    <View
                      className='btn'
                      onClick={() => removeSearchHistory(i)}
                    >
                      <Image src={require('../../assets/close2.png')} />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {search && !loading && !list.length && (
            <View className={'empty-list'}>暂无匹配的课程</View>
          )}

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
