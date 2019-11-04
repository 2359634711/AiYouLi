import Taro from '@tarojs/taro'
const serverUri = 'http://39.106.49.94:3003'
const quest = (url, data) => {
    url = serverUri + url
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
                if (res.data) resolve(res)
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

export {
    auth
}