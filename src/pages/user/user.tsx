import Taro, { Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import BottomBar from "../../commponents/common/BottomBar/BottomBar";

export default class user extends Taro.Component {
    config: Config = {
        navigationBarTitleText: '用户中心'
    }
    render() {
        return (
            <View>
                <View className='userBox'>

                </View>
                <BottomBar selectedIndex={2} />
            </View>
        )
    }
}
