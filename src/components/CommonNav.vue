<template>
  <div class="nav-container">
    <div class="left-side">
      <span class="nav-title">{{ label }}</span>
      <el-breadcrumb separator="/" style="margin-left: 25px">
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="right-side">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="../assets/logo.png" alt="" class="user-img" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          <el-dropdown-item divided @click.native="denounce"
            >举报</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog title="举报" :visible.sync="denounceable" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="举报类型" prop="reportType">
          <el-select v-model="form.reportType" placeholder="请选择">
            <el-option label="举报用户" value="user"></el-option>
            <el-option label="举报资产" value="asset"></el-option>
            <el-option label="其他" value="else"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="举报描述" prop="description">
          <el-input
            v-model="form.description"
            placeholder="请输入举报描述"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片证据" prop="image">
          <el-upload
            class="upload-demo"
            action="http://113.54.233.133:8081/informer/upload"
            :before-upload="beforeUpload"
            :on-success="handleUploadSuccess"
            :show-file-list="false"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <div v-if="form.imageUrl">
            <el-image
              style="max-width: 200px; max-height: 200px"
              :src="form.imageUrl"
              fit="contain"
            ></el-image>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Cookie from "js-cookie";
import { visual, http } from "../utils/request";
export default {
  data() {
    return {
      // label:''

      //举报
      denounceable: false,
      form: {
        reportType: "",
        name: "",
        description: "",
        imageUrl: "",
      },
      rules: {
        reportType: [
          { required: true, message: "请选择举报类型", trigger: "change" },
        ],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        description: [
          { required: true, message: "请输入举报描述", trigger: "blur" },
        ],
        image: [
          { required: false, message: "请上传图片证据", trigger: "change" },
        ],
      },
    };
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
    label() {
      return this.$route.meta.label;
    },
  },
  methods: {
    logout() {
      //清除cookie
      Cookie.remove("token");
      //跳转到登陆页面
      this.$router.push("./login");
      //清除cookie中的menu
      Cookie.remove("menu");
    },
    denounce() {
      this.denounceable = true;
    },
    submitForm(formName) {
      this.denounceable=false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this;
          this.$http
            .post("/register", {
              informerNickname:'未知',
              reporedNickname: _this.form.name,
              reason: _this.form.description,
            })
            .then((res) => {
              this.$message.success("举报成功！");
              //清空表单
            })
            .catch((err) => {
              _this.$message.error("举报成功！");
            });
        } else {
          return false;
        }
      });
    },
    handleUploadSuccess(res) {
      console.log(res.status);
      if (res.status === 100) {
        this.$message("上传成功");
      }
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error("上传图片只能是 JPG/PNG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="less" scoped>
.nav-container {
  padding: 0 20px;
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .nav-title {
    color: #fff;
    font-size: larger;
  }

  .user-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .left-side {
    display: flex;
    align-items: center;

    /deep/.el-breadcrumb__item {
      .el-breadcrumb__inner {
        font-size: normal;

        &.is-link {
          color: #666;
        }
      }

      &:last-child {
        .el-breadcrumb__inner {
          color: #fff;
        }
      }
    }
  }
}
</style>