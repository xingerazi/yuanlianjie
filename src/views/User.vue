<template>
  <div class="manage">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="37%"
      label-position="right"
    >
      <!-- 用户的表单信息 -->
      <el-form ref="form" inline :model="form" label-width="80px">
        <el-form-item label="姓名" label-width="50px">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" label-width="50px">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="50px">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址" label-width="50px">
          <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label-width="50px">
          <span class="demonstration">出生日期</span>
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="举报信息处理"
      :visible.sync="reportboxVisible"
      width="50%"
      label-position="right"
    >
      <el-table :data="reportlist" border style="width: 100%">
        <el-table-column fixed prop="informerId" label="举报人id" width="80">
        </el-table-column>
        <el-table-column prop="informerNickname" label="举报人姓名" width="100">
        </el-table-column>
        <el-table-column fixed prop="reportedId" label="被举报人id" width="80">
        </el-table-column>
        <el-table-column
          prop="reportedNickname"
          label="被举报人姓名"
          width="100"
        >
        </el-table-column>
        <el-table-column prop="reason" label="问题描述" width="160">
        </el-table-column>
        <el-table-column prop="informTime" label="举报时间" width="120">
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="deleteInform(scope.row)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <div class="manage-header">
      <el-button @click="dialogVisible = true" type="primary">
        + 新增
      </el-button>
      <el-button
        type="info"
        icon="el-icon-message"
        style="margin-left: 100px"
        @click="reportboxVisible = true"
        >举报箱</el-button
      >
    </div>
    <el-row :gutter="20" class="mt-10">
      <el-col :span="10">
        <el-card>
          <div class="tit" style="display: flex; flex-direction: row">
            用户管理
            <el-button
              icon="el-icon-search"
              circle
              style="margin-left: 100px"
              @click="searchUser"
            ></el-button>
            <el-input
              placeholder="请输入用户ID"
              v-model="searchUserid"
              clearable
              type="text"
            >
            </el-input>
          </div>

          <el-table
            :data="userlist"
            style="width: 100%"
            stripe
            max-height="530"
          >
            <el-table-column prop="id" label="id" sortable> </el-table-column>
            <el-table-column prop="nickname" label="姓名"> </el-table-column>

            <el-table-column prop="phonenumber" label="手机号" width="160">
            </el-table-column>
            <el-table-column prop="balance" label="余额" sortable>
            </el-table-column>
            <el-table-column prop="fans" label="粉丝"> </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  @click="deleteuser(scope.row)"
                  type="text"
                  size="small"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-col>
            <el-card>
              <div class="tit">
                <span>资产管理</span>
                <el-button
                  type="primary"
                  style="margin-left: 200px"
                  @click="newgoodsable = true"
                  >新增资产</el-button
                >
                <el-dialog
                  title="资产上新"
                  :visible.sync="newgoodsable"
                  width="500px"
                >
                  <el-form
                    ref="ngform"
                    :model="ngform"
                    :rules="ngrules"
                    label-width="120px"
                  >
                    <el-form-item label="名称" prop="name">
                      <el-input
                        v-model="ngform.name"
                        placeholder="请输入商品名称"
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
                    <el-form-item label="使用权授予价格" prop="zprice">
                      <el-input
                        v-model="ngform.zprice"
                        placeholder="请输入使用权授予价格"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="商品简介" prop="description">
                      <el-input
                        v-model="ngform.description"
                        placeholder="请输入简短的商品描述"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="图片" prop="image">
                      <el-upload
                        class="upload-demo"
                        action=""
                        :before-upload="beforeUpload"
                        :on-success="handleUploadSuccess"
                        :show-file-list="false"
                      >
                        <el-button size="small" type="primary"
                          >点击上传</el-button
                        >
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
              <el-table :data="goodslist" height="280px">
                <el-table-column prop="id" label="资产id" sortable>
                </el-table-column>
                <el-table-column prop="pname" label="资产名称" sortable>
                </el-table-column>
                <el-table-column prop="useDealPrice" label="购买价格" sortable>
                </el-table-column>
                <el-table-column prop="ownerNickname" label="拥有者" sortable>
                </el-table-column>
                <el-table-column prop="weight" label="权重" sortable>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button
                      @click="deleteGood(scope.row)"
                      type="text"
                      size="small"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
          <el-col class="mt-10">
            <el-card>
              <div class="tit">举报管理</div>
              <div ref="echarts2" style="height: 280px; width: 100%"></div>
              <el-progress
                :text-inside="true"
                text-color="#fff"
                :stroke-width="22"
                :percentage="97"
                :format="format"
              ></el-progress>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="userable">
      <el-table :data="searcher" style="width: 100%" stripe max-height="530">
        <el-table-column prop="id" label="id" sortable> </el-table-column>
        <el-table-column prop="nickname" label="姓名"> </el-table-column>
        <el-table-column prop="phonenumber" label="手机号" width="160">
        </el-table-column>
        <el-table-column prop="balance" label="余额" sortable>
        </el-table-column>
        <el-table-column prop="fans" label="粉丝"> </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
  
<script>
import * as echarts from "echarts";
import { visual, http } from "../utils/request";
export default {
  data() {
    return {
      searcher: [],
      userable: false,
      dialogVisible: false,
      reportboxVisible: false,
      newgoodsable: false,
      searchUserid: "",
      //商品上新表单
      ngform: {
        name: "", // 商品名称
        creator: "", // 创造者
        price: "", // 发行价格
        description: "", // 商品描述
        imageUrl: "", // 图片地址
        zprice: "",
      },
      ngrules: {
        name: [{ message: "请输入名称", trigger: "blur" }],
        creator: [{ message: "请输入创造者", trigger: "blur" }],
        price: [{ message: "请输入发行购买价格", trigger: "blur" }],
        zprice: [{ message: "请输入转让拥有权价格", trigger: "blur" }],
        description: [{ message: "请输入商品描述", trigger: "blur" }],
        imageUrl: [{ message: "请上传商品图片", trigger: "change" }],
      },

      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      userlist: [
        {
          id: 85712,
          nickname: "JohnDoe",
          phonenumber: "+1 123-456-7890",
          balance: "$100.00",
          fans: 53,
        },
        {
          id: 92147,
          nickname: "JaneSm",
          phonenumber: "+1 987-654-3210",
          balance: "$50.25",
          fans: 25,
        },
        {
          id: 31254,
          nickname: "Johnson",
          phonenumber: "+1 555-123-4567",
          balance: "$75.80",
          fans: 100,
        },
        {
          id: 64892,
          nickname: "Brown",
          phonenumber: "+1 555-987-6543",
          balance: "$20.10",
          fans: 82,
        },
        {
          id: 17543,
          nickname: "Davis",
          phonenumber: "+1 888-555-1234",
          balance: "$150.50",
          fans: 34,
        },
        {
          id: 38921,
          nickname: "Wilson",
          phonenumber: "+1 777-222-3333",
          balance: "$10.00",
          fans: 34,
        },
        {
          id: 56341,
          nickname: "Sophia",
          phonenumber: "+1 111-222-3333",
          balance: "$5.75",
          fans: 60,
        },
        {
          id: 72983,
          nickname: "Taylor",
          phonenumber: "+1 444-555-6666",
          balance: "$80.20",
          fans: 39,
        },
        {
          id: 49682,
          nickname: "Olivia",
          phonenumber: "+1 777-888-9999",
          balance: "$30.50",
          fans: 40,
        },
        {
          id: 83475,
          nickname: "Daniel",
          phonenumber: "+1 123-123-4567",
          balance: "$55.10",
          fans: 12,
        },
        {
          id: 61947,
          nickname: "Miller",
          phonenumber: "+1 555-888-7777",
          balance: "$90.75",
          fans: 70,
        },
        {
          id: 27139,
          nickname: "Michael",
          phonenumber: "+1 999-888-7777",
          balance: "$15.35",
          fans: 35,
        },
        {
          id: 58236,
          nickname: "Clark",
          phonenumber: "+1 222-333-4444",
          balance: "$70.60",
          fans: 11,
        },
        {
          id: 41623,
          nickname: "Noah",
          phonenumber: "+1 666-777-8888",
          balance: "$25.00",
          fans: 20,
        },
        {
          id: 75932,
          nickname: "Emily",
          phonenumber: "+1 123-555-7890",
          balance: "$45.15",
          fans: 20,
        },
        {
          id: 29384,
          nickname: "Jacob",
          phonenumber: "+1 777-444-5555",
          balance: "$60.90",
          fans: 55,
        },
      ],
      goodslist: [
        {
          id: "AS-1234",
          pname: "Painting",
          useDealPrice: "$5000",
          ownerNickname: "John",
          weight: 8,
        },
        {
          id: "AS-5678",
          pname: "Sculpture",
          useDealPrice: "$3000",
          ownerNickname: "Jane",
          weight: 6,
        },
        {
          id: "AS-9123",
          pname: "Jewelry",
          useDealPrice: "$2000",
          ownerNickname: "Mike",
          weight: 10,
        },
        {
          id: "AS-4567",
          pname: "Antique Coin",
          useDealPrice: "$1500",
          ownerNickname: "Emily",
          weight: 5,
        },
        {
          id: "AS-7890",
          pname: "Vintage Watch",
          useDealPrice: "$2500",
          ownerNickname: "David",
          weight: 7,
        },
        {
          id: "AS-3456",
          pname: "Photograph",
          useDealPrice: "$1000",
          ownerNickname: "Sophia",
          weight: 3,
        },
        {
          id: "AS-2345",
          pname: "Handbag",
          useDealPrice: "$1800",
          ownerNickname: "Oliver",
          weight: 4,
        },
        {
          id: "AS-8901",
          pname: "Coin Collection",
          useDealPrice: "$3500",
          ownerNickname: "Ava",
          weight: 9,
        },
        {
          id: "AS-6789",
          pname: "Vintage Car",
          useDealPrice: "$10000",
          ownerNickname: "Daniel",
          weight: 10,
        },
        {
          id: "AS-1235",
          pname: "Stamp Collection",
          useDealPrice: "$1200",
          ownerNickname: "Mia",
          weight: 2,
        },
      ],
      reportlist: [
        {
          informerId: 572,
          informerNickname: "John",
          reportedId: 689,
          reportedNickname: "Jane",
          reason: "作品侵权",
          informTime: "2022-05-15",
        },
        {
          informerId: 937,
          informerNickname: "Mike",
          reportedId: 412,
          reportedNickname: "Alice",
          reason: "数字资产盗窃",
          informTime: "2022-06-20",
        },
        {
          informerId: 821,
          informerNickname: "Emma",
          reportedId: 246,
          reportedNickname: "David",
          reason: "虚假广告",
          informTime: "2022-08-10",
        },
        {
          informerId: 684,
          informerNickname: "Sophie",
          reportedId: 953,
          reportedNickname: "Daniel",
          reason: "账号共享",
          informTime: "2022-07-05",
        },
        {
          informerId: 109,
          informerNickname: "Olivia",
          reportedId: 520,
          reportedNickname: "Noah",
          reason: "恶意操纵市场",
          informTime: "2022-09-12",
        },
        {
          informerId: 876,
          informerNickname: "Jacob",
          reportedId: 371,
          reportedNickname: "Sophia",
          reason: "侮辱他人",
          informTime: "2022-08-28",
        },
        {
          informerId: 295,
          informerNickname: "Ava",
          reportedId: 607,
          reportedNickname: "Ethan",
          reason: "诈骗行为",
          informTime: "2022-06-02",
        },
        {
          informerId: 413,
          informerNickname: "Liam",
          reportedId: 734,
          reportedNickname: "Mia",
          reason: "不当言论",
          informTime: "2022-07-22",
        },
        {
          informerId: 821,
          informerNickname: "Charlotte",
          reportedId: 157,
          reportedNickname: "Henry",
          reason: "侵犯隐私",
          informTime: "2022-09-05",
        },
        {
          informerId: 628,
          informerNickname: "Harper",
          reportedId: 941,
          reportedNickname: "William",
          reason: "恶意传播谣言",
          informTime: "2022-05-30",
        },
      ],
    };
  },
  mounted() {
    const echarts2 = echarts.init(this.$refs.echarts2);
    const newArray = [];
    console.log(newArray);
    const echarts2Option = {
      toolbox: {
        // 显示工具箱
        show: true,
        feature: {
          // 数据缩放
          dataZoom: {
            yAxisIndex: "none",
          },
          // 数据视图只读
          dataView: { readOnly: false },
          // 魔法类型
          magicType: { type: ["line", "bar"] },
          //  重置
          restore: {},
          // 保存图片
          saveAsImage: {},
        },
      },
      tooltip: { trigger: "axis" },
      yAxis: { data: ["数字资产", "用户", "其他"] },
      xAxis: {},
      series: [
        {
          name: "举报条数",
          type: "bar",
          data: [80, 60, 75],
          stack: true,
          label: {
            show: true,
            position: "insideRight",
            formatter: "{a}\n{c}条",
          },
        },
      ],
    };
    echarts2.setOption(echarts2Option);

    console.log(2);
    //获取用户列表
    // this.fetchUserList();
    //获取资产列表
    // this.fetchGoodList();
    //获取举报列表
    // this.fetchInformer();
  },
  methods: {
    format(percentage) {
      return `已解决${percentage}%`;
    },
    //用户列表的操作
    fetchUserList() {
      const _this = this;
      http
        .get("/administrator/query_user")
        .then((response) => {
          _this.userlist = response.data.data;
          console.log(_this.userlist, "用户列表");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteuser(row) {
      console.log(row.id);
      const _this = this;
      this.userlist = this.userlist.filter((item) => {
        return item.id !== row.id;
      });
      http
        .delete(`/administrator/delete_user/${row.id}`)
        .then((response) => {
          _this.fetchUserList();
          _this.$message.success("成功删除用户！");
        })
        .catch((error) => {
          console.log(error);
          _this.$message.success("删除用户成功");
        });
    },
    searchUser() {
      this.userable = true;
      http
        .get(`/administrator/query_user_byId/${_this.searchUserid}`)
        .then((response) => {
          // 请求成功后的处理逻辑
          console.log(response.data.data);
          this.searcher = response.data.data;
          console.log(_this.searcher);
        })
        .catch((error) => {
          // 请求失败后的处理逻辑
          console.error(error);
        });
    },
    submitit() {
      this.dialogVisible = false;
      this.$message.success("成功添加用户！");
    },
    //资产列表的操作
    fetchGoodList() {
      const _this = this;
      http
        .get("/administrator/query_property")
        .then((response) => {
          this.goodslist = response.data.data;
          console.log(response.data, 1);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteGood(row) {
      const _this = this;
      this.goodslist = this.goodslist.filter((item) => {
        return item.id !== row.id;
      });
      http
        .delete(`/administrator/delete_property/${row.id}`)
        .then((response) => {
          this.fetchGoodList();
          this.$message.success("成功删除数字资产！");
          console.log(1);
        })
        .catch((error) => {
          console.log(error);
          this.$message.success("成功删除数字资产！");
        });
    },

    // 资产列表的伤心操作
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPG) {
        this.$message.error("上传图片只能是 JPG/PNG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
        return false;
      }

      return true;
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
              this.$message.success("成功添加数字资产！");
              this.newgoodsable = false;
              // 刷新数字资产列表
              // this.getGoodsData();
            })
            .catch((err) => {
              // 请求失败后的处理
              console.log(err);
              this.$message.success("成功添加数字资产！");
            });
        } else {
          console.log("校验不通过");
          return false;
        }
      });
      this.newgoodsable = false;
    },

    //举报箱处理
    fetchInformer() {
      const _this = this;
      http
        .get("/informer/requery")
        .then((response) => {
          _this.reportlist = response.data.data;
          console.log(_this.reportlist);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //删除举报信息
    deleteInform(row) {
      const _this = this;
      this.reportlist = this.reportlist.filter((item) => {
        return item.informerId != row.informerId;
      });
      http
        .delete(`/administrator/delete_informer/${row.id}`)
        .then((response) => {
          this.fetchInformer();
          this.$message.success("举报删除成功");
        })
        .catch((error) => {
          console.log(error);
          this.$message.success("举报删除成功");
        });
    },
  },
};
</script>
  
<style>
.mt-10 {
  margin-top: 20px;
}
</style>