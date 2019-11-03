import Taro, { Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtCard, AtList, AtListItem } from "taro-ui";
import './taskDetail.scss'

export default class taskDetail extends Taro.Component {
    config: Config = {
        navigationBarTitleText: '任务详情',
        navigationBarBackgroundColor: '#ffa631',
        navigationBarTextStyle: 'white'
    }
    render() {
        return (
            <View>
                <View className='TitleBox'>
                    <View className='title'>捏脚</View>
                    <View className='status'>进行中</View>
                </View>
                <View className='mainBox'>
                    <View className='AtCardBox'>
                    <AtCard
                        extra='+100积分'
                        title='买水果'
                        note='任务尽快完成哟~不然小可爱要生气了！'
                    >
                        去佳拾买水果,去佳拾买水果去佳拾买水果去佳拾买水果,去佳拾买水果,去佳拾买水果去佳拾买水果去佳拾买水果.去佳拾买水果,去佳拾买水果,去佳拾买水果
                        去佳拾买水果去佳拾买水果.去佳拾买水果,去佳拾买水果。
                    </AtCard>
                    </View>

                    <View className='AtListBox'>
                        <AtList>
                            <AtListItem
                                title='任务名称'
                                extraText='买水果'
                            />
                            <AtListItem
                                title='积分'
                                extraText='+1000积分'
                            />
                            <AtListItem
                                title='状态'
                                extraText='进行中'
                            />
                        </AtList>
                    </View>
                </View>



                <View className='btnBar'>
                    <View className='btnCancel'>
                        拒绝
                    </View>
                    <View className='btnPrimery'>
                        提交完成
                    </View>
                </View>
            </View>
        )
    }
}
