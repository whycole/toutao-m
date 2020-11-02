<template>
    <div class="login-container">
      <van-nav-bar class="app-nav-bar" title="注册 / 登录" left-arrow @click-left="$router.back()"/>
      <!--
        使用vant-form组件包裹所有的表单项vant-field
        给表单提交的时候触发submit事件
        提示： 只有表单验证通过，它才会调用submit
        使用want-field的rules属性定义效验规则
      -->
      <van-form :show-error="false" :show-error-message="false" validate-first ref="login-form" @submit="onLogin" @failed="onFailed">
        <van-field v-model="user.mobile" icon-prefix="toutiao" left-icon="shouji" center placeholder="请输入手机号" name="mobile" :rules="formRules.mobile"/>
        <van-field v-model="user.code" clearable icon-prefix="toutiao" left-icon="yanzhengma" center placeholder="请输入验证码" name="code" :rules="formRules.code">
          <template #button>
            <van-count-down v-if="isCountDownShow" :time="1000 * 60" format="ss s" @finish="isCountDownShow = false"/>
            <van-button v-else class="send-btn" size="small" round :loading="isSendSmsLoading" @click.prevent="onSendSms">发送验证码</van-button>
          </template>
        </van-field>
        <div class="login-btn-wrap">
          <van-button class="login-btn" type="info" block>登录</van-button>
        </div>
      </van-form>

    </div>
</template>

<script>
    import { login } from '../../api/user'
    import { sendSms } from '../../api/user'
    // import { Toast } from 'vant'
    export default {
      name: "LoginIndex",
      data() {
        return {
          user: {
            mobile: '17090086870',
            code: '246810'
          },
          formRules: {
            mobile: [
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3|5|7|8|9]\d{9}$/,message: '手机号格式错误' }
            ],
            code: [
              { required: true, message: '请输入验证码' },
              { pattern: /^\d{6}$/,message: '验证码格式错误' }
            ]
          },
          isCountDownShow: false, //控制倒计时和发送按钮的显示状态
          isSendSmsLoading: false //发送验证码按钮的 loading 状态
        }
      },
      methods: {
        async onLogin() {
          this.$toast.loading({
            message: '登录中...', // 提示文本
            forbidClick: true, // 禁止背景点击
            duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
          });
          // 1. 找到数据接口
          // 2. 封装请求方法
          // 3. 请求调用登录
          try {
            const { data } = await login(this.user)
            // 4. 处理响应结果
            this.$toast.success('登录成功')
            //将后端返回的用户状态(token等数据)放到 Vuex 容器中
            this.$store.commit('setUser',data.data)
          }catch (err) {
            console.log(err);
            this.$toast.fail('登录失败，手机号或验证码错误')
          }
        },
        onFailed(error) {
          if (error.errors[0]){
            this.$toast({
              message: error.errors[0].message, // 提示消息
              position: "top"  //提示消息的位置，防止手机键盘太高看不见提示消息
            })
          }
        },
        async onSendSms() {
          try {
            //效验手机号码
            await this.$refs['login-form'].validate('mobile')

            //验证通过，请求发送验证码
            this.isSendSmsLoading = true //展示按钮的loading 状态，防止网络慢用户多次点击触发发送行为
            await sendSms(this.user.mobile)

            //短信发出了，隐藏发送按钮，显示倒计时
            this.isCountDownShow = true

            //倒计时结束 -> 隐藏倒计时，显示发送按钮(监听倒计时的 finish 事件处理)

          } catch (err) {
            let message = ''
            if (err && err.response && err.response.status ===429) {
              // 发送信息失败的错误提示
              message = '发送太频繁了，请稍后重试'
            } else if (err.name === 'mobile') {
              // 表单验证失败的错误提示
              message = err.message
            }else {
              // 未知错误
              message = '发送失败，请稍后重试'
            }

            //提示用户
            this.$toast({
              message,
              position: 'top'
            })
          }

          //无论验证码成功还是失败，最后都要关闭发送按钮的loading状态
          this.isSendSmsLoading = false
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