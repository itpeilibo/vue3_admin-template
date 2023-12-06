<template>
  <div>
    <h1>测试axios二次封装</h1>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import request from '../utils/request.ts'
onMounted(() => {
  console.log(123)
  request({
    url: '/user/login',
    method: 'POST',
    data: {
      username: 'admin',
      password: '111111',
    },
  })
    .then((res) => {
      console.log('请求接口', res)
    })
    .catch((e) => {
      console.log(e)
    })
})
</script>

<style scoped lang="scss"></style>
