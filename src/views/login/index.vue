<template>
    <div class="login-container">
      <van-nav-bar class="app-nav-bar" title="注册 / 登录" left-arrow @click-left="$router.back()"/>
      <van-cell-group>
        <van-field v-model="user.mobile" icon-prefix="toutiao" left-icon="shouji" placeholder="请输入手机号"/>
        <van-field v-model="user.code" clearable icon-prefix="toutiao" left-icon="yanzhengma" placeholder="请输入验证码">
          <template #button>
            <van-button class="send-btn" size="small" round>发送验证码</van-button>
          </template>
        </van-field>
      </van-cell-group>
      <div class="login-btn-wrap">
        <van-button class="login-btn" type="info" block @click="onLogin">登录</van-button>
      </div>
    </div>
</template>

<script>
    import { login } from '../../api/user'
    // import { Toast } from 'vant'
    export default {
      name: "LoginIndex",
      data() {
        return {
          user: {
            mobile: '',
            code: ''
          }
        }
      },
      methods: {
        async onLogin() {
          this.$toast.loading({
            message: '登录中...',
            forbidClick: true,
            duration: 0
          });
          try {
            //17090086870
            const res = await login(this.user)
            console.log(res);
            this.$toast.success('登录成功')
          }catch (err) {
            console.log(err);
            this.$toast.fail('登录失败，手机号或验证码错误')
          }
        }
      }
    }
</script>

<style lang="less">
.login-container {
  .send-btn{
    width: 80px;
    height: 25px;
    background: #ededed;
    .van-button__text{
      font-size: 11px;
      color: #666;
    }
  }
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background: #6db4fb;
      border: none;
      .van-button__text{
        font-size: 15px;
      }
    }
  }
}
</style>