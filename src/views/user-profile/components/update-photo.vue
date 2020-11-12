<template>
    <div class="update-photo-container">
      <img :src="image">
      <van-nav-bar class="toolbar" left-text="取消" right-text="确认" @click-left="$emit('close')" @click-right="onConfirm"></van-nav-bar>
    </div>
</template>

<script>
    import { updateUserPhoto } from "../../../api/user";
    export default {
      name: "update-photo",
      props: {
        file: {
          required: true
        }
      },
      data() {
        return {
          image: window.URL.createObjectURL(this.file)
        }
      },
      methods: {
        async onConfirm() {
          this.$toast.loading({
              message: '保存中',
              forbidClick: true  //禁止背景点击
          })

         //如果接口要求 Content-Type 是 multipart/form-data，
         //则一定要提交 FormData 数据对象，专门用于图片上传的，不能
         //提交 {}，没用的
         const fd = new FormData()
         // fd.append('photo',文件对象)
         fd.append('photo',this.file)
         await updateUserPhoto(fd)

         this.$toast.success('保存成功')
         this.$emit('update-photo',this.image)
         this.$emit('close')
        }
      }
    }
</script>

<style scoped lang="less">
.update-photo-container{
  .toolbar{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>