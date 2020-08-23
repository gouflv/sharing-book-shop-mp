import './index.scss'
import Taro, { FC } from '@tarojs/taro'
import { PageHeaderWrapper } from '../../components/PageHeaderWrapper'
import { PageHeaderExt } from '../../components/PageHeaderExt'
import { View } from '@tarojs/components'

const Page: FC = props => {
  return (
    <View className={'page-user-rules'}>
      <PageHeaderWrapper title={'借阅规则'}>
        <PageHeaderExt absolute height={'90rpx'} />
      </PageHeaderWrapper>

      <View style={{ height: '20rpx' }} />

      <View className='page-space-wing'>
        <View className='content'>
          <View className='section'>
            <View>规则介绍： </View>
            <View>书籍借阅形式分为：指纹借阅与扫码借阅</View>
            <View>1.指纹借阅：</View>
            <View>
              孩子可使用指纹在自助借阅机上进行书籍借阅（需提 前录制指纹);
            </View>
            <View>2.扫码借阅： </View>
            <View>在自助借阅机使用微信扫码借阅。</View>
          </View>
          <View className='section'>
            <View>借阅流程：</View>
            <View>选择书籍→设备识别→借阅确认（指纹或扫码） →借阅成功</View>
            <View>还书流程：</View>
            <View>归还书籍→设备识别→还书确认（指纹或扫码） →还书成功</View>
          </View>
          <View className='section'>
            <View>书籍赔偿：</View>
            <View>1.轻微破损：</View>
            <View>如果是轻微破损，不影响后续阅读，请不要自行修补；</View>
            <View>2.赔偿情况：</View>
            <View>
              情况包含不限于：书脊脱落，书本内容缺失，撕裂书
              页超过5cm，图书受潮/浸湿，图书弄脏且无法恢复，
              丢失，明显的折痕且无法恢复等，具体操作如下：
              在【借阅】→点击对应的书籍下的付款按钮购买。
            </View>
          </View>
          <View className='section'>
            <View>计费规则：</View>
            <View>
              超出权益借阅按照1元/本/天进行计算，在【借阅】中
              点击查看详情可查询计费详情，【借阅】中可进行支 付逾期费用。
            </View>
          </View>
          <View className='section'>
            <View>会员介绍：</View>
            <View>
              会员卡分为月卡、季卡、半年卡、年卡；每种会员卡 均含默认书位权益
            </View>
            <View>1.书位权益：</View>
            <View>书位权益为您当前可借阅的书籍数量；</View>
            <View>2.会员权益：</View>
            <View>1）借阅时限：</View>
            <View>
              各类型会员卡均有一定有效期，在有效期内借阅与书
              位权益同等书籍，随借随还不产生计费，如超出书位
              权益借阅按照1元/本/天；
            </View>
            <View>2）权益叠加：</View>
            <View>
              多张会员卡仅叠加有效期内的书位权益，会员卡有效 期不进行叠加延长；
            </View>
            <View>3）激活会员：</View>
            <View>
              购卡后可自行选择立即激活或不激活，有效期按照实
              际激活计算;如未激活会员卡，当用户借阅时则系统自
              动激活最早购买的会员卡；
            </View>
          </View>
          <View className='section'>
            <View>客服反馈：</View>
            <View>
              使用过程中出现问题或体验服务有异常请在微信小程
              序中点击【客服】图标进行反映您的问题。
            </View>
          </View>

          <View className='section'>
            <View>服务的范围和使用</View>
            <View>
              由共读科技“共享图书馆”和用户产生的权利和义务
              由共读科技负责，用户使用图书馆过程中由于各项条
              款引起的商业纠纷和造成的后果均由共读科技负全部
              责任，场地方概不承担任何责任。
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
