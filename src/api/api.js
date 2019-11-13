import Taro from '@tarojs/taro'
const serverUri = 'https://nepu.fun:8082'
const quest = (url, data) => {
    url = serverUri + url + '?openid=' + Taro.getStorageSync('openid')
    return new Promise((resolve, reject) => {
        let method;
        if (data) {
            method = 'POST'
        } else {
            method = 'GET'
        }
        Taro.request({
            url,
            data,
            method,
            header: {
                'content-type': 'application/json'
            },
            success: res => {
                if (res.data) resolve(res.data)
                else
                    console.log('网络错误')
                resolve({
                    err: true,
                    errMsg: '网络错误'
                })
            }
        })
    })
}

const auth = data => quest('/user/auth', data)
const getUserInfo = () => quest('/user/getUserInfo')
const insertTask = data => quest('/task/insertTask', data)
const selectTask = data => quest('/task/selectTask', data)
const selectTaskFromId = data => quest('/task/selectTaskFromId', data)
const updateTaskStatus = data => quest('/task/updateTaskStatus', data)
const searchBind = data => quest('/bind/searchBind', data)
const getBindInfo = data => quest('/bind/getBindInfo', data)
const createBind = data => quest('/bind/createBind', data)
const deleteBind = data => quest('/bind/deleteBind', data)
const resolveBind = data => quest('/bind/resolveBind', data)

export {
    auth,
    getUserInfo,
    insertTask,
    selectTask,
    selectTaskFromId,
    updateTaskStatus,
    searchBind,
    getBindInfo,
    createBind,
    deleteBind,
    resolveBind
}