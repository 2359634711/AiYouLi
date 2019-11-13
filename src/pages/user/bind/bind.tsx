import Taro, { Config } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import './bind.scss'
import { AtSearchBar, AtButton } from 'taro-ui'
import {
    searchBind,
    getBindInfo,
    createBind,
    deleteBind,
    resolveBind
} from '../../../api/api'
import { IUserInfo } from "../user";
export interface IBindCard {
    code: string,
    id: number,
    status: number,
    //0  createid存在 targetid不存在  
    //1 createid 存在 targetid存在  
    //-1 createid不存在(此项错误)
    create: number,//1自己的   0别人的
    targetInfo?: IUserInfo,
    createInfo?: IUserInfo,
    createid: string,
    targetid: string
}
interface IState {
    searchValue: string,
    btnArr: string[],
    bindCard?: IBindCard
}
export default class bind extends Taro.Component<any, IState>{
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            btnArr: ['搜索', '创建'],
            bindCard: undefined
        }
    }
    config: Config = {
        navigationBarTitleText: '绑定',
        navigationBarBackgroundColor: '#ffa631',
        navigationBarTextStyle: 'white'
    }
    getBindInfo() {
        getBindInfo().then(res => {
            let state = { ...this.state };
            if (res.err) {
                this.setState(Object.assign(state, {
                    bindCard: null
                }))
            } else {
                let status;
                if (res.data.targetid && res.data.createid) status = 1;
                if (!res.data.targetid && res.data.createid) status = 0;
                if (res.data.targetid && !res.data.createid) status = -1;
                this.setState(Object.assign(state, {
                    bindCard: {
                        ...res.data,
                        status
                    }
                }))
            }
        })

    }
    componentDidMount() {
        this.getBindInfo();
    }
    bindChange(e) {
        this.setState({
            searchValue: e
        })
        this.searchBind(e)
    }
    searchBind(code) {
        searchBind({ code }).then(res => {
            let state = { ...this.state };
            if (res.err) {
                this.setState(Object.assign(state, {
                    bindCard: null
                }))
            } else {
                let status;
                if (res.data.targetid && res.data.createid) status = 1;
                if (!res.data.targetid && res.data.createid) status = 0;
                if (res.data.targetid && !res.data.createid) status = -1;

                this.setState(Object.assign(state, {
                    bindCard: { ...res.data, status, create: 0 }
                }))
            }
        })
    }
    createBind() {
        let code = this.state.searchValue;
        let reg = /^\d{6}$/
        if (!reg.test(code)) {
            Taro.showToast({
                title: '请输入6位数字的卡片号码',
                icon: 'none',
                duration: 2000
            })
            return
        }

        createBind({
            createid: Taro.getStorageSync('openid'),
            code: this.state.searchValue
        }).then(res => {
            console.log(res)
            if (!res.err)
                this.componentDidMount();
            else {
                this.searchBind(this.state.searchValue)
            }
        })
    }
    deleteBind() {
        let { bindCard } = this.state;
        if (bindCard)
            deleteBind({ id: bindCard.id }).then(res => {
                if (!res.err) {
                    Taro.showToast({
                        title: '删除成功',
                        icon: 'success',
                        duration: 200
                    })
                    this.componentDidMount();
                } else {
                    Taro.showToast({
                        title: '删除卡片错误',
                        icon: 'none',
                        duration: 200
                    })
                }
            })
        else
            Taro.showToast({
                title: '卡片不存在',
                icon: 'none',
                duration: 2000
            })
    }
    resolveBind() {
        let { bindCard } = this.state;
        if (!bindCard) {
            Taro.showToast({
                title: '卡片不存在',
                icon: 'none',
                duration: 2000
            })
            return
        }
        resolveBind(
            {
                createid: bindCard.createid,
                targetid: Taro.getStorageSync('openid')
            }
        ).then(res => {
            this.componentDidMount()
        })
    }
    quitBind() {
        let { bindCard } = this.state;
        if (!bindCard) {
            Taro.showToast({
                title: '卡片不存在',
                icon: 'none',
                duration: 2000
            })
            return
        }
        resolveBind(
            {
                createid: bindCard.createid,
                targetid: null
            }
        ).then(res => {
            this.componentDidMount()
        })
    }
    render() {
        let { searchValue, bindCard } = this.state;
        if (bindCard)
            var { createInfo, targetInfo, createid, targetid, code, create, status } = bindCard;
        return (
            <View>
                <View className='backBox'>
                    <View className='searchTitleBox'>
                        <View className='searchTitle'>
                            绑定邀请
                        </View>
                        <View className='searchInfo'>
                            与TA填写相同的数字码来进行号码的绑定
                        </View>
                    </View>

                </View>


                <View className='searchBox'>
                    {((create == 0 && status == 0) || !bindCard) && <AtSearchBar
                        actionName='搜索/添加'
                        placeholder='搜索或添加一个绑定邀请'
                        value={searchValue}
                        onChange={this.bindChange.bind(this)}
                        onActionClick={this.createBind.bind(this)}
                    />}
                    {bindCard &&
                        <View className='userBox'>
                            <View className='codeNum'>
                                编号：{code}
                            </View>
                            <View className='userList'>

                                <View className='userItem'>
                                    <Image src={createInfo ? createInfo.avatarUrl : ''} className='userImg'></Image>
                                    <View className='userName'>{createInfo ? createInfo.nickName : '无'}</View>
                                </View>
                                <View className='userItem'>
                                    <Image src={targetInfo ? targetInfo.avatarUrl : ''} className='userImg'></Image>
                                    <View className='userName'>{targetInfo ? targetInfo.nickName : '无'}</View>
                                </View>
                            </View>


                            {create == 1 && <View className='btnBox'>
                                {status == 1 && <AtButton type='primary'>绑定</AtButton>}
                                <AtButton type='secondary' onClick={this.deleteBind.bind(this)}>删除卡片</AtButton>
                            </View>}
                            {create == 0 && <View className='btnBox'>
                                {status != 1 && <AtButton type='primary' onClick={this.resolveBind.bind(this)}>请求绑定</AtButton>}
                                {status == 1 && <AtButton type='secondary' onClick={this.quitBind.bind(this)}>退出卡片</AtButton>}
                            </View>}

                        </View>
                    }
                </View>
            </View>
        )
    }
}
