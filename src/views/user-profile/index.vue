<template>
    <div class="user-profile-container">
      <van-nav-bar class="app-nav-bar" title="个人信息" left-arrow @click-left="$router.back()"/>

      <van-cell title="头像" is-link center>
        <van-image width="35" height="35" round fit="cover" :src="user.photo" />
      </van-cell>
      <van-cell title="昵称" is-link :value="user.name" @click="isEditNameShow=true"></van-cell>
      <van-cell title="性别" is-link :value="user.gender===0 ? '男' : '女'"></van-cell>
      <van-cell title="生日" is-link :value="user.birthday"></van-cell>

        <van-popup v-model="isEditNameShow" position="top" :style="{ height: '100%' }">
          <update-name :name="user.name" @close="isEditNameShow=false"></update-name>
        </van-popup>
    </div>
</template>

<script>
    import { getUserProfile } from "../../api/user";
    import UpdateName from "./components/update-name";
    export default {
      name: "UserProfile",
      components: {
        UpdateName
      },
      data() {
        return {
          user: {},  //用户数据
          isEditNameShow: false,  //编辑昵称的显示状态
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