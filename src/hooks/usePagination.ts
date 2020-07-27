import { hideLoading, showLoading } from '../utils'
import { useCallback, useEffect, useReachBottom, useState } from '@tarojs/taro'
import { defaultErrorHandler, POST } from '../utils/ajax'

interface usePaginationProps {
  url: string
  params?: any
}

// eslint-disable-next-line import/prefer-default-export
export const usePagination = ({ url, params }: usePaginationProps) => {
  const [items, setItems] = useState<any[]>([])
  const [index, setIndex] = useState(1)
  const [loading, setLoading] = useState(false)
  const [isFinish, setFinish] = useState(false)
  const [isEmpty, setEmpty] = useState(false)

  const fetch = useCallback(async () => {
    try {
      const f_items = await POST(url, {
        data: {
          page: index,
          size: 20,
          ...params
        }
      })

      if (!f_items.length) {
        setFinish(true)
        if (index === 1) {
          setEmpty(true)
        }
      } else {
        const n_items = [...items, ...f_items]
        setItems(n_items)
      }
    } catch (e) {
      setFinish(true)
      defaultErrorHandler(e)
    } finally {
      setLoading(false)
      hideLoading()
    }
  }, [index, items, url, params])

  async function fetchStart() {
    showLoading()
    setItems([])
    setEmpty(false)
    setFinish(false)
    setIndex(1)
    setLoading(true)
  }

  async function fetchNext() {
    setIndex(prevState => prevState + 1)
    setLoading(true)
  }

  useEffect(() => {
    if (url && loading && !isFinish) {
      fetch()
    }
  }, [fetch, isFinish, loading, url])

  useReachBottom(() => {
    if (!loading && !isFinish && !isEmpty) {
      fetchNext()
    }
  })

  return { items, fetchNext, fetchStart, loading, isFinish, isEmpty }
}
