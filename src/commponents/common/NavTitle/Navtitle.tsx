import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import './NavTitle.scss'

export interface INavTitle {
    titleList: string[],
    activeIndex: number,
    onNavChange?: Function
}
export default class Navtitle extends Taro.Component<INavTitle, any>{

    render() {
        let { titleList, activeIndex, onNavChange } = this.props;
        return (
            <View className='navTitle'>
                {titleList.map((val, i) => {
                    return <View onClick={() => {
                        console.log(i)
                        onNavChange ? onNavChange(i) : ''
                    }} key={val} className={(i == activeIndex ? 'activeItem' : '') + ' navItem'}>{val}</View>
                })}
            </View>
        )
    }
}
