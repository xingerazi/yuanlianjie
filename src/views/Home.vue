<template>
  <el-row>
    <el-col :span="8" style="padding-right: 20px">
      <el-card class="box-card">
        <div class="user-card">
          <div v-if="shwoimg">
            <img src="../assets/logo.png" alt="" />
          </div>
          <div v-if="!shwoimg">
            <img src="../assets/logo.png" alt="" />
          </div>
          <div class="user-name">
            <p class="name">{{ userdata.name }} Admin</p>
            <p class="iden">{{ userdata.iden }} admin</p>
          </div>
        </div>
        <div class="user-info">
          <p>关注人数<span></span>{{ userdata.itto }} 23 人</p>
          <p>粉丝人数<span></span>{{ userdata.toit }} 17 人</p>
        </div>
      </el-card>
      <template>
        <el-card style="margin-top: 25px; height: 500px">
          <el-table :data="dealData" style="width: 100%">
            <el-table-column
              v-for="(val, key) in tableLabel"
              :key="key"
              :prop="key"
              :label="val"
            >
            </el-table-column>
            <!-- <el-table-column prop="attributes" label="属性"> </el-table-column>
            <el-table-column prop="price" label="价格"> </el-table-column>
            <el-table-column prop="priceDifference" label="差价">
            </el-table-column> -->
          </el-table>
        </el-card>
      </template>
    </el-col>
    <el-col :span="16">
      <div class="num">
        <el-card class="trade" style="height: 230px">
          <span style="text-align: center">我的备忘录</span>
          <template>
            <div style="margin-top: 10px">
              <el-input
                v-model="newMemo"
                placeholder="请输入备忘录内容"
                style="width: 200px; margin-right: 20px"
              ></el-input>
              <el-button @click.native="addMemo">添加</el-button>
              <el-table :data="memoList" style="width: 100%">
                <el-table-column
                  label="备忘录内容"
                  prop="content"
                ></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button @click.native="deleteMemo(scope.$index)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
        </el-card>
        <el-card class="update">
          <template>
            <div class="block">
              <p class="demonstration">商品上新</p>
              <el-carousel
                trigger="click"
                height="150px"
                style="margin-top: 30px"
              >
                <el-carousel-item v-for="index in 3" :key="index">
                  <img
                    :src="require(`@/assets/digital${index}.jpg`)"
                    alt=""
                    style="
                      display: block;
                      margin: 0 auto;
                      width: 100%;
                      height: 100%;
                    "
                  />
                </el-carousel-item>
              </el-carousel>
            </div>
          </template>
        </el-card>
        <el-card class="message">
          <span>收件箱</span>
          <div class="message-box">
            <el-badge :value="2" class="item">
              <el-button size="small">用户消息</el-button>
            </el-badge>
            <el-badge :value="2" class="item">
              <el-button size="small">交易消息</el-button>
            </el-badge>
            <el-badge :value="11" class="item" type="primary">
              <el-button size="small">系统消息</el-button>
            </el-badge>
          </div>
        </el-card>
      </div>
      <el-card
        style="height: 250px; margin: 20px 50px 10px 50px"
        class="wallet"
      >
        <el-card
          shadow="hover"
          style="width: 100%; margin-bottom: 20px"
          :body-style="{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }"
        >
          <div style="width: 120px">
            <div style="font-size: 18px; text-align: center">链路蔚蓝信风起</div>
            <div style="font-size: 18px; text-align: center">
</div>
          </div>
          <el-statistic
            ref="statistic"
            @finish="hilarity"
            format="HH:mm:ss"
            :value="deadline4"
            title=""
            time-indices
          >
          </el-statistic>
          <div style="width: 120px">
            <div style="font-size: 18px; text-align: center"></div>
            <div style="font-size: 18px; text-align: center">创变去中步未遗</div>
          </div>
        </el-card>
        <el-card
          shadow="hover"
          :body-style="{ display: 'flex', justifyContent: 'space-around' }"
        >
          <div>
            <el-statistic
              group-separator=","
              :precision="2"
              :value='moeny'
              :title="title1"
            >
            </el-statistic>
          </div>
          <el-button
            type="text"
            @click="openRechargeDialog"
            style="color: rgb(166, 166, 166); font-size: large"
            >钱包充值</el-button
          >
          <el-dialog
            title="钱包余额充值"
            :visible.sync="recharge"
            width="30%"
            center
          >
            <div
              v-if="!rechargeSuccess"
              style="margin-left: 80px; font-size: large; font-style: italic"
            >
              <span>
                <p>请注意，充值完成后无法退回！！</p>
                <p>充值完毕后，将会直接进入您的账户</p>
              </span>
            </div>
            <div v-else>
              <el-result
                icon="success"
                title="充值成功"
                subTitle="请您返回主界面"
              >
              </el-result>
            </div>
            <img
              v-if="!rechargeSuccess"
              src="../assets/mbox.jpg"
              alt=""
              style="
                width: 200px;
                height: 200px;
                margin-left: 120px;
                margin-top: 20px;
              "
            />
          </el-dialog>
          <div>
            <el-statistic
              group-separator=","
              :precision="2"
              :value="value2"
              :title="title2"
            ></el-statistic>
          </div>
        </el-card>
      </el-card>
      <div class="graph">
        <el-card>
          <p>平台保护的数字资产</p>
          <div ref="lineChart" style="height: 200px; width: 300px"></div>
        </el-card>
        <el-card>
          <p>网络攻击占比</p>
          <div ref="pieChart" style="height: 200px; width: 300px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from "vuex";
import { visual, http } from "../utils/request";
import * as echarts from "echarts";
export default {
  name: "Home",
  data() {
    return {
      dealData: [],
      tableLabel: {
        propertyName: "数字产品",
        buyerNickname: "持有人",
        dealPrice: "成交价格",
      },
      dealData:[
      {
    propertyName: "Mona Lisa",
    buyerNickname: "John",
    dealPrice: "$500"
  },
  {
    propertyName: "The Starry Night",
    buyerNickname: "Jane",
    dealPrice: "$700"
  },
  {
    propertyName: "The Scream",
    buyerNickname: "Mike",
    dealPrice: "$900"
  },
  {
    propertyName: "Guernica",
    buyerNickname: "Emily",
    dealPrice: "$1200"
  },
  {
    propertyName: "Girl with a Pearl Earring",
    buyerNickname: "David",
    dealPrice: "$1500"
  },
  {
    propertyName: "The Persistence of Memory",
    buyerNickname: "Sophia",
    dealPrice: "$1800"
  },
  {
    propertyName: "The Birth of Venus",
    buyerNickname: "Oliver",
    dealPrice: "$2000"
  },
  {
    propertyName: "American Gothic",
    buyerNickname: "Ava",
    dealPrice: "$2300"
  },
  {
    propertyName: "The Last Supper",
    buyerNickname: "Daniel",
    dealPrice: "$2600"
  },
  {
    propertyName: "Les Demoiselles d'Avignon",
    buyerNickname: "Mia",
    dealPrice: "$2900"
  }
      ],
      deadline4: Date.now() + (new Date().setHours(23, 59, 59) - Date.now()),
      value2: 2222,
      title1: "钱包余额",
      title2: "收支盈亏",
      moeny:  Math.floor(Math.random() * 10000), // 生成 0 到 9999 之间的随机整数
      //备忘录
      memoList: [], // 备忘录列表
      newMemo: "", // 新备忘录内容
      //充值相关
      recharge: false, //充值界面
      recharge: false,
      rechargeSuccess: false,
      //图表设置
      lineChartData: [
        { month: "3月", asset1: 418, asset2: 524, asset3: 316 },
        { month: "4月", asset1: 250, asset2: 315, asset3: 418 },
        { month: "5月", asset1: 123, asset2: 400, asset3: 329 },
        { month: "6月", asset1: 340, asset2: 170, asset3: 670 },
      ],

      // 饼状图数据
      pieChartData: [
        { name: "Malware", value: 200 },
        { name: "DDoS", value: 300 },
        { name: "DoS", value: 400 },
      ],
    };
  },
  mounted() {
    this.getDeal();
    // 初始化折线图实例
    const lineChart = echarts.init(this.$refs.lineChart);

    // 设置折线图配置项
    const lineChartOptions = {
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["加密货币", "代币", "数字商品"],
      },
      xAxis: {
        type: "category",
        data: this.lineChartData.map((item) => item.month),
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "加密货币",
          type: "line",
          data: this.lineChartData.map((item) => item.asset1),
        },
        {
          name: "代币",
          type: "line",
          data: this.lineChartData.map((item) => item.asset2),
        },
        {
          name: "数字商品",
          type: "line",
          data: this.lineChartData.map((item) => item.asset3),
        },
      ],
    };

    // 渲染折线图
    lineChart.setOption(lineChartOptions);

    // 初始化饼状图实例
    const pieChart = echarts.init(this.$refs.pieChart);

    // 设置饼状图配置项
    const pieChartOptions = {
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          type: "pie",
          data: this.pieChartData,
        },
      ],
    };

    // 渲染饼状图
    pieChart.setOption(pieChartOptions);
  },
  computed: {
    ...mapState({
      userdata: (state) => state.tab.userdata,
    }),
    shwoimg(){
      return this.userdata.iden!='admin'
    }
  },
  methods: {
    //提示板相关
    hilarity() {
      this.$notify({
        title: "提示",
        message: "时间已到，你可知寸金难买寸光阴？",
        duration: 0,
      });
    },
    addMemo() {
      if (!this.newMemo) {
        return;
      }
      this.memoList.push({ content: this.newMemo });
      this.newMemo = "";
    },
    deleteMemo(index) {
      this.memoList.splice(index, 1);
    },
    openRechargeDialog() {
      this.recharge = true;
      setTimeout(() => {
        this.rechargeSuccess = true;
        console.log(11111);
      }, 5000);
    },
    //获得交易相关数据
    getDeal() {
      const _this = this;
      http
        .get("/deal/requery")
        .then((response) => {
          _this.dealData = response.data.data;
          console.log(_this.dealData, "交易信息");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  // computed:{
  //     ...mapState({
  //             user:state=>state.tab.userList
  //         })
  // }
};
</script>

<style lang="less" scoped>
.user-card {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #999999;

  display: flex;
  align-items: center;

  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  .user-name {
    .name {
      font-style: 32px;
      margin-bottom: 10px;
    }

    .iden {
      color: #999999;
    }
  }
}

.user-info {
  line-height: 30px;
  font-style: 15px;
  color: #999999;

  span {
    color: #666666;
    margin-left: 60px;
  }
}

.num {
  display: flex;
  margin: 0 50px;
  justify-content: space-between;

  .update {
    width: 40%;
  }

  .demonstration {
    margin-bottom: 10px;
  }

  .message {
    .message-box {
      margin-right: 10px;
      display: flex;
      flex-direction: column;

      .item {
        margin-top: 20px;
        margin-right: 10px;
      }
    }
  }
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.graph {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px;

  .el-card {
    height: 300px;
    width: 45%;
    div{
      margin-top: 20px;
      margin-left: 20px;
    }
  }
}
</style>