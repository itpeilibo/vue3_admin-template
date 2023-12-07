<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules">
          <h1>hello</h1>
          <h2>欢迎来到运营平台</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              type="password"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
              :loading="loading"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user.ts'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time.ts'
//
let loading = ref(false)

// 获取路由器
let $router = useRouter()
//获取表单元素
let loginForm = reactive({ username: 'admin', password: '111111' })
// 引入用户小仓库
let useStore = useUserStore()

// 定义表单验证规则rules
const rules = {
  username: [
    {
      required: true,
      min: 5,
      max: 16,
      message: '用户名长度应为5-16位',
      trigger: 'change',
    },
  ],
  password: [
    {
      required: true,
      min: 6,
      max: 16,
      message: '密码长度应为6-16位',
      trigger: 'change',
    },
  ],
}

const login = async () => {
  // 开始加载
  loading.value = true
  try {
    await useStore.userLogin(loginForm)
    await $router.push('/home')
    // 登录成功提示信息
    ElNotification({
      title: `Hi!${getTime()}`,
      type: 'success',
      message: '登录成功',
    })
    loading.value = false
  } catch (errer) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: (errer as Error).message,
    })
  }
  ;``
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;
    h1 {
      color: white;
      font-size: 40px;
    }
    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0px;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>
