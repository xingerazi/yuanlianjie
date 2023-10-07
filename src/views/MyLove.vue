<template>
  <el-row>
    <el-col :span="12"
      ><div style="margin-top: 20px">
        <el-card shadow="always">
          <el-descriptions title="个人信息" :column="2" border>
            <template slot="extra">
              <el-button
                type="primary"
                size="small"
                style="margin-right: 150px"
                @click="userInfoVisible = true"
                >操作</el-button
              >
            </template>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-picture-outline"></i>
                头像
              </template>
              <img
                v-if="showsexImage"
                src="../assets/man.png"
                alt=""
                style="height: 100px; width: 100px"
              />
              <img
                v-if="!showsexImage"
                src="../assets/woman.png"
                alt=""
                style="height: 100px; width: 100px"
              />
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user"></i>
                账号id
              </template>
              asdasd
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-s-custom"></i>
                昵称
              </template>
              数字收藏家
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-odometer"></i>
                年龄
              </template>
              19
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-male"></i>
                <i class="el-icon-female"></i>
                性别
              </template>
              <el-tag size="small" @click="changeGender">{{ gender }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-message"></i>
                邮箱Email
              </template>
              yuanlianjie@outlook.com
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-mobile-phone"></i>
                手机号码
              </template>
              14483182392
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-location-outline"></i>
                地区
              </template>
              {{ region }}
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
        <el-card>
          <div
            class="source-map-panel"
            id="chinaMap"
            ref="mapRef"
            style="margin-left: 5px; margin-top: -80px"
          ></div>
        </el-card>
      </div>
      <!-- <el-dialog
        title="修改个人信息"
        :visible.sync="userInfoVisible"
        width="60%"
        :before-close="handleClose"
      >
        <el-form :model="form" :rules="rules" ref="form" label-width="150px">
          <div class="updateinfo">
            <div class="left">
              <el-form-item label="头像" prop="avatar">
                <img style="width: 150px; height: 150px" src="" />
              </el-form-item>
              <el-form-item label="账号密码" prop="password">
                <el-input v-model="form.password"></el-input>
              </el-form-item>
            </div>
            <div class="right">
              <el-form-item label="用户编号" prop="id">
                <el-input v-model="form.id" disabled></el-input>
              </el-form-item>
              <el-form-item label="昵称" prop="nickname">
                <el-input v-model="form.nickname"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="mobilePhoneNumber">
                <el-input v-model="form.mobilePhoneNumber"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submit">提 交</el-button>
        </span>
      </el-dialog> -->
      <!-- 操作 -->
    </el-col>

    <!-- 聊天区域 -->
    <el-col :span="12"
      ><div>
        <el-container>
          <el-main>
            <el-collapse>
              <el-collapse-item title="系统消息">
                <el-button @click="checkInfo1" type="primary"
                  >系统消息</el-button
                >
              </el-collapse-item>
              <el-collapse-item title="交易消息">
                <el-button @click="checkInfo2" type="primary"
                  >交易消息</el-button
                >
              </el-collapse-item>
              <el-collapse-item title="朋友消息">
                <el-card class="friend-card">
                  <div
                    v-for="(friend, index) in friendList"
                    :key="index"
                    class="friend-item"
                    @click="checkInfo3(friend, index)"
                  >
                    <img :src="friend.avatar" alt="avatar" class="avatar" />
                    <p class="name">{{ friend.name }}</p>
                  </div>
                </el-card>
              </el-collapse-item>
            </el-collapse>
          </el-main>
          <el-drawer
            title="系统消息"
            :visible.sync="drawer1Visible"
            :with-header="false"
            :destroy-on-close="true"
          >
            <el-card>
              <h3>系统消息</h3>
              <div
                v-for="(info, index) in sysInfo"
                :key="index"
                style="margin-top: 30px"
              >
                系统消息{{ index + 1 }} :{{ info }}
              </div>
            </el-card>
          </el-drawer>
          <el-drawer
            title="交易消息"
            :visible.sync="drawer2Visible"
            :with-header="false"
            :destroy-on-close="true"
          >
            <el-card>
              <h3>交易消息</h3>
              <div
                v-for="(info, index) in mallInfo"
                :key="index"
                style="margin-top: 30px"
              >
                交易消息{{ index + 1 }} :{{ info }}
              </div>
            </el-card>
          </el-drawer>
          <el-drawer
            title="朋友信息"
            :visible.sync="drawer3Visible"
            :with-header="false"
            :destroy-on-close="true"
          >
            <div style="margin-top: 100px">
              <el-card>
                <div
                  class="friend-info"
                  style="display: flex; flex-direction: column"
                >
                  <div
                    style="width: 100px; line-height: 200%; text-align: center"
                  >
                    <img
                      :src="activeFriend.avatar"
                      alt=""
                      style="height: 60px; width: 60px; border-radius: 50%"
                    />
                    <span style="font-size: large">{{
                      activeFriend.name
                    }}</span>
                  </div>
                  <div
                    v-for="(msg, msgIndex) in activeFriend.message"
                    :key="msgIndex"
                    style="margin-top: 30px;,"
                    :class="msg.type === 'send' ? 'send' : 'receive'"
                  >
                    <span>
                      {{ msg.content }}
                    </span>
                  </div>
                </div>
              </el-card>
              <div style="margin-top: 30px">
                <el-card>
                  <el-input
                    v-model="sendMes"
                    placeholder="请输入内容"
                  ></el-input>
                  <el-button
                    type="primary"
                    style="margin: 20px 0 0 230px"
                    @click="sendIt"
                    >发送</el-button
                  >
                </el-card>
              </div>
            </div>
          </el-drawer>
        </el-container>
      </div></el-col
    >
  </el-row>
</template>

<script>
import * as echarts from "echarts";
import chinaJson from "@/utils/map.json";
export default {
  name: "FriendList",
  data() {
    return {
      region: "",
      series: [],
      scatterPos: [108.906866, 34.162109],
      chinaGeoCoordMap: {
        西安: [108.906866, 34.162109],
        柯桥区: [120.476075, 30.078038],
        拉萨: [91.140856, 29.645554],
        沈阳: [123.431474, 41.805698],
        新疆: [87.627704, 43.793026],
        台湾: [121.508903, 25.044319],
      },
      chinaDatas: [
        [
          {
            name: "柯桥区",
            value: 0,
          },
        ],
        [
          {
            name: "拉萨",
            value: 2,
          },
        ],
        [
          {
            name: "沈阳",
            value: 1,
          },
        ],
        [
          {
            name: "新疆",
            value: 1,
          },
        ],
        [
          {
            name: "台湾",
            value: 1,
          },
        ],
      ],
      myChart: "",
      //性别
      gender: "男",
      showsexImage: true,
      // 重置用户信息相关
      userInfoVisible: false,
      form: {
        avatar: "",
        password: "",
        nickname: "",
        mobilePhoneNumber: "",
        id: Number,
      },
      rules: {
        nickname: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "账号密码不能为空", trigger: "blur" },
        ],
      },
      //定义发送的消息
      sysInfo: ["恭喜你成功创建用户！", "欢迎来到ChainStamp"],
      mallInfo: ["恭喜你为数字藏品添加水印"],
      // 聊天信息相关
      friendList: [
        {
          name: "Lucas",
          avatar: "https://picsum.photos/50/50?random=1",
          message: [
            { content: "hello啊", type: "send" },
            { content: "hi啊", type: "receive" },
          ],
        },
        {
          name: "Emma",
          avatar: "https://picsum.photos/50/50?random=2",
          message: [
            { content: "你好", type: "send" },
            { content: "哈喽", type: "receive" },
          ],
        },
        {
          name: "Oliver",
          avatar: "https://picsum.photos/50/50?random=3",
          message: [
            { content: "在干嘛呢", type: "send" },
            { content: "无事可做", type: "receive" },
          ],
        },
        {
          name: "Ava",
          avatar: "https://picsum.photos/50/50?random=4",
          message: [
            { content: "最近过得怎么样", type: "send" },
            { content: "还好啦", type: "receive" },
          ],
        },
        {
          name: "William",
          avatar: "https://picsum.photos/50/50?random=5",
          message: [
            { content: "嗨", type: "send" },
            { content: "哈喽", type: "receive" },
          ],
        },
      ],
      sendMes: "",
      drawer1Visible: false,
      drawer2Visible: false,
      drawer3Visible: false,
      activeFriend: { name: "", avatar: "", message: "" },
      activeIndex: 0,
    };
  },
  mounted() {
    this.initMaps();
    // this.addClickEvent();
  },
  methods: {
    // 将数据转换为地图上需要的格式
    convertData(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = this.chinaGeoCoordMap[dataItem[0].name];
        var toCoord = this.scatterPos;
        if (fromCoord && toCoord) {
          res.push([
            {
              coord: fromCoord,
              value: dataItem[0].value,
            },
            {
              coord: toCoord,
            },
          ]);
        }
      }
      return res;
    },

    // 初始化地图
    initMaps() {
      this.myChart = echarts.init(this.$refs.mapRef); // 这里是为了获得容器所在位置
      echarts.registerMap("china", chinaJson); //注册可用的地图
      var options = {
        geo: {
          show: true,
          //设置中心点
          center: [105.194115019531, 35.582111640625],
          map: "china",
          roam: true, //是否允许缩放，拖拽
          zoom: 1, //初始化大小
          //缩放大小限制
          scaleLimit: {
            min: 0.1, //最小
            max: 12, //最大
          },
          //各个省份模块样式设置
          itemStyle: {
            normal: {
              areaColor: "#3352c7", //背景色
              color: "red", //字体颜色
              borderColor: "#5e84fd",
              borderWidth: 2,
            },
          },
          //高亮状态
          emphasis: {
            itemStyle: {
              areaColor: "#ffc601",
            },
            label: {
              show: true,
              color: "#fff",
            },
          },
          // 显示层级
          z: 10,
          clickable: true, // 添加点击事件
          regions: this.regions, // 指定需要添加点击事件的区域
        },
      };
      this.myChart.setOption(options);

      // 绑定地图区域点击事件
      this.myChart.on("click", (params) => {
        if (params.componentType === "geo") {
          this.region = params.name;
          // console.log(this.region);
        }
      });
    },
    checkInfo1() {
      this.drawer1Visible = true;
    },
    checkInfo2() {
      this.drawer2Visible = true;
    },
    checkInfo3(friend, index) {
      this.activeIndex = index;
      this.drawer3Visible = true;
      this.activeFriend = friend;
    },
    changeGender() {
      if (this.gender === "男") {
        this.gender = "女";
        this.showsexImage = false;
      } else {
        this.gender = "男";
        this.showsexImage = true;
      }
    },
    sendIt() {
      this.$set(
        this.friendList[this.activeIndex].message,
        this.friendList[this.activeIndex].message.length,
        { content: this.sendMes, type: "send" }
      );
      this.sendMes = "";
    },
  },
};
</script>

<style lang="less" scoped>
/* 个人信息 */
.updateinfo {
  /* width: 300px; */
  height: 300px;
  overflow: auto;
}
.left {
  /* width: 330px; */
  float: left;
}
.right {
  overflow: hidden;
}
/* 消息列表 */
.friend-card {
  padding: 10px;
  border: none;
}

.friend-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px;
  transition: background-color 0.3s ease;
}

.friend-item:hover {
  background-color: #f5f7f9;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 8px;
}

.name {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}

.active {
  background-color: #f5f7f9;
}
.friend-info {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 20px;
}

.name {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}
.send {
  color: blue;
  width: 100%;
  display: block;
  overflow: hidden;
  float: right;
  span {
    color: #333;
    background: #9eea6a;
    padding: 4px;
    border-radius: 4px;
    margin: 9px 40px;
    border: 1px solid #9eea6a;
    position: relative;
    display: block;
    float: right;
  }
}

.receive {
  width: 100%;
  color: rgb(50, 50, 50);
  span {
    background: #fff;
    padding: 7px;
    border-radius: 4px;
    float: left;
    margin: 0 40px;
    max-width: 50%;
    border: 1px solid #ededed;
    position: relative;
  }
}
.source-map-panel {
  width: 100%;
  height: 400px;
}
</style>
