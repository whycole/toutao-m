<template>
    <div class="home-container">
      <van-nav-bar class="app-nav-bar">
        <van-button slot="title" class="search-btn" icon="search" type="info" round size="small" to="/search">搜索</van-button>
      </van-nav-bar>

      <van-tabs class="channel-tabs" v-model="active">
        <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
          <!-- 标签页组件有一个功能， 只有你第一次查看标签页的时候才会渲染里面的内容 -->
          <article-list :channel="channel"></article-list>
        </van-tab>
        <div slot="nav-right" class="wap-nav-placeholder"></div>
        <div slot="nav-right" @click="isChannelEditShow=true" class="wap-nav-wrap">
          <van-icon name="wap-nav" />
        </div>
      </van-tabs>
      <van-popup v-model="isChannelEditShow" position="bottom" class="channel-edit-popup" closeable close-icon-position="top-left" get-container="body" style="height: 100%">
        <channel-edit :user-channels="channels" @close="isChannelEditShow = false" @update-active="onUpdateActive" :active="active"></channel-edit>
      </van-popup>
    </div>
</template>

<script>
    import { getUserChannels } from "../../api/user";
    import ArticleList from './components/article-list'
    import ChannelEdit from './components/channel-edit'
    import { mapState } from 'vuex'
    import { getItem } from "../../utils/storage";

    export default {
      name: "HomeIndex",
      components:{
        ArticleList,
        ChannelEdit
      },
      data() {
        return {
          active: 0, //控制被激活的标签
          channels: [], //频道列表
          isChannelEditShow: false  //控制编辑频道的显示状态
        }
      },
      computed: {
        ...mapState(['user'])
      },
      methods: {
        async loadChannels() {
          let channels = []
          if (this.user){
            //已登录，请求获取线上的用户频道列表数据
            const { data } = await getUserChannels()
            channels = data.data.channels
          }else {
            //未登录，判断是否有本地存储的频道列表数据
            const loadChannels = getItem('user-channels')
            //如果有本地存储的频道列表则使用
            if (loadChannels) {
              channels = loadChannels
            }else {
              //如果用户既没登录，又没本地存储列表，那就请求获取默认推荐的频道列表
              const { data } = await getUserChannels()
              channels = data.data.channels
            }
          }
          //把处理好的数据放到 data 中以供模板使用
          this.channels = channels
          //请求获取频道数据
          // const { data } = await getUserChannels()
          // this.channels = data.data.channels
        },
        onUpdateActive(index) {
          this.active = index
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
  .channel-tabs{
    display: flex;
    /deep/ .van-tab{
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
      flex-basis: 24%;

    }
    /deep/ .van-tabs__line {
      bottom: 20px;
      width: 15px !important;
      height: 3px;
      background: #3296fa;
    }
  }
  .wap-nav-placeholder{
    width: 33px;
    flex-shrink: 0;
  }
  .wap-nav-wrap{
    position: fixed;
    right: 0;
    width: 33px;
    height: 43px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    opacity: 0.9;
    .van-icon{
      font-size: 24px;
    }
    &:before{
      content: '';
      width: 1px;
      height: 43px;
      background: url("../../assets/line.png") no-repeat;
      background-size: contain;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

}
</style>