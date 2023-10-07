<template>
  <div>
    <el-row class="row-bg">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>我拥有的资产</span>
        </div>
        <div style="display: flex; justify-content: space-around">
          <el-card
            class="goods"
            v-for="(item, index) in goodsList"
            :key="index"
            style="width: 200px"
          >
            <img :src="item.image" alt="" />
            <p style="text-align: center">{{ item.name }}</p>
            <div style="margin-left: 20px">
              <el-button type="text" @click="showDialog(item)">详情</el-button>
              <el-button type="info" size="mini" @click="qvxiaohave(item)"
                >添加水印</el-button
              >
            </div>
          </el-card>
        </div>
      </el-card>
      <el-row>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>已添加水印的受保护资产</span>
            </div>
            <div style="display: flex; justify-content: space-around">
              <el-card
                class="goods"
                v-for="(item, index) in leftGoods"
                :key="index"
                style="width: 200px"
              >
                <img :src="item.image" alt="" />
                <p style="text-align: center">{{ item.name }}</p>
                <div style="margin-left: 20px">
                  <el-button type="text" @click="showDialog(item)"
                    >详情</el-button
                  >
                  <el-button type="info" size="mini" @click="qvxiaolike(item)"
                    >取消水印</el-button
                  >
                </div>
              </el-card>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>正在加强防护的资产</span>
            </div>
            <div style="display: flex; justify-content: space-around">
              <el-card
                class="goods"
                v-for="(item, index) in rightGoods"
                :key="index"
                style="width: 200px"
              >
                <img :src="item.image" alt="" />
                <p style="text-align: center">{{ item.name }}</p>
                <div style="margin-left: 20px">
                  <el-button type="text" @click="showDialog(item)"
                    >详情</el-button
                  >
                  <el-button type="info" size="mini" @click="qvxiaorent(item)"
                    >取消防护</el-button
                  >
                </div>
              </el-card>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" width="700px">
      <div
        class="product-details"
        style="display: flex; justify-content: space-around"
      >
        <el-card class="left" shadow="hover">
          <img
            :src="detaildata.image"
            alt="product image"
            width="200"
            height="200"
          />
          <el-divider></el-divider>
          <el-descriptions
            class="margin-top"
            :column="1"
            title="基本简介"
            border
          >
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-connection"></i>
                产品名
              </template>
              {{ detaildata.name }}
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
        <el-card
          class="right-bottom"
          :body-style="{ marginTop: '20px' }"
          shadow="hover"
        >
          <el-descriptions
            class="margin-top"
            title="相关信息"
            :column="1"
            border
          >
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user"></i>
                发行商
              </template>
              {{ detaildata.issuer }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-mobile-phone"></i>
                发行日期
              </template>
              {{ detaildata.issuanceDate }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-help"></i>
                基本简介
              </template>
              {{ detaildata.introduction }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-coin"></i>
                水印序列号
              </template>
              {{ detaildata.price }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-service"></i>
                likes
              </template>
              <el-tag size="small">{{ detaildata.likes }}</el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "own",
  data() {
    return {
      detaildata: {},
      dialogVisible: false,
      goodsList: [
        {
          name: "panda88",
          image: require("../assets/buy-im/88.png"),
          introduction: "数字*熊猫88",
          remaining: "43",
          issuer: "isPanda",
          price: "26534353",
          issuanceDate: "2023.3.1",
          likes: "432",
        },
        {
          name: "panda67",
          image: require("../assets/buy-im/67.png"),
          introduction: "数字*熊猫67",
          remaining: "432",
          issuer: "parda isPanda cigu",
          price: "342342464",
          issuanceDate: "2023.3.1",
          likes: "251",
        },
        {
          name: "panda75",
          image: require("../assets/buy-im/75.png"),
          introduction: "数字*熊猫75",
          remaining: "763",
          issuer: "isPanda lousion",
          price: "8535331",
          issuanceDate: "2023.3.1",
          likes: "523",
        },
        {
          name: "panda5",
          image: require("../assets/images/4/4.png"),
          introduction: "数字*熊猫05",
          remaining: "345",
          issuer: "isPanda pandie",
          price: "9164921",
          z_price: "112",
          issuanceDate: "2023.3.1",
          likes: "766",
        },
      ],
      leftGoods: [
        {
          name: "panda75",
          image: require("../assets/buy-im/75.png"),
          introduction: "数字*熊猫01",
          remaining: "295",
          issuer: "isPanda",
          price: "14253452",
          issuanceDate: "2023.3.1",
          likes: "431",
        },
        {
          name: "panda67",
          image: require("../assets/buy-im/67.png"),
          introduction: "数字*熊猫873",
          remaining: "253",
          issuer: "isPanda",
          price: "25398779",
          issuanceDate: "2023.3.1",
          likes: "523",
        },
      ],
      rightGoods: [
        {
          name: "panda97",
          image: require("../assets/buy-im/97.png"),
          introduction: "数字*熊猫97",
          remaining: "24",
          issuer: "isPanda",
          price: "425584876",
          issuanceDate: "2023.3.1",
          likes: "765",
        },
        {
          name: "panda83",
          image: require("../assets/buy-im/83.png"),
          introduction: "数字*熊猫83",
          remaining: "543",
          issuer: "isPanda",
          price: "5240002",
          issuanceDate: "2023.3.1",
          likes: "983",
        },
      ],
    };
  },
  computed: {},
  mounted() {
    console.log(this.$bus);
    this.$bus.$on('rent', (data) => {
      this.rightGoods.push(data)
    });
    this.$bus.$on('like', (data) => {
      this.leftGoods.push(data)
    });
    this.$bus.$on("buy", (data) => {
      this.goodsList.push(data)
    });
  },
  methods: {
    showDialog(item) {
      this.detaildata = item; // 将当前点击的商品保存到对话框数据对象中
      this.dialogVisible = true; // 显示对话框
      console.log(item);
    },
    qvxiaorent(item) {
      let deleteit = item;
      this.rightGoods = this.rightGoods.filter((item) => {
        return item.name !== deleteit.name;
      });
      this.$message('取消成功');
    },
    qvxiaolike(item) {
      let deleteit = item;
      this.leftGoods = this.leftGoods.filter((item) => {
        return item.name !== deleteit.name;
      });
      this.$message('取消成功');
    },
    qvxiaohave(item) {
      // let deleteit = item;
      // // this.goodsList = this.goodsList.filter((item) => {
      // //   return item.name !== deleteit.name;
      // // });
      // this.leftGoods=this.leftGoods.unshift(item)
      this.$message('添加成功');
    },
  },
};
</script>

<style lang="less" scoped>
.goods {
  border-radius: 5px;
  padding: 3px;
  //       .el-descriptions {
  //   margin: 0 10px 20px 0;
  // }
  img {
    width: 150px;
  }

  // .introduction {
  //   // text-align: center;
  //   // color: rgb(60, 100, 128);
  // }
}
.text-center {
  text-align: center;
}
.pro-item {
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
}
.row-bg {
  width: 100%;
  height: 100%;
  margin-top: -70px;
  .box-card {
    margin-bottom: 20px;
    margin-right: 10px;
  }

  .upper {
    width: 100%;
    display: flex;
    justify-content: space-around;

    .up-card {
      display: flex;
      flex-direction: row;
      border: 1px solid #666666;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .icon-ifo {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: rgba(5, 30, 159);

        p {
          font-size: 14px;
          color: #999;
          text-align: center;

          span {
            font-size: 30px;
            margin-bottom: 10px;
            line-height: 30px;
            height: 30px;
          }
        }
      }

      i {
        width: 80px;
        height: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: #fff;
      }
    }
  }

  .goods-list {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    .goods {
      border-radius: 5px;
      padding: 3px;

      img {
        width: 150px;
      }

      .introduction {
        text-align: center;
        color: rgb(60, 100, 128);
      }

      .remaining {
        text-align: right;
        color: rgb(60, 100, 128);
      }
    }
  }
}
.box-card {
  margin-top: 40px;
}
.down {
  width: 100%;
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-around;
}

footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px;
  margin-left: 400px;

  h3 {
    margin-bottom: 10px;
  }

  .footer-left p {
    margin: 5px 0;
  }

  .footer-right img {
    margin-right: 1000px;
    width: 100px;
    height: 100px;
  }
}
</style>
