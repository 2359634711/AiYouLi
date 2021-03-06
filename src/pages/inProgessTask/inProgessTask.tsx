import Taro, { Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import './inProgessTask.scss'
import { AtListItem, AtList } from "taro-ui";
import NavTitle, { INavTitle } from '../../commponents/common/NavTitle/Navtitle'
import { ITask } from "../addTask/addTask";
import { selectTask } from '../../api/api'
interface IState {
    navTitle: INavTitle,
    taskList: ITask[],
    statusStr: any,
    thumbStr: any,
    page: number
}

export default class inProgessTask extends Taro.Component<any, IState> {
    config: Config = {
        navigationBarTitleText: '任务列表'
    }
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            navTitle: {
                titleList: [
                    '我发布的',
                    '我收到的'
                ],
                activeIndex: 0
            },
            taskList: [],
            statusStr: {
                '-1': '已拒绝',
                0: '未接受',
                1: '进行中',
                2: '完成申请中',
                3: '已完成',
                4: '不满意'
            },
            thumbStr: {
                '-1': '/icon/fail.png',
                0: '/icon/request.png',
                1: '/icon/request.png',
                2: '/icon/request.png',
                3: '/icon/succ.png',
                4: '/icon/fail.png'
            }
        }
    }

    bindNavChange(i) {
        this.setState({
            navTitle: Object.assign({}, this.state.navTitle, {
                activeIndex: i
            }),
            taskList: [],
            page: 0
        }, () => {
            this.getTaskList()
        })

    }
    // selectTask(type) {
    //     this.setState(Object.assign(
    //         this.state,
    //         {
    //         }
    //     ))
    //     this.getTaskList()
    // }
    onReachBottom() {
        this.getTaskList()
    }
    getTaskList() {
        selectTask({
            type: this.state.navTitle.activeIndex,
            page: this.state.page,
            openid: Taro.getStorageSync('openid')
        }).then(res => {
            console.log(res)
            this.setState(Object.assign(
                this.state,
                {
                    taskList: [...this.state.taskList, ...res.data],
                    page: this.state.page + 1
                }
            ))
        })
    }
    // componentDidMount() {
    //     this.getTaskList()
    // }
    componentDidShow() {
        this.bindNavChange(this.state.navTitle.activeIndex)
    }
    render() {
        let { navTitle, statusStr, taskList, thumbStr } = this.state;
        return (
            <View className=''>
                <NavTitle
                    titleList={navTitle.titleList}
                    activeIndex={navTitle.activeIndex}
                    onNavChange={this.bindNavChange.bind(this)}
                />
                <View className='mainBox'>
                    <AtList>
                        {taskList.map(val => {
                            let status = val.status || 0;
                            return (
                                <View className='taskItem' key={val.create_time}>
                                    <View className='taskTime'>{val.create_time && val.create_time.split('.')[0]}</View>
                                    <AtListItem onClick={() => {
                                        Taro.navigateTo({
                                            url: '/pages/taskDetail/taskDetail?taskId=' + val.id + '&type=' + navTitle.activeIndex
                                        })
                                    }}
                                        title={val.title}
                                        extraText={statusStr[status]}
                                        note={val.price + '积分'}
                                        arrow='right'
                                        thumb={thumbStr[status]}
                                    />
                                </View>
                            )
                        })}
                    </AtList>
                </View>
            </View>
        )
    }
}
