import Mock from 'mockjs'
import homeAPI from './mockServeData/home'
import mallAPI from './mockServeData/mall'
import userAPI from './mockServeData/user'
import permission from './mockServeData/permission'


//定义mock请求拦截
Mock.mock('/api/home/getData',  homeAPI.getStatisticalData)
//

//
Mock.mock('/api/mall/getGoodsData',  mallAPI.getAssetsList)

Mock.mock('/api/user/getGoodsData',  mallAPI.getAssetsList)

Mock.mock(/api\/permission\/getMenu/, 'post',permission.getMenu)