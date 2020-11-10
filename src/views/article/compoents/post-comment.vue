<template>
    <div class="post-comment-container">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
      <van-button size="small">发布</van-button>
    </div>
</template>

<script>
    export default {
      name: "post-comment",
      data() {
        return {
          message: '',   //输入框内容
        }
      }
    }
</script>

<style scoped lang="less">
.post-comment-container{
  padding: 14px;
  display: flex;
  align-items: center;
}
</style>