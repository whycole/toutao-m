<template>
    <div class="update-birthday container">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="$emit('close')"
        @confirm="onConfirm"
      />
    </div>
</template>

<script>
    import {updateUserProfile} from "../../../api/user";
    import dayjs from 'dayjs'
    export default {
      name: "update-birthday",
      props: {
        value: {
          type: String,
          required: true
        }
      },
      data() {
        return {
          minDate: new Date(1970, 0, 1),
          maxDate: new Date(),
          currentDate: new Date(this.value),
        }
      },
      methods: {
        async onConfirm() {
          this.$toast.loading({
              message: '保存中',
              forbidClick: true  //禁止背景点击
          })
          //请求提交更新用户生日
          const date = dayjs(this.currentDate).format('YYYY-MM-DD')
          await updateUserProfile({
              birthday: date
          })
          //更新成功 -> 修改父组件的 birthday ->  关闭弹出层
          this.$toast.success('保存成功')
          this.$emit('input',date)
          this.$emit('close')
        }
      }
    }
</script>

<style scoped>

</style>