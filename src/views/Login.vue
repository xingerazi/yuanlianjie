<template>
  <div id="body">
    <el-card class="login">
      <h3 style="text-align: center; margin-top: 10px; margin-bottom: 25px">
        元—链接 区块链交易平台
      </h3>

      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="ruleForm"
        inline
      >
        <div class="box">
          <span>账号：</span>
          <el-form-item prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
        </div>
        <div class="box">
          <span>密码：</span>
          <el-form-item prop="password" inline>
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>
        </div>

        <el-form-item class="login-btn">
          <el-button type="primary" @click="submit">登录</el-button>
          <el-button @click="showRegistryDialog">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog
      title="新用户注册"
      :visible.sync="registerDialogVisible"
      :before-close="closeRegisterDialog"
      width="30%"
    >
      <el-form
        :model="registerForm"
        status-icon
        :rules="registerRules"
        ref="registerForm"
      >
        <el-form-item
          label="登录用户名："
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input
            v-model="registerForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码："
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input
            type="password"
            v-model="registerForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码："
          :label-width="formLabelWidth"
          prop="checkPass"
        >
          <el-input
            type="password"
            v-model="registerForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户头像：" :label-width="formLabelWidth">
          <el-upload
            action="/ossFileUpload?module=group-chat"
            ref="upload"
            list-type="picture-card"
            :class="{ disabled: uploadDisabled }"
            :before-upload="beforeAvatarUpload"
            :file-list="fileList"
            :on-progress="onProgress"
            :on-success="imgSuccess"
            :on-error="imgError"
            :on-remove="imgRemove"
          >
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传不超过4MB的图片(可使用默认头像！)
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="submitRegisterForm('registerForm')"
          style="width: 100%"
          >去登陆</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Mock from "mockjs";
import Cookie from "js-cookie";
import { getMenu } from "../api";
import {visual,http} from "../utils/request";
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 5 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      //注册相关
      registerDialogVisible: false, // 注册对话框是否可见
      registerForm: {
        // 注册表单数据对象
        username: "",
        password: "",
        checkPass: "",
        avatar: "",
      },
      formLabelWidth: "120px", // 表单项标签的宽度
      registerRules: {
        // 注册表单项的验证规则
        username: [
          { required: true, message: "请输入登录用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "密码长度为6到20个字符",
            trigger: "blur",
          },
        ],
        checkPass: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: this.validatePassword, trigger: "blur" },
        ],
      },
      uploadDisabled: false, // 头像上传是否可用
      fileList: [], // 头像上传文件列表
    };
  },
  methods: {
    //登录
    submit() {
      // // token信息
      // const token = Mock.Random.guid()
      // 校验通过
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // let _this = this;
          // http
          //   .post("/user/login", {
          //     nickname: _this.ruleForm.username,
          //     password: _this.ruleForm.password,
          //   })
          //   .then((response) => {
          //     // 请求成功后的处理逻辑
          //     console.log(response);
          //     if (response.data.status==100) {
          //       console.log(response.data);
          //     this.store.commit("setUser", response.data);
          //     this.$store.commit("addMenu", this.$router);
            // 跳转到首页
            // this.$router.push("/home");
          //     } else {
          //       alert("用户名或密码错误");
          //       console.log(response.data);
          //     }
          //   })
          //   .catch((error) => {
          //     // 请求失败后的处理逻辑
          //     console.error(error);
          //   });
          getMenu(this.ruleForm).then(({ data }) => {
            // console.log(data);
            if (data.code === 20000) {
              // token信息存入cookie用于不同页面间的通信
              Cookie.set("token", data.data.token);
              // 获取菜单的数据，存入store中
              this.$store.commit('setUser',data.data.userdata)
              this.$store.commit("setMenu", data.data.menu);
              this.$store.commit("addMenu", this.$router);
              // 跳转到首页
              this.$router.push("/home");
            } else {
              this.$message.error(data.data.message);
            }
          });
        }
      });
    },

    //注册
    // 打开注册对话框
    showRegistryDialog() {
      this.registerDialogVisible = true;
    },

    // 关闭注册对话框之前执行的函数
    closeRegisterDialog(done) {
      // 清空表单数据
      this.$refs.registerForm.resetFields();
      // 关闭对话框
      done();
    },

    // 头像上传之前执行的函数
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt4M = file.size / 1024 / 1024 < 4;

      if (!isJPG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
        return false;
      }
      if (!isLt4M) {
        this.$message.error("上传头像图片大小不能超过 4MB!");
        return false;
      }
      return true;
    },

    // 头像上传进度的回调函数
    onProgress(event, file, fileList) {
      console.log("上传进度", event, file, fileList);
    },

    // 上传头像成功的回调函数
    imgSuccess(response, file, fileList) {
      // 上传成功后将图片的地址赋值给表单字段
      this.registerForm.avatarUrl = response.url;
    },

    // 上传头像失败的回调函数
    imgError(err, file, fileList) {
      this.$message.error("上传头像失败!");
    },

    // 删除上传的头像
    imgRemove(file, fileList) {
      // 从表单中清空头像url
      this.registerForm.avatarUrl = "";
    },

    // 提交注册表单
    submitRegisterForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.registerForm.password !== this.registerForm.checkPass) {
            this.$message.error("两次输入的密码不一致");
            return;
          }
          // 执行注册逻辑
          this.$http
            .post("/register", this.registerForm)
            .then((res) => {
              // 注册成功，跳转到登录页面
              this.$message.success("注册成功，请登录！");
              this.$emit("register-success");
              this.registerDialogVisible = false;
              this.$parent.showLoginDialog = true;
            })
            .catch((err) => {
              this.$message.error("注册失败！");
            });
        } else {
          return false;
        }
      });
    },
    register() {
      this.registerDialogVisible = true;
    },
  },

  mounted: {},
};
</script>

<style lang="less" scoped>
#body {
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url("../assets/bg-chain.png");
  background-position: center center;
  background-size: cover;

  .login {
    margin: 200px auto;
    width: 500px;
    height: 300px;
  }

  .ruleForm {
    margin: 10px 30px;
    display: flex;
    flex-direction: column;
    justify-items: center;

    .box {
      margin-left: 60px;
    }
  }

  .login-btn {
    display: flex;
    justify-content: space-around;
  }

  span {
    text-align: center;
    height: 100%;
    line-height: 100%;
  }

  .el-form-item__label {
    font-weight: bold;
    font-size: 14px;
    padding: 0 10px 0 0;
    width: 120px;
    text-align: right;
  }

  .el-upload__tip {
    font-size: 12px;
  }

  .dialog-footer {
    text-align: center;
  }
}
</style>