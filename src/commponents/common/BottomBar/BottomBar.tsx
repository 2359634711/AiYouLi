

import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components';
import './BottomBar.scss'
export interface IBottomBar {
    selectedIndex: number
}
export default class BottomBar extends Taro.Component<IBottomBar, any> {
    render() {
        let { selectedIndex } = this.props;
        return (
            <View className='bottomBar'>
                <View onClick={() => {
                    Taro.redirectTo({
                        url: '/pages/index/index'
                    })
                }} className='item'>
                    <Image
                        src={'/icon/home' + (selectedIndex == 0 ? '_active' : '') + '.png'}
                        className='iconBtn'
                    />
                    <View className={selectedIndex == 0 ? 'activeTitle' : ''}>首页</View>
                </View>
                <View onClick={() => {
                    Taro.navigateTo({
                        url: '/pages/addTask/addTask'
                    })
                }} className='item'>
                    <Image
                        src={'/icon/add.png'}
                        className='add'
                    />

                </View>
                <View onClick={() => {
                    Taro.redirectTo({
                        url: '/pages/user/user'
                    })
                }} className='item'>
                    <Image
                        src={'/icon/user' + (selectedIndex == 2 ? '_active' : '') + '.png'}
                        className='iconBtn'
                    />
                    <View className={selectedIndex == 2 ? 'activeTitle' : ''}>我的</View>
                </View>
            </View>
        )
    }
}
