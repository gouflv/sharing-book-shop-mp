import Taro, { FC, useContext } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { Message } from '../Message'
import { MessageService } from '../../store/MessageService'
import { UserActiveModal } from '../Modals/UserActiveModal'
import { NotificationService } from '../../store/NotificationService'

const BasicPageWrapper: FC = props => {
  const { visible: messageVisible, options: messageOptions } = useContext(
    MessageService
  )

  const { visible: notifyVisible, data, closeNotify } = useContext(
    NotificationService
  )

  return (
    <View className='basic-page-wrapper'>
      {props.children}
      {messageVisible && <Message {...messageOptions} />}
      {notifyVisible && data && (
        <UserActiveModal data={data} onClose={closeNotify} />
      )}
    </View>
  )
}

export default observer(BasicPageWrapper)
