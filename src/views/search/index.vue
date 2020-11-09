<template>
    <div class="search-container">
      <form action="/">
        <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" @search="onSearch(searchText)" @cancel="$router.back()" @focus="isResultShow = false"/>
      </form>

      <search-result v-if="isResultShow" :search-text="searchText"></search-result>

      <search-suggestion v-else-if="searchText" :search-text="searchText" @search="onSearch"></search-suggestion>

      <search-history v-else :searchHistories="searchHistories" @search="onSearch" @update-histories="searchHistories = $event"></search-history>



    </div>
</template>

<script>
    import SearchSuggestion from './components/search-suggestion'
    import SearchHistory from './components/search-history'
    import SearchResult from './components/search-result'
    import { setItem, getItem } from "../../utils/storage"
    import { getSearchHistories } from "../../api/search"
    import { mapState } from 'vuex'
    export default {
      name: "SearchIndex",
      components: {
        SearchSuggestion,
        SearchHistory,
        SearchResult
      },
      data() {
        return {
          searchText: '', //搜索输入框的内容
          isResultShow: false,  //控制搜索结果的显示状态
          searchHistories: []  //搜索历史记录
        }
      },
      computed: {
        ...mapState(['user'])
      },
      watch: {
        //监视搜索历史记录的变化，存储到本地存储
        searchHistories() {
          setItem('search-histories',this.searchHistories)
        }
      },
      methods: {
        onSearch(searchText) {
          //把输入框设置为你要搜索的文本
          this.searchText = searchText
          // 记录搜索历史记录
          const index = this.searchHistories.indexOf(searchText)
          if (index !== -1) {
            //删除重复项
            this.searchHistories.splice(index,1)
          }
          //把最新的搜索历史记录放到顶部
          this.searchHistories.unshift(searchText)
          //如果用户已登录，则把搜索历史记录存储到线上
          //     提示：只要我们调用搜索结果的数据接口，
          //          后端会自动存储用户的搜索历史记录

          //如果没有登录页，则把搜索历史记录存储到本地
          setItem('search-histories',this.searchHistories)
          //展示搜索结果
          this.isResultShow = true
        },
        async loadSearchHistories() {
          //因为后端帮我们存储的用户搜索历史记录太少了(只有四条)
          //所以我们这里让后端返回的历史记录和本地的历史记录和并到一起
          //如果用户登录了
          let searchHistories = getItem('search-histories') || []
          // if (this.user) {
          //   const { data } = await getSearchHistories()
          //   searchHistories = [...new Set([...searchHistories,...data.data.keywords])]
          // }  //因为没有线上删除单个历史记录的接口，所以这个线上的获取历史记录接口可以不用
          return this.searchHistories = searchHistories
        }
      },
      created() {
        this.loadSearchHistories()
      }

    }
</script>

<style scoped>

</style>