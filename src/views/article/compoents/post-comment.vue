<template>
    <div class="post-comment-container">
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
      <van-button size="small" @click="onPost" :disabled="!message">发布</van-button>
    </div>
</template>

<script>
    import { addComment } from "../../../api/comment";
    export default {
      name: "post-comment",
      props: {
        target: {
          type: [String,Number,Object],
          required: true
        },
        articleId: {
          type: [String,Number,Object],
          default: null
        },
      },
      data() {
        return {
          message: '',   //输入框内容
        }
      },
      methods: {
        async onPost() {
          this.$toast.loading({
            message: '发布中',
            forbidClick: true  //禁止背景点击
          })
          //找到数据接口
          //封装请求方法
          //请求提交数据
          const { data } = await addComment({
            target: this.target.toString(), //评论的目标id(评论文章即为文章id，对评论进行回复则为评论id)
            content: this.message,  //评论的内容
            art_id: this.articleId ? this.articleId.toString() : null  //文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id，对文章进行评论，不要传此参数
          })

          this.$emit('post-success', data.data.new_obj)
          //处理响应结果
          this.$toast.success('发布')
          //发布成功，清空文本框内容
          this.message=''
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