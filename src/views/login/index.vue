<template>
  <div class="loginContainer">
    <div class="logindiv">
      <img src="../../assets/images/logo.png" alt="" class="logo" />

      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="form.loginName" placeholder="请输入用户名"
            ><span slot="prefix" class="el-icon-user-solid icon"> </span
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            show-password
            ><span slot="prefix" class="icon">
              <svg-icon iconClass="password" /> </span
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="form.code" placeholder="请输入验证码"
            ><span slot="prefix" class="el-icon-loading icon"> </span>
            <img
              slot="suffix"
              class="code"
              ref="code"
              src="../../assets/images/code.png"
              @click="changecode"
            />
          </el-input>
        </el-form-item>

        <el-button type="primary" class="formitem" @click.native="login"
        :loading="loginBtnLoading"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import { getCode } from "@/api/user";
export default {
  data() {
    return {
      form: {
        loginName: "admin",
        password: "admin",
        code: "",
        clientToken:this.randomNum,
        loginType:0
      },
      loginBtnLoading:false,
      rules: {
        loginName: [
          { required: true, message: "请输入正确用户名", trigger: "blur" },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: "用户名格式不正确",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          // {pattern:/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/,message: '请输入包含大小写字母数字特殊符号且不少于6位的密码', trigger: 'blur'}
        ],
        code: [
          { required: true, message: "请输入正确验证码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },

  created() {
    // console.log(this.randomNum);
    this.getCode();
  },
  computed: {
    randomNum() {
      return Math.ceil(Math.random() * 10000);
    },
    clientToken(){
      return this.$store.state.user.clientToken
    }
  },
  methods: {
    async login() {
      try {
        this.loginBtnLoading=true
        await this.$refs.form.validate();
        // console.log(this.form);
        // this.form.clientToken=this.randomNum
        this.form.clientToken=this.clientToken
        await this.$store.dispatch("user/getToken", this.form);
        if (this.$store.state.user.token) {
          
          this.$router.push('/')
          this.$message('你登录成功了！真棒！');
        }else{
          this.$message('你验证码错了！找打？');
        }
      } catch (error) {}finally{
        this.loginBtnLoading=false
      }
      
    },
    async getCode() {
      const res = await getCode(this.randomNum);
      // console.log(this.randomNum);
      this.$store.dispatch('user/getClientToken', this.randomNum);

      // console.log(res);
      this.$refs.code.src = res.request.responseURL;
      // this.objectURL='data:image/png;base64,' + data
    },
    changecode() {
      this.getCode();
    },
  },
};
</script>

<style lang="scss" scoped>
.loginContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: url("../../assets/images/bg.png");
  background-size: cover;
  .logindiv {
    position: relative;
    height: 388px;
    width: 518px;
    background-color: #fff;
    border-radius: 18px;
    .logo {
      position: absolute;
      left: 210px;
      top: -50px;
      width: 96px;
    }

    .el-form {
      margin-top: 70px;
      width: 100%;
      height: 200px;
      // background-color: hotpink;
      display: flex;
      width: 100%;
      height: 300px;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      ::v-deep .el-input,
      .el-button {
        width: 446px;
        height: 52px;
      }
      ::v-deep .el-input__inner {
        height: 52px;
      }
      .icon {
        padding: 9px 5px 2px 3px;

        vertical-align: middle;
        width: 30px;
        display: inline-block;
      }
      .code {
        display: inline-block;
        width: 130px;
        height: 52px;
      }
    }
  }
}
</style>
