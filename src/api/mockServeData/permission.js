import Mock from 'mockjs' 

export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'admin' && password === 'admin') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: "/home",
              name: "home",
              label: "首页",
              icon: "s-home",
              url: "Home/Home",
            },
            {
              path: "/mall",
              name: "mall",
              label: "资产处理",
              icon: "goods",
              url: "MallManage/MallManage",
            },
            {
              path: "/user",
              name: "user",
              label: "资产管理",
              icon: "user",
              url: "UserManage/UserManage",
            },
            {
              path: "/info",
              name: "info",
              label: "相关信息",
              icon: "s-data",
              url: "Info",
            },

          ],
          token: Mock.Random.guid(),
          message: '获取成功',
          userdata:{
            name:'admin',iden:'admin',toit:'165',itto:'1',moeny:'85332'
          }
        }
      }
    } else if (username === 'xiaoxiao' && password === 'xiaoxiao') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'Home.vue'
            },
            // {
            //   path: "/mall",
            //   name: "mall",
            //   label: "商品交易",
            //   icon: "goods",
            //   url: "MallManage/MallManage",
            // },
            {
              label: "关于我的",
              icon: "user-solid",
              children: [
                {
                  path: "/own",
                  name: "own",
                  label: "我的资产",
                  icon: "crop",
                  url: "MyOwn/PageOne",
                },
                {
                  path: "/love",
                  name: "love",
                  label: "我的信息",
                  icon: "view",
                  url: "MyLove/PageTwo",
                },
              ],
            },
          ],
          token: Mock.Random.guid(),
          message: '获取成功',
          userdata:{
            name:'晓晓',iden:'用户',toit:'10',itto:'31',moeny:'3766'
          }
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }

  }
}