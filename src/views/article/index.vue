<template>
    <div class="article-container">
      <van-nav-bar class="app-nav-bar" left-arrow @click-left="$router.back()"/>
      <div class="article-wrap">
        <h1 class="title">{{ article.title }}</h1>
        <van-cell center class="user-info">
          <div slot="title" class="name">{{ article.aut_name }}</div>
          <van-image class="avatar" slot="icon" round fit="cover" :src="article.aut_photo"></van-image>
          <div slot="label" class="pubdate">{{ article.pubdate | relativeTime }}</div>
          <van-button class="follow-btn" :loading="isFollowLoading" :type="article.is_followed ? 'default' : 'info'" :icon="article.is_followed ? '' : 'plus'" round size="small" @click="onFollow">{{ article.is_followed ? '已关注' : '关注' }}</van-button>
        </van-cell>
        <div class="markdown-body" v-html="article.content" ref="article-content"></div>
        <comment-list :source="articleId"></comment-list>
      </div>

      <div class="article-bottom">
        <van-button class="comment-btn" type="default" round size="small" @click="isPostShow=true">写评论</van-button>
        <van-icon name="comment-o" info="123" color="#777"></van-icon>
        <van-icon :name="article.is_collected ? 'star' : 'star-o'" :color="article.is_collected ? 'orange' : '#777'" @click="onCollect"></van-icon>
        <van-icon :name="article.attitude===1 ? 'good-job' : 'good-job-o'" :color="article.attitude===1 ? 'hotpink' : '#777'" @click="onLike"></van-icon>
        <van-icon name="share" color="#777"></van-icon>
      </div>

      <van-popup v-model="isPostShow" position="bottom">
        <post-comment></post-comment>
      </van-popup>
    </div>
</template>

<script>
    import './github-markdown.css'
    import { getArticleById, addCollect, deleteCollect, addLike, deleteLike  } from "../../api/article";
    import { ImagePreview } from 'vant'
    import { addFollow, deleteFollow } from "../../api/user";
    import CommentList from './compoents/comment-list'
    import PostComment from './compoents/post-comment'
    export default {
      name: "articleIndex",
      components: {
        CommentList,
        PostComment
      },
      //在组件中获取动态路由参数
      //方式一： this.route.params.xxx
      //方式二： props 传参 (推荐)
      props: {
        articleId: {
          type: [String, Number, Object],
          required: true
        }
      },
      data() {
        return {
          article: {},  //文章数据对象
          isFollowLoading: false,  //关注用户按钮 loading 状态
          isPostShow: false  //控制发布评论的显示状态
        }
      },
      created() {
        this.loadArticle()
      },
      methods: {
        async loadArticle() {
          const { data } = await getArticleById(this.articleId)
          this.article = data.data

          //数据改变影响视图更新( DOM 数据) 不是立即的
          //所以如果需要在修改数据之后马上操作被该数据影响的视图 DOM
          //需要把这个代码放到 $nextTick 中
          //this.$nextTick 是 Vue 提供的一个方法
          this.$nextTick(() => {
            this.handlePerviewImage()
          })

        },
        handlePerviewImage() {
          //获取文章内容 DOM 容器
          const articleContent = this.$refs['article-content']
          //得到所有的 img 标签
          const imgs = articleContent.querySelectorAll('img')
          const imgPaths = []  //收集所有图片的路径
          //循环 img 列表，给 img 注册点击事件
          imgs.forEach((img,index) => {
            imgPaths.push(img.src)
            //在事件处理函数中调用 ImagePreview() 方法预览
            img.onclick = function () {
              ImagePreview({
                images: imgPaths,  //预览图片路径列表
                startPosition: index  //图片预览的起始位置
              });
            }
          })
        },
        async onFollow () {
          this.isFollowLoading = true
          if (this.article.is_followed) {
            // 已关注，取消关注
            await deleteFollow(this.article.aut_id)
            // this.article.is_followed = false
          } else {
            // 没有关注，添加关注
            await addFollow(this.article.aut_id)
            // this.article.is_followed = true
          }
          this.article.is_followed = !this.article.is_followed
          this.isFollowLoading = false
        },
        async onCollect() {
          this.$toast.loading({
            message: '操作中...',
            forbidClick: true  //禁止背景点击
          })
          if (this.article.is_collected) {
            // 已收藏，取消收藏
            await deleteCollect(this.articleId)
            // this.article.is_collected = false
          } else {
            // 没有收藏，添加收藏
            await addCollect(this.articleId)
            // this.article.is_collected = true
          }
          this.article.is_collected = !this.article.is_collected
          this.$toast.success(`${this.article.is_collected ? '' : '取消'}收藏成功`)
        },
        async onLike() {
          this.$toast.loading({
            message: '操作中...',
            forbidClick: true  //禁止背景点击
          })
          if (this.article.attitude===1) {
            // 已点赞，取消点赞
            await deleteLike(this.articleId)
            this.article.attitude = -1
          } else {
            // 没有点赞，添加点赞
            await addLike(this.articleId)
            this.article.attitude = 1
          }
          this.$toast.success(`${this.article.attitude===1 ? '' : '取消'}点赞成功`)
        }
      }
    }
</script>

<style scoped lang="less">
.article-container{
  .article-wrap{
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: auto;
    .title{
      font-size: 20px;
      color: #3a3a3a;
      padding: 14px;
      background: #fff;
      margin: 0;
    }
    .user-info{
      .avatar{
        width: 35px;
        height: 35px;
        margin-right: 8px;
      }
      .name{
        font-size: 12px;
        color: #333;
      }
      .pubdate{
        font-size: 12px;
        color: #b4b4b4;
      }
      .follow-btn{
        width: 85px;
        height: 29px;
      }
    }
    ul{
      list-style: unset;
    }
    .markdown-body{
      padding: 14px;
      background: #fff;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 141px;
      height: 23px;
      border: 1px solid #eeeeee;
      font-size: 15px;
      line-height: 23px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 20px;
      .van-info {
        font-size: 11px;
        background-color: #e22829;
      }
    }
  }
}
</style>