import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import BoxItem from '../../commponents/BoxItem/BoxItem';
import BottomBar from '../../commponents/common/BottomBar/BottomBar'

interface IState {

}
export default class Index extends Component<any, IState> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='index'>
        <View className='mainBox'>
          <Image mode='aspectFill' src='/icon/bg.png' className='bgImg' />
          <View className='scoreBox'>
            <Text className='score'>195</Text>
            <Text className='scoreTitle'>分</Text>
          </View>
          <View className='checkInBtn'>签到</View>
        </View>


        <View className='progressBox'>
          <View className='progressTitleBox'>
            <View className='left'>
              35%
            </View>
            <View className='right'>
              65%
            </View>
          </View>
          <View className='progressBarBox'>

            <View className='barBack'>
              <View className='barG' style={{ width: '35%' }}>

              </View>
              <View className='barBlock'>
                Vs
              </View>
              <View className='barB'>

              </View>
            </View>
          </View>
        </View>



        <View className='BtnList'>

          {/* <View onClick={() => {
            console.log('asd')
            Taro.navigateTo({
              url: '/pages/dailyTask/dailyTask'
            })
          }}>
            <BoxItem colorS='ffa631' colorE='ffc477'>每日任务</BoxItem>
          </View> */}
          {/* <BoxItem colorS='ffa631' colorE='ffc477'>愿望清单</BoxItem> */}
          <View onClick={() => {
            console.log('asd')
            Taro.navigateTo({
              url: '/pages/inProgessTask/inProgessTask'
            })
          }}>
            <BoxItem colorS='ffa631' colorE='ffc477'>任务列表</BoxItem>
          </View>
          <View onClick={() => {
            Taro.navigateTo({
              url: '/pages/pointMall/pointMall'
            })
          }}>
            <BoxItem colorS='ffa631' colorE='ffc477'>积分兑换</BoxItem>
          </View>
        </View>

        <BottomBar selectedIndex={0} />
      </View>
    )
  }
}
