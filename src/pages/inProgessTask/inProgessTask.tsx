import Taro, { Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import './inProgessTask.scss'
import { AtListItem, AtList } from "taro-ui";
import NavTitle, { INavTitle } from '../../commponents/common/NavTitle/Navtitle'

interface IState {
    navTitle: INavTitle
}

export default class inProgessTask extends Taro.Component<any, IState> {
    config: Config = {
        navigationBarTitleText: '任务列表'
    }
    constructor(props) {
        super(props);
        this.state = {
            navTitle: {
                titleList: [
                    '我发布的',
                    '我收到的'
                ],
                activeIndex: 0,
                onNavChange: (i) => {
                    this.setState({
                        navTitle: Object.assign({}, this.state.navTitle, {
                            activeIndex: i
                        })
                    })
                }
            }
        }
    }
    render() {
        let { navTitle } = this.state;
        return (
            <View className=''>
                <NavTitle
                    titleList={navTitle.titleList}
                    activeIndex={navTitle.activeIndex}
                    onNavChange={navTitle.onNavChange}
                />

                <AtList>
                    <AtListItem
                        title='买水果'
                        extraText='未接受'
                        note='100积分'
                        arrow='right'
                        thumb='/icon/request.png'
                    />
                    <AtListItem
                        title='捏腿'
                        extraText='进行中'
                        arrow='right'
                        note='200积分'
                        thumb='/icon/request.png'
                    />
                    <AtListItem
                        title='骑脖梗梗'
                        arrow='right'
                        extraText='完成申请中'
                        note='300积分'
                        thumb='/icon/request.png'
                    />
                    <AtListItem
                        title='买早餐'
                        extraText='已完成'
                        arrow='right'
                        note='300积分'
                        thumb='/icon/succ.png'
                    />
                    <AtListItem
                        title='取快递'
                        extraText='已拒绝'
                        arrow='right'
                        note='50积分'
                        thumb='/icon/fail.png'
                    />
                </AtList>
            </View>
        )
    }
}
