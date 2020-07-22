import Taro, { FC, useContext } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { Message } from '../Message'
import { MessageService } from '../../store/MessageService'
import { UserActiveModal } from '../Modals/UserActiveModal'

const BasicPageWrapper: FC = props => {
  const { visible, options } = useContext(MessageService)

  return (
    <View className='basic-page-wrapper'>
      {props.children}
      {visible && <Message {...options} />}
      <UserActiveModal />
    </View>
  )
}

export default observer(BasicPageWrapper)
