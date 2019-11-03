import Taro, { Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import './inProgessTask.scss'
import { AtListItem, AtList } from "taro-ui";
import NavTitle, { INavTitle } from '../../commponents/common/NavTitle/Navtitle'
import { ITask } from "../addTask/addTask";

interface IState {
    navTitle: INavTitle,
    taskList: ITask[],
    statusStr: any,
    thumbStr: any
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
            },
            taskList: [{
                id: '0',
                title: '捏腿',
                info: 'asd',
                price: '100',
                status: 0
            }, {
                id: '0',
                title: '捏腿',
                info: 'asd',
                price: '100',
                status: -1
            }, {
                id: '0',
                title: '捏腿',
                info: 'asd',
                price: '100',
                status: 1
            }, {
                id: '0',
                title: '捏腿',
                info: 'asd',
                price: '100',
                status: 2
            }, {
                id: '0',
                title: '捏腿',
                info: 'asd',
                price: '100',
                status: 3
            }],
            statusStr: {
                '-1': '已拒绝',
                0: '未接受',
                1: '进行中',
                2: '完成申请中',
                3: '已完成'
            },
            thumbStr: {
                '-1': '/icon/fail.png',
                0: '/icon/request.png',
                1: '/icon/request.png',
                2: '/icon/request.png',
                3: '/icon/succ.png'
            }
        }
    }
    render() {
        let { navTitle, statusStr, taskList, thumbStr } = this.state;
        return (
            <View className=''>
                <NavTitle
                    titleList={navTitle.titleList}
                    activeIndex={navTitle.activeIndex}
                    onNavChange={navTitle.onNavChange}
                />
                <View className='mainBox'>
                    <AtList>
                        {taskList.map(val => {
                            let status = val.status || 0;
                            return <AtListItem onClick={() => {
                                Taro.navigateTo({
                                    url: '/pages/taskDetail/taskDetail?taskId=' + val.id
                                })
                            }}
                                title={val.title}
                                extraText={statusStr[status]}
                                note={val.price + '积分'}
                                arrow='right'
                                thumb={thumbStr[status]}
                            />
                        })}
                    </AtList>
                </View>
            </View>
        )
    }
}
