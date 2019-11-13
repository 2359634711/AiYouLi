import { View } from "@tarojs/components";
import Taro, { Config } from "@tarojs/taro";
import { AtInput, AtButton, AtTextarea } from 'taro-ui';
import './addTask.scss'
import { insertTask } from '../../api/api'
export interface ITask {
    id?: string,
    title: string,
    info: string,
    type?: string,//?
    price: string,
    status?: number//状态 -1 0 1 2 3 
    createid?: string,
    targetid?: string,
    create_time?: string
}

interface IState {
    formData: ITask
}
export default class addTask extends Taro.Component<any, IState>{
    config: Config = {
        navigationBarTitleText: '添加任务'
    }
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                title: '',
                info: '',
                type: '',//?
                price: ''
            }
        }
    }
    onSubmit() {
        let { formData } = this.state;
        let createid = Taro.getStorageSync('openid')
        let targetid = Taro.getStorageSync('targetid')
        formData = {
            ...formData,
            createid,
            targetid
        }
        insertTask(formData).then(res => {
            console.log(res)
            Taro.navigateBack({
                delta: 1
            })
        })
    }
    handleTextareaChange(event) {
        let info = event.detail.value;
        let { formData } = this.state;
        let newFormData = Object.assign({}, formData, { info })
        this.setState({
            formData: newFormData
        })
    }
    handlePriceChange(value) {
        this.setState({
            formData: Object.assign({}, this.state.formData, { price: value })
        })
    }
    handleChange(value) {
        this.setState({
            formData: Object.assign({}, this.state.formData, { title: value })
        })
    }
    render() {
        return (
            <View>
                <View className='line'>
                    <AtInput
                        title='标题'
                        name='value'
                        placeholder='请输入任务标题'
                        value={this.state.formData.title}
                        onChange={this.handleChange.bind(this)}
                    />
                </View>
                <View className='line'>
                    <AtInput
                        title='积分'
                        name='value'
                        placeholder='请输入任务积分'
                        value={this.state.formData.price}
                        onChange={this.handlePriceChange.bind(this)}
                    />
                </View>
                <View className='line'>
                    <AtTextarea
                        placeholder='请输入任务具体描述'
                        value={this.state.formData.info}
                        onChange={this.handleTextareaChange.bind(this)}
                    />
                </View>
                <View className='line'>
                    <AtButton onClick={this.onSubmit.bind(this)}>
                        添加
                    </AtButton>
                </View>
            </View>
        )
    }
}
