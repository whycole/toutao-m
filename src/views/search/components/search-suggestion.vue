<template>
    <div class="search-suggestion-container">
      <van-cell icon="search" v-for="(str,index) in suggestions" :key="index" @click="$emit('search',str)">
        <div slot="title" v-html="highlight(str)"></div>
      </van-cell>
    </div>
</template>

<script>
    import { getSearchSuggestions } from '../../../api/search'
    import { debounce } from 'lodash'
    export default {
      name: "search-suggestion",
      props: {
        searchText: {
          type: String,
          required: true
        }
      },
      data() {
        return {
          suggestions: [], //联想建议数据列表
        }
      },
      watch: {
        //属性名：要监视的数据名称
        // searchText() {
        //   console.log('tt');
        // }

        //这才是监视的完整写法
        searchText: {
          //当数据发生变化则会立即执行 handler 处理函数
          handler: debounce(async function() {
            //找到数据接口
            //请求获取数据
            //模板绑定展示
            const { data } = await getSearchSuggestions(this.searchText)
            this.suggestions = data.data.options
          },200),
          immediate: true //该回调将会在侦听开始之后立即调用
        }
      },
      methods: {
        highlight(str) {
          return str.replace(new RegExp(this.searchText,'gi'),`<span style="color: red">${this.searchText}</span>`)
        }
      }
    }
</script>

<style scoped lang="less">
.search-suggestion-container{
  position: fixed;
  left: 0;
  right: 0;
  top: 54px;
  bottom: 0;
  overflow-y: auto;
}
</style>