<template>
    <div class="comment-list-container">
      <van-cell title="全部评论"></van-cell>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <comment-item v-for="(comment,index) in list" :key="index" :comment="comment"></comment-item>
<!--          <van-cell v-for="(comment,index) in list" :key="index" :title="comment.content" />-->
      </van-list>
    </div>
</template>

<script>
    import { getComments } from "../../../api/comment";
    import CommentItem from './comment-item'
    export default {
      name: "comment-list",
      components: {
        CommentItem
      },
      props: {
        source: {
          type: [String, Number, Object],
          required: true
        }
      },
      data() {
        return {
          list: [],
          loading: false,
          finished: false,
          offset: null, //获取下一页的数据页码
          limit: 10 //每页大小
        }
      },
      methods: {
        async onLoad() {
          //请求获取数据
          const { data } = await getComments({
            type: 'a', //评论类型， a-对文章(article)的评论，c-对评论的回复
            source: this.source,  //源id ，文章 id 或 评论 id
            offset: this.offset, //获取评论数据的偏移量，值为评论 id，表示从此 id 的数据向后取，不传表示从第一页开始读取数据
            limit: this.limit,  //每页大小
          })
          //把数据放到列表中
          const { results } = data.data
          this.list.push(...results)
          //将本次的 loading 关闭
          this.loading = false
          //判断时候还有数据
          if (results.length) {
            //如果有，更新获取下一页数据
            this.offset = data.data.last_id
          }else {
            //如果没有，则将 finished 设置为true，不再触发加载更多
            this.finished = true
          }
        },
      }
    }
</script>

<style scoped>

</style>