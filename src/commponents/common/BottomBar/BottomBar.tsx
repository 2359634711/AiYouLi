

import Taro from '@tarojs/taro'
import { View } from '@tarojs/components';
import './BottomBar.scss'

export default class BottomBar extends Taro.Component {
    render() {
        return (
            <View className='bottomBar'>
                <View onClick={() => {
                    Taro.redirectTo({
                        url: '/pages/index/index'
                    })
                }} className='item'>首页</View>
                <View onClick={() => {
                    Taro.navigateTo({
                        url: '/pages/addTask/addTask'
                    })
                }} className='item'>添加</View>
                <View onClick={() => {
                    Taro.redirectTo({
                        url: '/pages/user/user'
                    })
                }} className='item'>我的</View>
            </View>
        )
    }
}
