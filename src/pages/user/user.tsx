import Taro, { Config, getStorageSync } from "@tarojs/taro";
import { View, Button, Image } from "@tarojs/components";
import BottomBar from "../../commponents/common/BottomBar/BottomBar";
import './user.scss'
import { AtList, AtListItem } from "taro-ui";
import { auth } from '../../api/api'

interface IState {
    openid: string,
    avatarUrl: string,
    gender: string,
    nickName: string,
    price: string,
    targetid: string
}
export default class user extends Taro.Component<any, IState> {
    constructor(props) {
        super(props);
        this.state = {
            ...Taro.getStorageSync('userInfo')
        }
    }
    config: Config = {
        navigationBarTitleText: '用户中心'
    }
    bindUserInfo(event) {
        console.log(event)
        let { detail } = event;
        if (detail.errMsg != 'getUserInfo:ok') {
            console.log('拒绝授权')
        } else {
            console.log('授权成功')
            Taro.setStorageSync("userInfo", detail.userInfo)
            // Taro.setStorageSync("iv", detail.iv)
            // Taro.setStorageSync("signature", detail.signature)
            //登录
            this.login(detail.userInfo)
        }
    }
    componentDidMount() {
        let that = this;
        Taro.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    that.login()
                }
            }
        })
    }
    login(userInfo?) {
        Taro.login({
            success: res => {
                let code = res.code;
                if (code) {
                    auth({
                        code,
                        userInfo
                    }).then(res => {
                        console.log(res)
                        let { openid, avatarUrl, gender, nickName } = res.data.data
                        Taro.setStorageSync('openid', openid)
                        this.setState({
                            openid,
                            avatarUrl,
                            gender,
                            nickName
                        })
                    })
                } else {
                    console.log('登陆失败' + res.errMsg)
                }
            }
        })
    }
    render() {
        let { openid, avatarUrl, nickName, price, targetid } = this.state;
        openid = openid || Taro.getStorageSync('openid');

        return (
            <View>
                <View className='userBox'>
                    <View className='userBack'>
                    </View>
                    <View className='userInfo'>
                        <Image className='userImg' src={avatarUrl}></Image>
                        <View className='userName'>{nickName}</View>
                        {openid ?
                            <View className='userPrice'>积分：{price || 0.00}</View>
                            : <Button openType='getUserInfo' onGetUserInfo={this.bindUserInfo.bind(this)}>轻触登录</Button>
                        }

                    </View>
                </View>

                <View className='mainBox'>
                    <AtList>
                        <AtListItem
                            title='绑定对象'
                            extraText={targetid || '点击绑定'}
                            arrow='right'
                        />
                        <AtListItem
                            title='完成任务'
                            extraText='32个'
                        />
                        <AtListItem
                            title='进行中任务'
                            extraText='32个'
                        />
                        <AtListItem
                            title='已拒绝任务'
                            extraText='32个'
                        />
                        <AtListItem
                            title='积分记录'
                            extraText='32个'
                        />
                    </AtList>
                </View>
                <BottomBar selectedIndex={2} />
            </View>
        )
    }
}
