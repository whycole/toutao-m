<template>
    <div class="user-profile-container">
      <van-nav-bar class="app-nav-bar" title="个人信息" left-arrow @click-left="$router.back()"/>

      <van-cell title="头像" is-link center>
        <van-image width="35" height="35" round fit="cover" :src="user.photo" />
      </van-cell>
      <van-cell title="昵称" is-link :value="user.name" @click="isEditNameShow=true"></van-cell>
      <van-cell title="性别" is-link :value="user.gender===0 ? '男' : '女'" @click="isEditGenderShow=true"></van-cell>
      <van-cell title="生日" is-link :value="user.birthday"></van-cell>

      <van-popup v-model="isEditNameShow" position="top" :style="{ height: '100%' }">
        <!--
          当你传递给子组件的数据既要使用又要修改，例如这里的name
          这种情况下我们可以使用 v-model 简写
        -->
        <!--<update-name :name="user.name" @update-name="user.name=$event" @close="isEditNameShow=false"></update-name>-->
        <!--
          v-model="user.name"
            相当于默认传递一个名字叫做 value 的数据
            :value="user.name"
            默认监听 input 事件 @input="user.name=$event"
          v-model 的本质还是父子组件通信，它仅仅是简化了父组件的使用
        -->
        <!-- v-model 只能使用一次 -->
        <!--
        如果有多个数据需要保持同步，使用 .sync 修饰符
        例如:
          :gender.sync="user.gender"
          相当于执行了
          :gender.sync="user.gender"
          @update:gender="user.gender=$event"
          固定形式  @update:属性名称="user.gender=$event"
         -->
        <update-name v-if="isEditNameShow" v-model="user.name" @close="isEditNameShow=false"></update-name>
      </van-popup>

      <van-popup v-model="isEditGenderShow" position="bottom">
        <update-gender v-model="user.gender" @close="isEditGenderShow=false"></update-gender>
      </van-popup>
    </div>
</template>

<script>
    import { getUserProfile } from "../../api/user";
    import UpdateName from "./components/update-name";
    import UpdateGender from "./components/update-gender";
    export default {
      name: "UserProfile",
      components: {
        UpdateName,
        UpdateGender
      },
      data() {
        return {
          user: {},  //用户数据
          isEditNameShow: false,  //编辑昵称的显示状态
          isEditGenderShow: false,  //编辑性别的显示状态
        }
      },
      created() {
        this.loadUserProfile()
      },
      methods: {
        async loadUserProfile() {
          const { data } = await getUserProfile()
          this.user = data.data
        }
      }
    }
</script>

<style scoped lang="less">
.van-popup{
  background: #f5f7f9;
}  

</style>