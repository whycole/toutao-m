<template>
    <div class="update-name-container">
      <van-nav-bar title="修改昵称" left-text="返回" right-text="完成" @click-left="$emit('close')" @click-right="onConfirm"/>
      <div class="name-file-wrap">
        <van-field
          v-model="loadName"
          rows="2"
          autosize
          type="textarea"
          maxlength="7"
          placeholder="请输入昵称"
          show-word-limit
        />
      </div>
    </div>
</template>

<script>
    import { updateUserProfile } from "../../../api/user";

    export default {
      name: "update-name",
      props: {
        // name: {
        //   type: String,
        //   required: true
        // }
        value: {
          type: String,
          required: true
        }
      },
      data() {
        return {
            loadName: this.value
        }
      },
      methods: {
        async onConfirm(){
          this.$toast.loading({
            message: '保存中',
            forbidClick: true  //禁止背景点击
          })
          try {
            //请求提交更新用户昵称
            const { data } = await updateUserProfile({
              name: this.loadName
            })
            console.log(data);
            //更新成功 -> 修改父组件的 name ->  关闭弹出层
            this.$toast.success('保存成功')
            this.$emit('input',this.loadName)
            this.$emit('close')
          }catch (err) {
            if (err && err.response && err.response.status===409){
              this.$toast.fail('昵称已存在')
            }
          }
        }
      }
    }
</script>

<style scoped lang="less">
.update-name-container{
  .name-file-wrap{
    padding: 10px;
  }
}
</style>