import Taro, { Config } from '@tarojs/taro';
import { View } from '@tarojs/components';

export default class pointMall extends Taro.Component {
    config: Config = {
        navigationBarTitleText: '积分兑换'
    }
    render() {
        return (
            <View>Im pointMall</View>
        )
    }
}
