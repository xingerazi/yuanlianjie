import {visual,http} from '../utils/request'

// 请求首页数据
export const getData = () => {
    // 返回一个promise对象
    return http.get('/home/getData')
}
//商城商品数据

export const getGoodsData = () => {
    // 返回一个promise对象
    return visual.get('/mall/getGoodsData')
}


export const getMenu = (data) => {
    return visual.post('/permission/getMenu', data)
}
