<template>
    <div class="home-container">
      <van-nav-bar class="app-nav-bar">
        <van-button slot="title" class="search-btn" icon="search" type="info" round size="small">搜索</van-button>
      </van-nav-bar>

      <van-tabs v-model="active">
        <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
          <!-- 标签页组件有一个功能， 只有你第一次查看标签页的时候才会渲染里面的内容 -->
          <article-list :channel="channel"></article-list>
        </van-tab>
      </van-tabs>
    </div>
</template>

<script>
    import { getUserChannels } from "../../api/user";
    import ArticleList from './components/article-list'
    export default {
      name: "HomeIndex",
      components:{
        ArticleList
      },
      data() {
        return {
          active: 0, //控制被激活的标签
          channels: [] //频道列表
        }
      },
      methods: {
        async loadChannels() {
          //请求获取频道数据
          const { data } = await getUserChannels()
          this.channels = data.data.channels
        }
      },
      created() {
        this.loadChannels()
      }
    }
</script>

<style scoped lang="less">
.home-container{
  /deep/.van-nav-bar__title{
    max-width: none;
  }
  .search-btn{
    width: 277px;
    height: 32px;
    background: #5babfb;
    border: none;
    .van-icon{
        font-size: 16px;
    }
    .van-button__text{
      font-size: 14px;
    }
  }
}
</style>