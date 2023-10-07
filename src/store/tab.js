import Cookie from "js-cookie"

export default {
    state: {
        tabsList: [
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            }
        ],//面包屑部分,
        menu: [],
        //用户账号数据
        //定义用户数据
        userdata:[],
    },
    mutations: {
        //更新数据
        selectMenu(state, val) {
            //判断添加的数据是否为首页
            if (val.name !== 'home') {
                const index = state.tabsList.findIndex(item => item.name === val.name)
                if (index === -1) {
                    if (state.tabsList.length >= 2) {
                        state.tabsList.pop()
                    }
                    state.tabsList.push(val)
                }
            }
            else if (state.tabsList.length >= 2) {
                state.tabsList.pop()
            }
        },
        setMenu(state, val) {
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
        },
        //动态注册路由
        addMenu(state, router) {
            //判断缓存中是否有数据
            if (Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }
                else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            })
            //路由的动态添加
            menuArray.forEach(item => {
                router.addRoute('Main', item)
            })
        },
        // 更新用户数据
        setUser(state, val) {
            state.userdata = val;
            console.log(state.userdata,'好好好');
        }

    }
}