<template>
    <div class="user-profile-container">
      <van-nav-bar class="app-nav-bar" title="个人信息" left-arrow @click-left="$router.back()"/>

      <input type="file" hidden accept="image/*" ref="file" @change="onFileChange">
      <van-cell title="头像" is-link center>
        <van-image width="35" height="35" round fit="cover" :src="user.photo" @click="$refs.file.click()"/>
      </van-cell>
      <van-cell title="昵称" is-link :value="user.name" @click="isEditNameShow=true"></van-cell>
      <van-cell title="性别" is-link :value="user.gender===0 ? '男' : '女'" @click="isEditGenderShow=true"></van-cell>
      <van-cell title="生日" is-link :value="user.birthday" @click="isEditBirthdayShow=true"></van-cell>

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
        <update-gender v-if="isEditGenderShow" v-model="user.gender" @close="isEditGenderShow=false"></update-gender>
      </van-popup>

      <van-popup v-model="isEditBirthdayShow" position="bottom" >
        <update-birthday v-if="isEditBirthdayShow" v-model="user.birthday" @close="isEditBirthdayShow=false"></update-birthday>
      </van-popup>

      <van-popup class="update-photo-popup" v-model="isEditPhotoShow" position="bottom" :style="{ height: '100%' }">
        <update-photo v-if="isEditPhotoShow" :file="previewImage" @close="isEditPhotoShow=false" @update-photo="user.photo=$event"></update-photo>
      </van-popup>
    </div>
</template>

<script>
    import { getUserProfile } from "../../api/user";
    import UpdateName from "./components/update-name";
    import UpdateGender from "./components/update-gender";
    import UpdateBirthday from "./components/update-birthday";
    import UpdatePhoto from "./components/update-photo";
    export default {
      name: "UserProfile",
      components: {
        UpdateName,
        UpdateGender,
        UpdateBirthday,
        UpdatePhoto
      },
      data() {
        return {
          user: {},  //用户数据
          isEditNameShow: false,  //编辑昵称的显示状态
          isEditGenderShow: false,  //编辑性别的显示状态
          isEditBirthdayShow: false,  //编辑生日的显示状态
          isEditPhotoShow: false,  //编辑头像的显示状态
          previewImage: null     //上传预览图片
        }
      },
      created() {
        this.loadUserProfile()
      },
      methods: {
        async loadUserProfile() {
          const { data } = await getUserProfile()
          this.user = data.data
        },
        onFileChange() {
          //展示弹出层
          this.isEditPhotoShow = true
          //在弹出层里面预览图片
          // const blob = window.URL.createObjectURL(this.$refs.file.files[0])
          const file = this.$refs.file.files[0]
          this.previewImage = file
          //为了解决相同文件不触发 change 事件，所以在这里
          //手动清空 file 的 value
          this.$refs.file.value = ''
        }
      }
    }
</script>

<style scoped lang="less">
.van-popup{
  background: #f5f7f9;
}
.update-photo-popup{
  background: #000;
}
</style>