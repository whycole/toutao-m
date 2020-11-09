<template>
    <div class="search-result-container">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(article,index) in list" :key="index" :title="article.title" />
      </van-list>
    </div>
</template>

<script>
    import { getSearchResult } from "../../../api/search";
    export default {
      name: "search-result",
      props: {
        searchText: {
          type: String,
          required: true
        }
      },
      data() {
        return {
          list: [],
          loading: false,
          finished: false,
          page: 1,  //页码
          per_page: 10  //每页大小
        }
      },
      methods: {
        async onLoad() {
          //1.请求获取数据
          const { data } = await getSearchResult({
            page: this.page,  //页码
            per_page: this.per_page,  //每页大小
            q: this.searchText    //搜索的字符
          })
          //2.将数据放到数据列表中
          const { results } = data.data
          this.list.push(...results)
          //3.关闭本次的loading
          this.loading = false
          //4.判断是否还有数据，如果有，则加载下一页数据页码。如果没有，则把finished 设置为true，关闭加载更多
          if (results.length) {
            this.page++
          }else {
            this.finished = true
          }
        },
      }
    }
</script>

<style scoped lang="less">
.search-result-container{
  position: fixed;
  left: 0;
  right: 0;
  top: 54px;
  bottom: 0;
  overflow-y: auto;
}
</style>