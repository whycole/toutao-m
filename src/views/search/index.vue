<template>
    <div class="search-container">
      <form action="/">
        <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="$router.back()" @focus="isResultShow = false"/>
      </form>

      <search-result v-if="isResultShow"></search-result>

      <search-suggestion v-else-if="searchText" :search-text="searchText"></search-suggestion>

      <search-history v-else></search-history>



    </div>
</template>

<script>
    import SearchSuggestion from './components/search-suggestion'
    import SearchHistory from './components/search-history'
    import SearchResult from './components/search-result'
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
        }
      },
      methods: {
        onSearch() {
          this.isResultShow = true
        },
      }

    }
</script>

<style scoped>

</style>