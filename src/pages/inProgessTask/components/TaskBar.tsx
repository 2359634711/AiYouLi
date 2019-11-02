import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import './TaskBar.scss'

export interface IProps {
    title: string,
    info: string,
    state: string,//-1失败 0未开始 1正在进行 2已提交 3已完成 
    price: string
}
export default class TaskBar extends Taro.Component<IProps, any> {
    render() {
        return (
            <View className=''>
                <View></View>
            </View>
        )
    }
}
