<template>
    <div class="update-name-container">
      <van-nav-bar title="修改昵称" left-text="返回" right-text="完成" @click-left="$emit('close')" @click-right="onConfirm"/>
      <div class="name-file-wrap">
        <van-field
          v-model="message"
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
    export default {
      name: "update-name",
      props: {
        name: {
          type: String,
          required: true
        }
      },
      data() {
        return {
          message: this.name
        }
      },
      methods: {
        onConfirm(){

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