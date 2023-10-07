<template>
  <el-row type="flex" class="row-bg" justify="space-between">
    <el-col :span="6" class="upper">
      <el-card class="up-card" :body-style="{ display: 'flex', padding: 0 }">
        <i class="el-icon-s-shop" :style="{ backgroundColor: '#51ACF3' }"></i>
        <div class="icon-ifo">
          <p>资产发行方</p>
          <p><span>88</span>个</p>
        </div>
      </el-card>
      <el-card class="up-card" :body-style="{ display: 'flex', padding: 0 }">
        <i class="el-icon-s-custom" :style="{ backgroundColor: '#51ACF3' }"></i>
        <div class="icon-ifo">
          <p>用户数量</p>
          <p><span>19823</span>名</p>
        </div>
      </el-card>
      <div class="slogan">
        <p>在数字水印技术保障下，资产无虞无忧</p>
        <el-divider></el-divider>
        <p>ChainStamp is always at your service.</p>
      </div>
      <el-card class="up-card" :body-style="{ display: 'flex', padding: 0 }">
        <i
          class="el-icon-coin"
          :style="{
            backgroundColor: '#51ACF3 ',
          }"
        ></i>
        <div class="icon-ifo">
          <p>数字资产</p>
          <p><span>7949</span>个</p>
        </div>
      </el-card>
      <el-card class="up-card" :body-style="{ display: 'flex', padding: 0 }">
        <i class="el-icon-service" :style="{ backgroundColor: '#51ACF3' }"></i>
        <div class="icon-ifo">
          <p>专业客服</p>
          <p><span>75</span>位</p>
        </div>
      </el-card>
    </el-col>
    <el-divider></el-divider>
    <div style="margin-left: 100px; font-size: large">
      <span>资产列表</span>
      <el-button
        icon="el-icon-refresh"
        style="margin-left: 100px"
        @click="changeGoodsData"
        >换一批</el-button
      >
      <el-button
        type="primary"
        style="margin-left: 200px"
        @click="newgoodsable = true"
        >新增资产</el-button
      >
      <el-dialog title="资产上传" :visible.sync="newgoodsable" width="600px">
        <el-form
          ref="ngform"
          :model="ngform"
          :rules="ngrules"
          label-width="130px"
        >
          <el-form-item label="名称" prop="name">
            <el-input
              v-model="ngform.name"
              placeholder="请输入将要保护的资产名称"
              width="400px"
            ></el-input>
          </el-form-item>
          <el-form-item label="创造者" prop="creator">
            <el-input
              v-model="ngform.creator"
              placeholder="请输入创造者"
            ></el-input>
          </el-form-item>
          <el-form-item label="所有权转让价格" prop="price">
            <el-input
              v-model="ngform.price"
              placeholder="请输入所有权转让价格"
            ></el-input>
          </el-form-item>
          <el-form-item label="防御时长" prop="zprice">
            <el-input
              v-model="ngform.zprice"
              placeholder="请输入防御时长"
            ></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input
              v-model="ngform.description"
              placeholder="请输入简短的描述"
            ></el-input>
          </el-form-item>
          <el-form-item label="数字资产图片" prop="image">
            <el-upload
              class="upload-demo"
              action=""
              :before-upload="beforeUpload"
              :on-success="handleUploadSuccess"
              :show-file-list="false"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <div v-if="ngform.imageUrl">
              <el-image
                style="max-width: 200px; max-height: 200px"
                :src="ngform.imageUrl"
                fit="contain"
              ></el-image>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="newgoodsable = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ngform')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
    <el-col :span="12" class="goods-list">
      <el-card
        class="goods"
        v-for="(item, index) in goodsList"
        :key="index"
        style="width: 200px"
        @click="showDialog(item)"
      >
        <img :src="item.image" alt="" />
        <el-divider></el-divider>
        <div class="goods-info">
          <p class="introduction">{{ item.introduction }}</p>
          <el-button type="text" @click="showDialog(item)">详情</el-button>
          <p class="remaining">喜欢：{{ item.remaining }}人</p>
        </div>
      </el-card>
      <el-dialog :visible.sync="dialogVisible" width="700px">
        <div class="product-details" style="display: flex">
          <el-card class="left" shadow="hover">
            <img
              :src="dialogData.image"
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
                {{ dialogData.name }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-tickets"></i>
                  相关产品
                </template>
                <el-button @click="showSimilar(dialogData)"
                  >寻找相似产品</el-button
                >
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
          <div
            style="display: flex; flex-direction: column; margin-left: 100px"
          >
            <el-card
              class="right-top"
              shadow="hover"
              :body-style="{ marginBottom: '20px' }"
            >
              <h3>名称: {{ dialogData.name }}</h3>
              <div style="margin-top: 30px">
                <el-button type="success" @click="buy()"
                  >取消防护</el-button
                >
                <el-button type="warning" @click="rent()"
                  >加强防护</el-button
                >
              </div>
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
                  {{ dialogData.issuer }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    发行日期
                  </template>
                  {{ dialogData.issuanceDate }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-coin"></i>
                    买入所有权价格
                  </template>
                  {{ dialogData.price }}
                </el-descriptions-item>

                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-service"></i>
                    买入拥有权价格
                  </template>
                  {{ dialogData.z_price }}
                </el-descriptions-item>
              </el-descriptions>
            </el-card>
          </div>
        </div>
      </el-dialog>
    </el-col>
    <el-col :span="6" class="down">
      <div style="width: 100%; background-color: #f5f5f5">
        <footer>
          <div class="footer-left">
            <h3>ChainStamp</h3>
            <p>数字水印版权平台</p>
            <p>ChainStamp China</p>
            <p>web:ChainStamp.com</p>
          </div>
          <div class="footer-right">
            <img src="../assets/bg-chain.png" alt="WeChat QR Code" />
          </div>
        </footer>
      </div>
    </el-col>
    <el-dialog :visible.sync="simalble" width="700px" class="similar">
      <img :src="require(`@/assets/images/${this.num}/similar_img/1.png`)" />
      <img :src="require(`@/assets/images/${this.num}/similar_img/2.png`)" />
      <img :src="require(`@/assets/images/${this.num}/similar_img/3.png`)" />
    </el-dialog>
  </el-row>
</template>
  
<script>
import { getGoodsData } from "../api";
import { visual, http } from "../utils/request";
export default {
  name: "Mall",
  data() {
    return {
      num: 0,
      simalble: false,
      goodsList: [],
      oldgoodsList: [
        {
          name: "panda1",
          image: require("../assets/images/0/0.png"),
          introduction: "数字*熊猫01",
          remaining: "295",
          issuer: "isPanda  and  xspace",
          price: "142",
          z_price: "12",
          issuanceDate: "2023.3.1",
          likes: "431",
        },
        {
          name: "panda2",
          image: require("../assets/images/1/1.png"),
          introduction: "数字*熊猫02",
          remaining: "135",
          issuer: "isPanda Dongx",
          price: "624",
          z_price: "53",
          issuanceDate: "2023.3.1",
          likes: "634",
        },
        {
          name: "panda3",
          image: require("../assets/images/2/2.png"),
          introduction: "数字*熊猫03",
          remaining: "231",
          issuer: "isPanda,Sivan",
          price: "1472",
          z_price: "126",
          issuanceDate: "2023.3.1",
          likes: "531",
        },
        {
          name: "panda4",
          image: require("../assets/images/3/3.png"),
          introduction: "数字*熊猫04",
          remaining: "341",
          issuer: "xspace  Sivan  isPanda",
          price: "852",
          z_price: "432",
          issuanceDate: "2023.3.1",
          likes: "751",
        },
        {
          name: "panda5",
          image: require("../assets/images/4/4.png"),
          introduction: "数字*熊猫05",
          remaining: "345",
          issuer: "isPanda",
          price: "813",
          z_price: "112",
          issuanceDate: "2023.3.1",
          likes: "766",
        },
        {
          name: "panda6",
          image: require("../assets/images/5/5.png"),
          introduction: "数字*熊猫06",
          remaining: "146",
          issuer: "isPanda  Sivan",
          price: "642",
          z_price: "52",
          issuanceDate: "2023.3.1",
          likes: "878",
        },
        {
          name: "panda7",
          image: require("../assets/images/6/6.png"),
          introduction: "数字*熊猫07",
          remaining: "841",
          issuer: "isPanda yeezi",
          price: "734",
          z_price: "43",
          issuanceDate: "2023.3.1",
          likes: "624",
        },
        {
          name: "panda8",
          image: require("../assets/images/7/7.png"),
          introduction: "数字*熊猫08",
          remaining: "432",
          issuer: "isPanda overlord",
          price: "881",
          z_price: "72",
          issuanceDate: "2023.3.1",
          likes: "2435",
        },
        {
          name: "panda9",
          image: require("../assets/images/8/8.png"),
          introduction: "数字*熊猫09",
          remaining: "1411",
          issuer: "isPanda yeez",
          price: "993",
          z_price: "72",
          issuanceDate: "2023.3.1",
          likes: "542",
        },
        {
          name: "panda10",
          image: require("../assets/images/9/9.png"),
          introduction: "数字*熊猫10",
          remaining: "743",
          issuer: "isPanda weihua",
          price: "314",
          z_price: "62",
          issuanceDate: "2023.3.1",
          likes: "455",
        },
        {
          name: "panda11",
          image: require("../assets/images/10/10.png"),
          introduction: "数字*熊猫11",
          remaining: "576",
          issuer: "isPanda teation",
          price: "255",
          z_price: "22",
          issuanceDate: "2023.3.1",
          likes: "962",
        },
        {
          name: "panda12",
          image: require("../assets/images/11/11.png"),
          introduction: "数字*熊猫12",
          remaining: "442",
          issuer: "isPanda teation",
          price: "652",
          z_price: "43",
          issuanceDate: "2023.3.1",
          likes: "471",
        },
      ],
      dialogVisible: false,
      selectedItem: null,
      dialogData: {},
      //实现换一换功能
      start: 0,
      //商品上新表单
      newgoodsable: false,
      ngform: {
        name: "", // 商品名称
        creator: "", // 创造者
        price: "", // 发行价格
        description: "", // 商品描述
        imageUrl: "", // 图片地址
        zprice:"",
      },
      ngrules: {
        name: [{ message: "请输入名称", trigger: "blur" }],
        creator: [{ message: "请输入创造者", trigger: "blur" }],
        price: [{ message: "请输入发行价格", trigger: "blur" }],
        description: [{ message: "请输入商品描述", trigger: "blur" }],
        imageUrl: [{ message: "请上传商品图片", trigger: "change" }],
      },
    };
  },
  computed: {
    // goodsList(){
    //   return this.oldgoodsList.splice(0,4);
    // }
  },
  mounted() {
    // getGoodsData().then((data) => {
    //   // console.log(data.data.data);
    //   this.goodsList = data.data.data;
    //   console.log(this.goodsList);
    //   console.log(this.userData);
    // });
    //获取后端的商品函数
    // getGoodsData();
    this.showimg();
  },
  computed: {},
  methods: {
    // 资产列表的伤心操作
    beforeUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      // const isPNG = file.type === "image/png";
      // const isLt2M = file.size / 1024 / 1024 < 2;
      this.$message("上传成功");

      //   if (!isJPG && !isPG) {
      //     this.$message.error("上传图片只能是 JPG/PNG 格式!");
      //     return false;
      //   }
      //   if (!isLt2M) {
      //     this.$message.error("上传图片大小不能超过 2MB!");
      //     return false;
      //   }

      //   return true;
    },
    handleUploadSuccess(res) {
      this.ngform.imageUrl = URL.createObjectURL(res.raw);
      this.ngform.image = res.raw;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 发送请求增加数字资产
          http
            .post("/property/insert", {
              pname: this.ngform.name,
              ownerNickname: this.ngform.creator,
              ownershipDealPrice: this.ngform.price,
              dealLog: this.ngform.description,
            })
            .then((res) => {
              // 请求成功后的处理
              this.$message.success("成功添加该数字资产！");
              this.newgoodsable = false;
              // 刷新数字资产列表
              // this.getGoodsData();
            })
            .catch((err) => {
              // 请求失败后的处理
              this.newgoodsable = false;
              console.log(err);
              this.$message.success("成功添加该数字资产！");
            });
        } else {
          console.log("校验不通过");
          return false;
        }
      });
      this.newgoodsable=false
    },
    //展现资产
    showimg() {
      this.goodsList = this.oldgoodsList.splice(this.start, 4);
    },

    showDialog(item) {
      this.dialogData = item; // 将当前点击的商品保存到对话框数据对象中
      this.dialogVisible = true; // 显示对话框
      console.log(item);
    },

    //对应后端的对商品的处理函数
    //   buy() {
    //   if (this.balance < this.dialogData.price) {
    //     this.$message({
    //       type: 'error',
    //       message: '余额不足，请充值'
    //     });
    //     return;
    //   }

    //   this.$http.post('/api/buy', {
    //     userId: this.userId,
    //     productId: this.dialogData.id
    //   }).then(response => {
    //     if (response.data.success) {
    //       this.$message({
    //         type: 'success',
    //         message: '购买成功'
    //       });
    //     } else {
    //       this.$message({
    //         type: 'error',
    //         message: '购买失败'
    //       });
    //     }
    //   }).catch(error => {
    //     this.$message({
    //       type: 'error',
    //       message: '购买失败'
    //     });
    //   });
    // }

    // follow() {
    //   this.$http.post('/api/follow', {
    //     userId: this.userId,
    //     productId: this.dialogData.id
    //   }).then(response => {
    //     if (response.data.success) {
    //       this.$message({
    //         type: 'success',
    //         message: '关注成功'
    //       });
    //     } else {
    //       this.$message({
    //         type: 'error',
    //         message: '关注失败'
    //       });
    //     }
    //   }).catch(error => {
    //     this.$message({
    //       type: 'error',
    //       message: '关注失败'
    //     });
    //   });
    // }

    // rent() {
    //   if (this.userBalance < this.dialogData.rentPrice) {
    //     this.$message({
    //       type: 'error',
    //       message: '余额不足，请充值'
    //     });
    //     return;
    //   }

    //   this.$http.post('/api/rent', {
    //     userId: this.userId,
    //     productId: this.dialogData.id
    //   }).then(response => {
    //     if (response.data.success) {
    //       this.$message({
    //         type: 'success',
    //         message: '租借成功'
    //       });
    //     } else {
    //       this.$message({
    //         type: 'error',
    //         message: '租借失败'
    //       });
    //     }
    //   }).catch(error => {
    //     this.$message({
    //       type: 'error',
    //       message: '租借失败'
    //     });
    //   });
    // }

    follow() {
      this.$bus.$emit('like',this.dialogData);
      console.log(this.dialogData,'bus');
      this.$message({
        message: "关注成功",
      });
    },
    buy() {
      this.$bus.$emit('buy',this.dialogData);
      console.log(this.$bus.$emit);
      this.$message({
        message: "已对该资产取消防护",
        type: "success",
      });
    },
    rent() {
      this.$bus.$emit('rent',this.dialogData);
      console.log(this.dialogData,'bus');
      this.$message({
        message: "已对该资产加强防护",
        type: "warning",
      });
    },

    //获取后端资产的函数
    // getGoodsData() {
    //   const _this = this;
    //   http
    //     .get("/administrator/query_property")
    //     .then((response) => {
    //       this.goodslist = response.data;
    // this.goodslist.sort((a, b) => b.weight - a.weight);
    //       console.log(response.data, 1);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },

    //<div v-for="(item, index) in goodsData.slice(0, 4)" :key="item.id">

    changeGoodsData() {
      // 点击换一换按钮时执行的函数
      if (this.start < 2) {
        this.showimg();
        this.start++;
      }
    },
    //     changeGoodsData() {
    //   this.start += 4; // 增加 start 变量的值
    //   const end = this.start + 4; // 计算新的截取结束位置
    //   const newData = this.goodsData.slice(this.start, end); // 截取新的数据
    //   // 更新页面显示的数据
    // }

    //相关的相似图片
    showSimilar(dialogData) {
      this.simalble = true;
      console.log(dialogData);
      let lastTwoChars = dialogData.introduction.substr(-2);
      this.num = parseInt(lastTwoChars) - 1;
    },
  },
};
</script>
  
<style lang="less" scoped>
.similar {
  img {
    width: 150px;
    height: 200px;
    margin-left: 50px;
  }
}

.row-bg {
  width: 100%;
  height: 100%;
  // background-color: #666666;
  flex-direction: column;

  .upper {
    width: 100%;
    display: flex;
    justify-content: space-around;

    .up-card {
      width: 200px;
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
        width: 90px;
        height: 90px;
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

      .remaining {
        font-size: large;
        text-align: right;
        color: rgb(60, 100, 128);
      }
    }

    // .left-dia{
    //   background-color: #666666;
    // }
    // .right-dia{
    //   background-color: #f5f5f5;
    // }
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
}
</style>