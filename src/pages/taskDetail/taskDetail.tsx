import Taro, { Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtCard, AtList, AtListItem } from "taro-ui";
import './taskDetail.scss'
import { selectTaskFromId, updateTaskStatus } from '../../api/api'
import { ITask } from "../addTask/addTask";

interface IState {
    taskInfo: ITask,
    statusStr: any
}
export default class taskDetail extends Taro.Component<any, IState> {
    config: Config = {
        navigationBarTitleText: '任务详情',
        navigationBarBackgroundColor: '#ffa631',
        navigationBarTextStyle: 'white'
    }
    constructor(props) {
        super(props);
        this.state = {
            taskInfo: {
                title: '',
                info: '',
                price: '',
                status: 0
            },
            statusStr: {
                '-1': '已拒绝',
                0: '未接受',
                1: '进行中',
                2: '完成申请中',
                3: '已完成',
                4: '不满意'
            },
        }
    }
    componentDidMount() {
        this.selectTaskFromId();
    }
    selectTaskFromId() {
        let { taskId } = this.$router.params;
        selectTaskFromId({ id: taskId }).then(res => {
            console.log(res)
            this.setState(Object.assign(
                this.state,
                {
                    taskInfo: {
                        ...res.data
                    }
                }
            ))
        })
    }
    updateTaskStatus(status) {
        Taro.showLoading()
        updateTaskStatus({
            id: this.state.taskInfo.id,
            status
        }).then(() => {
            this.selectTaskFromId()
            Taro.hideLoading()
        })
    }
    handleReject() {
        //取消任务 -1
        this.updateTaskStatus(-1)
    }
    handleResolve() {
        //接受任务 1
        this.updateTaskStatus(1)
    }
    handleApply() {
        //申请完成 2
        this.updateTaskStatus(2)
    }
    handleSatisfied() {
        //满意 3
        this.updateTaskStatus(3)
    }
    handleDissatisfied() {
        //不满意 4
        this.updateTaskStatus(4)
    }
    render() {
        let { title, info, price, status, create_time } = this.state.taskInfo;
        let { type } = this.$router.params;
        status = status || 0;
        let { statusStr } = this.state;
        let btnBar;
        switch (status) {
            case 0: {
                //未接受
                if (type == '1')
                    btnBar = (
                        <View className='btnBar'>
                            <View className='btnCancel' onClick={this.handleReject.bind(this)}>拒绝</View>
                            <View className='btnPrimery' onClick={this.handleResolve.bind(this)}>接受</View>
                        </View>
                    )
                break;
            }
            case 1: {
                //进行中
                if (type == '1')
                    btnBar = (
                        <View className='btnBar'>
                            <View className='btnCancel' onClick={this.handleReject.bind(this)}>终止任务</View>
                            <View className='btnPrimery' onClick={this.handleApply.bind(this)}>申请完成</View>
                        </View>
                    )
                break;
            }
            case 2: {
                //完成申请中
                if (type == '0')
                    btnBar = (
                        <View className='btnBar'>
                            <View className='btnCancel' onClick={this.handleDissatisfied.bind(this)}>不满意</View>
                            <View className='btnPrimery' onClick={this.handleSatisfied.bind(this)}>满意</View>
                        </View>
                    )
                break;
            }
            case 3: {
                //已完成
                btnBar = (
                    <View className='btnBar'>
                    </View>
                )
                break;
            }
            case -1: {
                //已拒绝
                break;
            }
            default: {
                break;
            }
        }
        return (
            <View>
                <View className='TitleBox'>
                    <View className='title'>{title}</View>
                    <View className='status'>{statusStr[status || 0]}</View>
                </View>
                <View className='mainBox'>
                    <View className='AtCardBox'>
                        <AtCard
                            extra={'+' + price + '积分'}
                            title={title}
                            note='任务尽快完成哟~不然小可爱要生气了！'
                        >
                            {info}
                        </AtCard>
                    </View>

                    <View className='AtListBox'>
                        <AtList>
                            <AtListItem
                                title='任务名称'
                                extraText={title}
                            />
                            <AtListItem
                                title='积分'
                                extraText={'+' + price + '积分'}
                            />
                            <AtListItem
                                title='状态'
                                extraText={statusStr[status || 0]}
                            />
                            <AtListItem
                                title='创建时间'
                                extraText={create_time}
                            />
                        </AtList>
                    </View>
                </View>


                {btnBar}
                {/* <View className='btnBar'>
                    <View className='btnCancel'>拒绝</View>
                    <View className='btnPrimery'>接受</View>
                </View> */}


            </View>
        )
    }
}
