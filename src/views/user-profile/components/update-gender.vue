<template>
    <div class="update-gender-container">
      <van-picker
        show-toolbar
        :columns="columns"
        :default-index="defaultIndex"
        @cancel="$emit('close')"
        @confirm="onConfirm"
        @change="onGenderChange"
      />
    </div>
</template>

<script>
    import { updateUserProfile } from "../../../api/user";
    export default {
      name: "update-gender",
      props: {
        value: {
          type: Number,
          required: true
        }
      },
      data() {
        return {
          columns: ['男', '女'],
          defaultIndex: this.value
        }
      },
      methods: {
        onGenderChange(picker, value, index) {
          this.defaultIndex = index
        },
        async onConfirm(){
          this.$toast.loading({
            message: '保存中',
            forbidClick: true  //禁止背景点击
          })
          //请求提交更新用户性别
          await updateUserProfile({
            gender: this.defaultIndex
          })
          //更新成功 -> 修改父组件的 gender ->  关闭弹出层
          this.$toast.success('保存成功')
          this.$emit('input',this.defaultIndex)
          this.$emit('close')
        }
      }
    }
</script>

<style scoped>

</style>