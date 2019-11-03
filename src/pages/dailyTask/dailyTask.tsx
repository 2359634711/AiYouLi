import Taro, { Config } from '@tarojs/taro'

import './dailyTask.scss'
import { View } from '@tarojs/components';
export default class DailyTask extends Taro.Component {
    config:Config={
        navigationBarTitleText: ''
    }
    render() {
        return (
            <View>Im DailyTask</View>
        )
    }
}