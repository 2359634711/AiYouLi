import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import BoxItem from '../../commponents/BoxItem/BoxItem';
import BottomBar from '../../commponents/common/BottomBar/BottomBar'
import { getUserInfo } from '../../api/api'
import { IUserInfo } from '../user/user';
interface IState {
  userInfo: IUserInfo,
  targetObj: IUserInfo
}
export default class Index extends Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        openid: '',
        avatarUrl: '',
        gender: '',
        nickName: '',
        price: 0,
        targetid: ''
      },
      targetObj: {
        openid: '',
        avatarUrl: '',
        gender: '',
        nickName: '',
        price: 0,
        targetid: ''
      }
    }
  }
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

  componentDidMount() {
    getUserInfo().then(res => {
      this.setState({
        ...res.data
      })
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    let { userInfo, targetObj } = this.state;
    if (!targetObj) targetObj = {
      openid: '',
      avatarUrl: '',
      gender: '',
      nickName: '',
      price: 1,
      targetid: ''
    }
    let userPercent = Math.floor((userInfo.price / (userInfo.price + targetObj.price)) * 100);
    let targetPercent = 100 - userPercent;
    return (
      <View className='index'>
        <View className='mainBox'>
          <Image mode='aspectFill' src='/icon/bg.png' className='bgImg' />
          <View className='scoreBox'>
            <Text className='score'>{userInfo.price}</Text>
            <Text className='scoreTitle'>分</Text>
          </View>
          <View className='checkInBtn'>签到</View>
        </View>


        <View className='progressBox'>
          <View className='progressTitleBox'>
            <View className='left'>
              <View className='userInfoBox'>
                <View className='userBox'>
                  <Image src={userInfo.avatarUrl} className='userImg' />
                  <View className='userPrecent'>{userInfo.openid ? (userPercent + '%') : '未登录'}</View>
                  {/* <View className='userName'>{userInfo.nickName}</View> */}
                  {/* <View className='userPrice'>{userInfo.price}</View> */}
                </View>
              </View>
            </View>
            <View className='right'>
              <View className='userBox'>
                <Image src={targetObj.avatarUrl} className='userImg' />
                <View className='userPrecent'>{targetObj.openid ? (targetPercent + '%') : '暂无'}</View>
                {/* <View className='userName'>{targetObj.nickName}</View> */}
                {/* <View className='userPrice'>{targetObj.price}</View> */}
              </View>
            </View>
          </View>
          <View className='progressBarBox'>

            <View className='barBack'>
              <View className='barG' style={{ width: (userPercent || 50) + '%' }}>

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
