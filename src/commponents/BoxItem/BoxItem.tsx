import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import './BoxItem.scss'
interface IBoxItem {
    title?: string,
    func?: Function,
    colorS?: string,
    colorE?: string
}
export default class BoxItem extends Taro.Component<IBoxItem, any> {


    render() {
        let { colorS, colorE } = this.props;

        let style = '--backColor:#' + colorS + ';--backColor1:#' + colorE + ';'
        return (
            <View style={style}>
                <View className='BoxItem'>
                    {this.props.children}
                </View>
            </View>
        )
    }
}